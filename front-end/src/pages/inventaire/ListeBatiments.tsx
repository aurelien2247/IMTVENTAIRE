import Card from "@/components/custom/Card";
import Header from "@/components/custom/Header";
import { SearchBar } from "@/components/custom/SearchBar";
import type { Batiment } from "@/types";
import NotFound from "../common/NotFound";
import Error from "../common/Error";
import { useBatiments } from "@/hooks/useBatiment";

export default function ListeBatiments() {
  const { data: batiments, isLoading, error } = useBatiments();

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Header title="Inventaire" />
        <SearchBar  />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card
              content={
                <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
              }
              className="animate-pulse h-14"
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto">
        <Header title="Inventaire" />
        <SearchBar  />
        <Error />
      </div>
    );
  }

  if (!batiments || batiments.length === 0) {
    return (
      <div className="container mx-auto">
        <Header title="Inventaire" />
        <SearchBar  />
        <NotFound message="Aucun bâtiment trouvé" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Header title="Inventaire" />
      <SearchBar  />
      <div className="flex flex-col gap-2">
        {batiments.map((batiment: Batiment) => (
          <Card
            key={batiment.id}
            content={`Bâtiment ${batiment.nom}`}
            link={`/inventaire/${batiment.id}`}
          />
        ))}
      </div>
    </div>
  );
}
