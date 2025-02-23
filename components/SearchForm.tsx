import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="search-form max-w-2xl mx-auto mt-8 px-4"
    >
      <div className="relative flex items-center">
        <input
          name="query"
          defaultValue={query}
          placeholder="Projeleri ara..."
          className="w-full px-6 py-3 text-lg rounded-full border-2  focus:outline-none focus:border-btu_secondary focus:ring-4 focus:ring-btu_secondary/20 transition-all shadow-sm hover:shadow-md"
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
    </Form>
  );
};

export default SearchForm;
