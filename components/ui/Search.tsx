"use client";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Search = ({
  placeholder = "Search",
  search,
  callback,
}: {
  placeholder?: string;
  search?: string;
  callback: string;
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(search);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query?.trim(); // Remove leading and trailing whitespace

    if (!trimmedQuery) {
      setQuery("");
      return router.push(callback);
    }

    router.push(`${callback}?search=${encodeURIComponent(trimmedQuery)}`);
  };

  // Capture CMD + K to focus on search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        e.preventDefault();
        document.getElementById("search")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={cn("relative w-full -z-50")}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-4 h-4 mr-1" aria-hidden="true" />
      </div>
      <form action="" noValidate onSubmit={handleSearch}>
        <input
          id="search"
          name="search"
          type="search"
          autoCapitalize="off"
          autoComplete="off"
          className={cn(
            "border block p-2 pl-10 text-base sm:text-sm text-gray-900 placeholder:text-gray-500 rounded-lg w-full bg-white focus:ring-slate-800 focus:border-slate-800 focus:outline-none"
          )}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
