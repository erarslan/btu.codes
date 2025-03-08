"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchFormReset = () => {
  const router = useRouter();

  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
      form.querySelector("input")?.focus();
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={reset}
      className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
      aria-label="Aramayı temizle"
    >
      <X />
    </button>
  );
};

export default SearchFormReset;
