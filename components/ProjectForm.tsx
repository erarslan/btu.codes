"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send, Image as ImageIcon, Tag, Type, FileText } from "lucide-react";

const ProjectForm = () => {
  const [pitch, setPitch] = useState("");
  const isPending = false;

  return (
    <form
      action={() => {}}
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
            placeholder="Projenizin başlığını girin"
            className="pl-10 focus:ring-btu_primary focus:border-btu_primary"
          />
        </div>
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
            placeholder="Projenizi kısaca açıklayın"
            className="pl-10 min-h-24 focus:ring-btu_primary focus:border-btu_primary resize-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Proje Kategorisi
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Tag className="size-4" />
          </div>
          <Input
            id="category"
            name="category"
            required
            placeholder="Örn: Web Geliştirme, Mobil Uygulama, Yapay Zeka"
            className="pl-10 focus:ring-btu_primary focus:border-btu_primary"
          />
        </div>
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
            placeholder="Projenizi temsil eden bir resim linki ekleyin"
            className="pl-10 focus:ring-btu_primary focus:border-btu_primary"
          />
        </div>
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
      </div>

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 h-auto text-base flex items-center justify-center gap-2 bg-btu_primary hover:bg-btu_primary/90 text-white transition-all duration-300"
        >
          {isPending ? "Proje ekleniyor..." : "Projeni Ekle"}
          <Send className="size-5" />
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
