import SearchForm from "../../components/SearchForm";
import ProjectCard, { ProjectCardType } from "@/components/ProjectCard";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: projects } = await sanityFetch({
    query: PROJECTS_QUERY,
    params,
  });

  return (
    <>
      <main className="pt-28">
        <div className="flex items-center justify-center px-4">
          <div className="hero-gradient max-w-4xl w-full">
            <div className="gradient-overlay" />
            <div className="relative z-10 px-8 py-10">
              <h1 className="hero-text text-4xl md:text-5xl font-bold text-white text-center leading-tight">
                Projeni ekle, üniversitedeki ekip arkadaşını bul!
              </h1>
            </div>
          </div>
        </div>
        <SearchForm query={query} />

        <section className="mt-5">
          <p className="text-2xl font-semibold text-center">
            {query ? `"${query}" için projeler:` : "Tüm Projeler"}
          </p>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6 rounded-2xl">
              {projects?.length > 0 ? (
                projects.map((project: ProjectCardType) => (
                  <ProjectCard key={project?._id} project={project} />
                ))
              ) : (
                <p>Proje bulunamadı 😿</p>
              )}
            </ul>
          </div>
        </section>
      </main>
      <SanityLive />
    </>
  );
}
