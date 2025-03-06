import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import ProjectCard, { ProjectCardType } from "@/components/ProjectCard";
import { Award, Edit, Github, ExternalLink } from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const [project, { select: playlist }] = await Promise.all([
    client.fetch(PROJECT_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-secimleri",
    }),
  ]);

  if (!project) return notFound();

  const parsedContent = md.render(project?.pitch || "");
  const isOwner = session && session.id === project.author._id;

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 pb-8 md:pt-32 md:pb-12">
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <p className="text-gray-500 text-sm mb-3">
              {formatDate(project._createdAt)}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600">{project.description}</p>
          </div>
          {isOwner && (
            <Link href={`/proje/${id}/duzenle`}>
              <Button className="flex items-center gap-2 bg-btu_primary hover:bg-btu_primary/90 shrink-0">
                <Edit className="size-4" />
                Düzenle
              </Button>
            </Link>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <Button
              asChild
              className="mt-4 w-full bg-btu_primary hover:bg-btu_primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <a
                href={project.githubRepo}
                target="_blank"
                className="flex items-center justify-center gap-2"
              >
                <Github />
                <span>GitHub Repo</span>
                <ExternalLink />
              </a>
            </Button>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <Link
                href={`/kullanici/${project.author._id}`}
                className="flex items-center gap-3 group"
              >
                <Image
                  src={project.author.image}
                  alt={project.author.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-btu_primary transition-colors">
                    {project.author.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    @{project.author.username}
                  </p>
                </div>
              </Link>

              <div className="flex flex-wrap gap-1.5">
                {project.category?.map((cat: string, index: number) => (
                  <Link
                    key={index}
                    href={`/?query=${cat.toLowerCase()}`}
                    className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors hover:shadow-sm"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-btu_primary mb-4">
                Proje Detayları
              </h3>
              {parsedContent ? (
                <article
                  className="prose prose-blue max-w-none prose-headings:text-btu_primary prose-a:text-btu_secondary"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              ) : (
                <p className="text-gray-600 italic">
                  Proje detayları ne yazık ki yok 😿
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {playlist?.length > 0 && (
        <section className="mt-12 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <Award className="text-btu_primary size-7 stroke-[1.5]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Editör <span className="text-btu_primary">Seçimleri</span>
              </h2>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlist.map((project: ProjectCardType, index: number) => (
              <ProjectCard key={index} project={project} />
            ))}
          </ul>
        </section>
      )}

      <Suspense
        fallback={
          <Skeleton className="h-8 w-32 rounded-full fixed bottom-3 right-3" />
        }
      >
        <View id={id} />
      </Suspense>
    </main>
  );
};

export default Page;
