import { Search } from "lucide-react";
import { useEffect, type ComponentProps } from "react";
import { useAtom } from "jotai";

import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { searchQueryAtom } from "@/lib/atoms";
import { useLocation, useNavigate } from "react-router-dom";

interface Props extends ComponentProps<"form"> {
  label?: string;
}

export function SearchBar({ label = "Rechercher", ...props }: Props) {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const location = useLocation()

  useEffect(() => {
    setQuery("");
    return () => {
      setQuery("");
    };
  }, [location]);

return (
    <form {...props} className="relative">
      <Label htmlFor="search" className="sr-only">
        {label}
      </Label>
      <Input
        id="search"
        placeholder={label}
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </form>
  );
}
