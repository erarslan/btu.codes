import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserProjects from "@/components/UserProjects";
import { Suspense } from "react";
import { ProjectCardSkeleton } from "@/components/ProjectCard";
import Link from "next/link";
import { Github } from "lucide-react";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <div className="container mx-auto px-8 pt-28 pb-16">
      <section className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-btu_primary/10 to-white p-8 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
                priority
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {user.name}
            </h3>
            <Link
              href={`https://github.com/${user.username}`}
              target="_blank"
              className="text-btu_primary font-medium mb-4 flex items-center hover:scale-110 transition-all duration-300 group"
            >
              <span>@{user.username}</span>
              <Github className="w-0 h-5 ml-0 group-hover:w-5 group-hover:ml-2 transition-all duration-300 overflow-hidden" />
            </Link>
            <div className="bg-white rounded-lg p-4 w-full shadow-sm">
              <p className="text-gray-600 text-sm">
                {user.bio || "Henüz bir biyografi eklenmemiş."}
              </p>
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3">
                {session?.id === id
                  ? "Senin projelerin:"
                  : `${user.name} adlı kullanıcıya ait projeler`}
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Suspense fallback={<ProjectCardSkeleton />}>
                <UserProjects id={id} />
              </Suspense>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
