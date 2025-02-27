import { client } from "@/sanity/lib/client";
import { PROJECTS_BY_AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import ProjectCard, { ProjectCardType } from "./ProjectCard";

const UserProjects = async ({ id }: { id: string }) => {
  const projects = await client.fetch(PROJECTS_BY_AUTHOR_ID_QUERY, { id });

  return (
    <>
      {projects.length > 0
        ? projects.map((project: ProjectCardType) => (
            <ProjectCard key={project._id} project={project} />
          ))
        : "Bu kullanıcı henüz proje oluşturmadı."}
    </>
  );
};

export default UserProjects;
