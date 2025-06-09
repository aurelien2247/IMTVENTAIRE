import { Search } from "lucide-react";
import { type ComponentProps, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useSearch } from "@/hooks/common/useSearch";

interface Props extends ComponentProps<"form"> {
  label: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export function SearchBar({ label, onSearch, defaultValue = "", ...props }: Props) {
  const navigate = useNavigate();
  const { query, setQuery } = useSearch(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        // Navigate to search results page if no custom handler is provided
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form {...props} className="relative" onSubmit={handleSubmit}>
      <Label htmlFor="search" className="sr-only">
        {label}
      </Label>
      <Input 
        id="search" 
        placeholder={label} 
        className="pl-8" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </form>
  );
}
