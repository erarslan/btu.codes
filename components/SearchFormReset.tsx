"use client";

import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
      form.querySelector("input")?.focus();
    }
  };

  return (
    <button
      type="button"
      onClick={reset}
      className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
      aria-label="Aramayı temizle"
    >
      <Link href="/">
        <X />
      </Link>
    </button>
  );
};

export default SearchFormReset;
