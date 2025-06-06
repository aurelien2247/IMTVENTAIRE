import { Search } from "lucide-react";
import { useState, useEffect, type ComponentProps, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

interface Props extends ComponentProps<"form"> {
  label: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export function SearchBar({ label, onSearch, defaultValue = "", ...props }: Props) {
  const [query, setQuery] = useState(defaultValue);
  const [debouncedQuery, setDebouncedQuery] = useState(defaultValue);
  const navigate = useNavigate();

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      if (onSearch) {
        onSearch(debouncedQuery);
      } else {
        // Navigate to search results page if no custom handler is provided
        navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`);
      }
    }
  }, [debouncedQuery, onSearch, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form submission is now just for handling Enter key press
    // The actual search is triggered by the useEffect above
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
