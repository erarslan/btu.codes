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

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const project = await client.fetch(PROJECT_BY_ID_QUERY, { id });

  if (!project) return notFound();

  const parsedContent = md.render(project?.pitch || "");

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 pb-8 md:pt-32 md:pb-12">
      <section className="mb-8">
        <p className="text-gray-500 text-sm mb-3">
          {formatDate(project._createdAt)}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-gray-600">{project.description}</p>
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

              <Link
                href={`/?query=${project.category?.toLowerCase()}`}
                className="text-sm px-4 py-1.5 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors hover:shadow-sm"
              >
                {project.category}
              </Link>
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

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Benzer Projeler
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-gray-600">
            Yakında burada benzer projeler gösterilecek
          </p>
        </div>
      </section>

      <Suspense fallback={<Skeleton className="h-8 w-32 rounded-full" />}>
        <View id={id} />
      </Suspense>
    </main>
  );
};

export default Page;
