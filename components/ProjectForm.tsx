"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import {
  Send,
  Image as ImageIcon,
  Type,
  FileText,
  AlertCircle,
} from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/lib/actions";
import { Checkbox } from "./ui/checkbox";

interface ProjectFormProps {
  initialData?: {
    _id: string;
    title: string;
    description: string;
    category: string[];
    image: string;
    pitch: string;
  };
  isEditing?: boolean;
}

// Önceden belirlenmiş kategoriler
const CATEGORIES = [
  "Dönem Projesi",
  "Web Geliştirme",
  "Mobil Geliştirme",
  "Yapay Zeka",
  "Veri Bilimi",
  "Oyun Geliştirme",
  "Siber Güvenlik",
  "Blockchain",
  "IoT",
  "Robotik",
  "C/C++",
  "Java",
  "Python",
  "JavaScript",
  "Flutter",
];

const ProjectForm = ({ initialData, isEditing = false }: ProjectFormProps) => {
  const [pitch, setPitch] = useState(initialData?.pitch || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.category || []
  );
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      // Seçilen kategorileri formData'ya ekle
      const formDataWithCategories = new FormData();
      for (const [key, value] of formData.entries()) {
        if (key !== "category") {
          formDataWithCategories.append(key, value);
        }
      }

      // Seçilen kategorileri JSON string olarak ekle
      formDataWithCategories.append(
        "category",
        JSON.stringify(selectedCategories)
      );

      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: selectedCategories,
        link: formData.get("link") as string,
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

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        if (prev.length === 5) {
          toast.error("En fazla 5 kategori seçebilirsiniz.");
          return prev;
        }
        return [...prev, category];
      }
    });
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
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Proje Kategorisi
        </label>
        {selectedCategories.length === 0 && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="size-4 mr-1" />
            <span>En az bir kategori seçmelisiniz!</span>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
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
          />
        </div>
        {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
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
          disabled={isPending}
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
