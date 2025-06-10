import { Search } from "lucide-react";
import type { ComponentProps } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { searchQueryAtom } from "@/lib/atoms";

interface Props extends ComponentProps<"form"> {
  label?: string;
}

export function SearchBar({ label = "Rechercher", ...props }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useAtom(searchQueryAtom);
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("/inventaire/search")) {
      setQuery("");
    }
  }, [location.pathname, setQuery]);

  /**
   * Dès que la recherche change
   */
  useEffect(() => {
    if (query) {
      redirectToSearch();
    } else if (location.pathname.includes("/inventaire/search")) {
      navigate("/inventaire", { replace: true });
    }
  }, [query, location.pathname, navigate]);

  /**
   * Redirige vers la page de résultats si une valeur est fournie
   */
  const redirectToSearch = () => {
    if (query.trim()) {
      navigate(`/inventaire/search?q=${encodeURIComponent(query)}`, { replace: true });
    } 
  };

  

  return (
    <form {...props} className="relative" onSubmit={redirectToSearch}>
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
