import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const project = await client.fetch(PROJECT_BY_ID_QUERY, { id });

  if (!project) return notFound();

  return (
    <>
      <section>
        <p>{formatDate(project._createdAt)}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </section>
      <section>
        <Image src={project.image} alt="thumb" width={200} height={200} />
        <div>
          <div>
            <Link href={`/kullanici/${project.author._id}`}>
              <Image
                src={project.author.image}
                alt="author"
                width={100}
                height={100}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p>{project.author.name}</p>
                <p>@{project.author.username}</p>
              </div>
            </Link>
            <p>{project.category}</p>
          </div>
          <h3>Proje Detayları</h3>
        </div>
      </section>
    </>
  );
};

export default Page;
