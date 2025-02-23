import SearchForm from "../../components/SearchForm";
import ProjectCard from "@/components/ProjectCard";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const projects = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        name: "John Doe",
        _id: 1,
      },
      _id: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: "https://picsum.photos/200/300",
      category: "test",
      title: "Test Project",
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        name: "John Doe",
        _id: 2,
      },
      _id: 2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: "https://picsum.photos/200/300",
      category: "test",
      title: "Test Project",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="animate-gradient-flow bg-gradient-to-r from-btu_primary via-btu_secondary to-btu_primary p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-white text-center">
            Projeni ekle, üniversitedeki ekip arkadaşını bul!
          </h1>
        </div>
      </div>
      <SearchForm query={query} />

      <section className="mt-5">
        <p className="text-2xl font-semibold text-center">
          {query ? `"${query}" için projeler:` : "Tüm Projeler"}
        </p>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6 rounded-2xl bg-gray-50/50">
            {projects?.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard key={project?._id} project={project} />
              ))
            ) : (
              <p>Proje bulunamadı 😿</p>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
