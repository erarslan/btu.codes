import ProjectForm from "@/components/ProjectForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const project = await client.fetch(PROJECT_BY_ID_QUERY, { id: params.id });

  if (!project) {
    redirect("/");
  }

  if (project.author._id !== session.id) {
    redirect(`/proje/${params.id}`);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-24">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        Projeni Düzenle
      </h1>
      <ProjectForm initialData={project} isEditing />
    </div>
  );
};

export default Page;
