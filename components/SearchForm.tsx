"use client";

import { useRouter } from "next/navigation";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("query");

    if (searchQuery) {
      router.push(`/?query=${searchQuery}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form max-w-2xl mx-auto mt-6 px-4"
    >
      <div className="relative flex items-center">
        <input
          name="query"
          defaultValue={query}
          placeholder="Projeleri ara..."
          className="w-full px-6 py-3 text-lg rounded-full border-2  focus:outline-none focus:border-btu_secondary transition-all shadow-sm hover:shadow-md"
        />
        <div className="absolute right-3 flex items-center gap-2">
          {query && <SearchFormReset />}
          <button
            type="submit"
            className="bg-btu_primary text-white px-4 py-2 rounded-full hover:bg-btu_secondary transition-colors"
          >
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
