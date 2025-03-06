import { cn, formatDate } from "@/lib/utils";
import { EyeIcon, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Project } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type ProjectCardType = Omit<Project, "author"> & { author: Author };

const ProjectCard = ({ project }: { project: ProjectCardType }) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    description,
    image,
    category,
    title,
    githubRepo,
  } = project;

  return (
    <li className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="h-44 w-full p-2">
        <div className="relative h-full w-full rounded-lg overflow-hidden">
          <Image
            src={image!}
            alt={title!}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </div>

      <div className="px-5 pb-5 space-y-3.5">
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <p>{formatDate(_createdAt)}</p>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="size-4" />
            <span>{views}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Link href={`/proje/${_id}`} className="block">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-btu_primary transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href={`/kullanici/${author._id}`}>
            <Image
              src={author.image!}
              alt={author.name!}
              width={36}
              height={36}
              className="rounded-full"
            />
          </Link>
          <Link
            href={`/kullanici/${author._id}`}
            className="text-sm font-medium text-gray-900 hover:text-btu_primary transition-colors"
          >
            {author.name}
          </Link>
        </div>

        <div className="flex flex-col gap-2 pt-3.5 border-t border-gray-100">
          <div className="flex flex-wrap gap-1.5">
            {category?.map((cat, index) => (
              <Link
                key={index}
                href={`/?query=${cat.toLowerCase()}`}
                className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors hover:shadow-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Button
              asChild
              className="bg-btu_primary hover:bg-btu_primary/90 text-white p-2 transition-all duration-300 hover:shadow-md"
            >
              <a
                href={githubRepo}
                target="_blank"
                className="flex items-center gap-2"
              >
                <Github />
                <span className="text-sm">GitHub Repo</span>
              </a>
            </Button>

            <Button
              asChild
              variant="default"
              className="bg-btu_primary hover:bg-btu_primary/90 rounded-lg shadow-sm hover:shadow transition"
            >
              <Link href={`/proje/${_id}`}>Proje Detayı</Link>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export const ProjectCardSkeleton = () => (
  <>
    {[0, 1, 2, 3].map((index: number) => (
      <li
        key={cn("skeleton", index)}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="h-44 w-full p-2">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        <div className="px-5 pb-5 space-y-3.5">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex items-center justify-between pt-3.5">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
        </div>
      </li>
    ))}
  </>
);

export default ProjectCard;
