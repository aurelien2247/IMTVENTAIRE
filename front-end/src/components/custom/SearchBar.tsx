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

  /**
   * Si on n'est pas sur la page de recherche, on réinitialise la recherche
   */
  useEffect(() => {
    if (!location.pathname.includes("/inventaire/search")) {
      setQuery("");
    }
  }, [location.pathname, setQuery]);

  /**
   * Dès que l'on commence à taper, on redirige vers la page de recherche
   */
  useEffect(() => {
    if (query.trim().length === 1) {
      redirectToSearch();
    }
  }, [query, location.pathname, navigate]);

  /**
   * Redirige vers la page de résultats si une valeur est fournie
   */
  const redirectToSearch = () => {
    if (query.trim()) {
      navigate(`/inventaire/search?q=${encodeURIComponent(query)}`);
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
