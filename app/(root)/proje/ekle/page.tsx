import ProjectForm from "@/components/ProjectForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-24">
      <section className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Projeni Ekle
        </h1>
      </section>

      <ProjectForm />
    </div>
  );
};

export default Page;
