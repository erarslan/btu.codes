import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { projectId, dataset } from "@/sanity/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function parseServerActionResponse(response: any) {
  return response;
}

export function getSanityImageUrl(image: any) {
  if (!image || !image.asset) {
    return "/placeholder.svg";
  }

  const imageAssetId = image.asset._ref || image.asset._id;

  // Sanity CDN URL formatını kullanarak resim URL'sini oluştur
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageAssetId.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp").replace("-jpeg", ".jpeg").replace("-gif", ".gif")}`;
}
