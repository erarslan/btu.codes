import { z } from "zod";
import { DEVELOPMENT_AREAS, PROGRAMMING_LANGUAGES } from "./constants";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Proje başlığı en az 3 karakter olmalıdır.")
    .max(100, "Proje başlığı en fazla 100 karakter olabilir."),
  description: z
    .string()
    .min(10, "Proje açıklaması en az 10 karakter olmalıdır.")
    .max(500, "Proje açıklaması en fazla 500 karakter olabilir."),
  category: z.array(z.string()).refine(
    (categories) => {
      const hasDevArea = categories.some((cat) =>
        DEVELOPMENT_AREAS.includes(cat)
      );

      const hasLanguage = categories.some((cat) =>
        PROGRAMMING_LANGUAGES.includes(cat)
      );

      return hasDevArea && hasLanguage;
    },
    {
      message:
        "Lütfen her kategori grubundan (Geliştirme Alanı, Programlama Dili) bir seçim yapınız.",
    }
  ),
  link: z
    .string()
    .url("Geçerli bir resim URL'i giriniz.")
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");

          return contentType?.startsWith("image/");
        } catch {
          return false;
        }
      },
      {
        message:
          "Girilen URL bir resim dosyasına ait olmalıdır. Lütfen geçerli bir resim URL'i giriniz.",
      }
    ),
  githubRepo: z
    .string()
    .url("Geçerli bir URL giriniz.")
    .regex(
      /github\.com\/[\w-]+\/[\w-]+/,
      "Geçerli bir GitHub repo URL'i giriniz."
    ),
  pitch: z
    .string()
    .min(10, "Detaylı proje açıklaması en az 10 karakter olmalıdır."),
});
