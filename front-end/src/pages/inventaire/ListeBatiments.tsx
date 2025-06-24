import Card from "@/components/custom/Card";
import Header from "@/components/custom/Header";
import { SearchBar } from "@/components/custom/SearchBar";
import type { Batiment } from "@/types";
import NotFound from "../common/NotFound";
import Error from "../common/Error";
import { useBatiments } from "@/hooks/useBatiment";
import { cn } from "@/lib/utils";

interface ListeBatimentsProps {
  onSelect?: (id: string) => void;
  title?: string;
}

export default function ListeBatiments({ onSelect, title = "Inventaire" }: ListeBatimentsProps) {
  const { data: batiments, isLoading, error } = useBatiments();

  const style = cn(!onSelect && "container", "flex flex-col gap-6");

  if (isLoading) {
    return (
      <div className={style}>
        {!onSelect && <Header title={title} />}
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
      <div className={style}>
        {!onSelect && <Header title={title} />}
        <SearchBar  />
        <Error />
      </div>
    );
  }

  if (!batiments || batiments.length === 0) {
    return (
      <div className={style}>
        {!onSelect && <Header title={title} />}
        <SearchBar  />
        <NotFound message="Aucun bâtiment trouvé" />
      </div>
    );
  }

  return (
    <div className={style}>
      {!onSelect && <Header title={title} />}
      <SearchBar  />
      <div className="flex flex-col gap-2">
        {batiments.map((batiment: Batiment) => (
          <Card
            key={batiment.id}
            content={`Bâtiment ${batiment.nom}`}
            onClick={onSelect ? () => onSelect(batiment.id.toString()) : undefined}
            link={!onSelect ? `/inventaire/${batiment.id}` : undefined}
          />
        ))}
      </div>
    </div>
  );
}
