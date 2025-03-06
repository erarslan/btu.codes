"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send, Image as ImageIcon, Type, FileText, Github } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/lib/actions";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TERM_PROJECT,
  DEVELOPMENT_AREAS,
  PROGRAMMING_LANGUAGES,
} from "@/lib/constants";

interface ProjectFormProps {
  initialData?: {
    _id: string;
    title: string;
    description: string;
    category: string[];
    image: string;
    pitch: string;
    githubRepo: string;
  };
  isEditing?: boolean;
}

const ProjectForm = ({ initialData, isEditing = false }: ProjectFormProps) => {
  const [pitch, setPitch] = useState(initialData?.pitch || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.category || []
  );

  const [isTermProject, setIsTermProject] = useState(
    initialData?.category?.includes(TERM_PROJECT) || false
  );
  const [selectedDevArea, setSelectedDevArea] = useState<string | undefined>(
    initialData?.category?.find((cat) => DEVELOPMENT_AREAS.includes(cat))
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    initialData?.category?.find((cat) => PROGRAMMING_LANGUAGES.includes(cat))
  );

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [githubRepo, setGithubRepo] = useState(initialData?.githubRepo || "");

  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const updatedCategories = [];

      if (isTermProject) {
        updatedCategories.push(TERM_PROJECT);
      }

      if (selectedDevArea) {
        updatedCategories.push(selectedDevArea);
      }

      if (selectedLanguage) {
        updatedCategories.push(selectedLanguage);
      }

      // Kategorileri state'e kaydet
      setSelectedCategories(updatedCategories);

      const formDataWithCategories = new FormData();
      for (const [key, value] of formData.entries()) {
        if (key !== "category") {
          formDataWithCategories.append(key, value);
        }
      }

      formDataWithCategories.append(
        "category",
        JSON.stringify(updatedCategories)
      );

      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: updatedCategories,
        link: formData.get("link") as string,
        githubRepo: formData.get("githubRepo") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      if (isEditing && initialData) {
        const result = await updateProject(
          prevState,
          formDataWithCategories,
          pitch,
          initialData._id
        );

        if (result.status === "SUCCESS") {
          toast.success("Proje başarıyla güncellendi!");
          router.push(`/proje/${initialData._id}`);
        }

        return result;
      } else {
        const result = await createProject(
          prevState,
          formDataWithCategories,
          pitch
        );

        if (result.status === "SUCCESS") {
          toast.success("Proje başarıyla eklendi!");
          router.push(`/proje/${result._id}`);
        }

        return result;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Lütfen inputları kontrol ediniz ve tekrar deneyiniz.");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error(
        "Bilinmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );

      return {
        ...prevState,
        error: "An unknown error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  const toggleTermProject = (checked: boolean) => {
    setIsTermProject(checked);
  };

  const isCategorySelectionValid = () => {
    return selectedDevArea && selectedLanguage;
  };

  const isFormValid = () => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      imageUrl.trim().length > 0 &&
      githubRepo.trim().length > 0 &&
      pitch.trim().length > 0 &&
      isCategorySelectionValid()
    );
  };

  return (
    <form
      action={formAction}
      className="space-y-6 bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-200/20 transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Proje Başlığı
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Type className="size-4" />
          </div>
          <Input
            id="title"
            name="title"
            required
            defaultValue={initialData?.title || ""}
            placeholder="Projenizin başlığını girin"
            className="pl-10 focus:ring-btu_primary focus:border-btu_primary"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Proje Açıklaması
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none text-gray-500">
            <FileText className="size-4" />
          </div>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={initialData?.description || ""}
            placeholder="Projenizi kısaca açıklayın"
            className="pl-10 min-h-24 focus:ring-btu_primary focus:border-btu_primary resize-none"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Proje Kategorileri
        </label>

        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="term-project"
            checked={isTermProject}
            onCheckedChange={(checked) => toggleTermProject(checked as boolean)}
          />
          <label
            htmlFor="term-project"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {TERM_PROJECT}
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Geliştirme Alanı
          </label>
          <Select
            value={selectedDevArea}
            onValueChange={setSelectedDevArea}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Geliştirme alanı seçin" />
            </SelectTrigger>
            <SelectContent>
              {DEVELOPMENT_AREAS.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Programlama Dili
          </label>
          <Select
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Programlama dili seçin" />
            </SelectTrigger>
            <SelectContent>
              {PROGRAMMING_LANGUAGES.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Resim Linki
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <ImageIcon className="size-4" />
          </div>
          <Input
            id="link"
            name="link"
            required
            defaultValue={initialData?.image || ""}
            placeholder="Projenizi temsil eden bir resim linki ekleyin"
            className="pl-10 focus:ring-btu_primary focus:border-btu_primary"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="githubRepo"
          className="block text-sm font-medium text-gray-700"
        >
          GitHub Repo Linki
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Github className="size-4" />
          </div>
          <Input
            id="githubRepo"
            name="githubRepo"
            required
            defaultValue={initialData?.githubRepo || ""}
            placeholder="Projenizin GitHub repo linkini ekleyin"
            className="pl-10 focus:ring-btu_primary focus:border-btu_primary"
            onChange={(e) => setGithubRepo(e.target.value)}
          />
        </div>
        {errors.githubRepo && (
          <p className="text-red-500 text-sm">{errors.githubRepo}</p>
        )}
      </div>

      <div data-color-mode="light" className="space-y-2">
        <label
          htmlFor="pitch"
          className="block text-sm font-medium text-gray-700"
        >
          Detaylı Proje Açıklaması
        </label>
        <MDEditor
          value={pitch}
          id="pitch"
          preview="edit"
          height={300}
          className="overflow-hidden rounded-md border border-gray-300 shadow-sm"
          textareaProps={{
            placeholder:
              "Projeni bu MarkDown Editor ile dilediğin biçimde açıklayabilirsin!",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          onChange={(value) => setPitch(value as string)}
        />
        {errors.pitch && <p className="text-red-500 text-sm">{errors.pitch}</p>}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={isPending || !isFormValid()}
          className="px-6 py-3 h-auto text-base flex items-center justify-center gap-2 bg-btu_primary hover:bg-btu_primary/90 text-white transition-all duration-300"
        >
          {isPending
            ? isEditing
              ? "Proje güncelleniyor..."
              : "Proje ekleniyor..."
            : isEditing
              ? "Projeni Güncelle"
              : "Projeni Ekle"}
          <Send className="size-5" />
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
