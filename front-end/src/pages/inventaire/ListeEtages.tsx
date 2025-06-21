import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header, { HeaderSkeleton } from "@/components/custom/Header";
import { useEtages } from "@/hooks/useEtage";
import NotFound from "../common/NotFound";
import Error from "../common/Error";
import { cn } from "@/lib/utils";

interface ListeEtagesProps {
  batimentId?: string;
  onSelect?: (id: string) => void;
  onBack?: () => void;
}

export default function ListeEtages({ batimentId: propBatimentId, onSelect, onBack }: ListeEtagesProps) {
  const params = useParams();
  const routeBatimentId = params.batimentId;
  const batimentId = propBatimentId || routeBatimentId;

  const { data: etages, isLoading, error } = useEtages(batimentId);
  const headerTitle = `Bâtiment ${etages?.[0]?.batiment.nom.toUpperCase()}`;

  const style = cn(!onSelect && "container mx-auto", "flex flex-col gap-6");

  if (isLoading) {
    return (
      <div className={style}>
        {!onSelect && <HeaderSkeleton />}
        <SearchBar  />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card content={<div className="h-4 w-32 bg-muted-foreground/20 rounded" />} className="animate-pulse h-14" key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style}>
        {!onSelect && <Header title="Bâtiment introuvable" />}
        <SearchBar  />
        <Error />
      </div>
    );
  }

  if (!etages || etages.length === 0) {
    return (
      <div className={style}>
        {!onSelect && <Header title={headerTitle} />}
        <SearchBar  />
        <NotFound message="Aucun étage trouvé" />
      </div>
    );
  }

  return (
    <div className={style}>
      {!onSelect && <Header title={headerTitle} onBack={onBack} />}
      <SearchBar  />
      <div className="flex flex-col gap-2">
        {etages.map((etage) => (
          <Card
            content={etage.nom}
            key={etage.id}
            onClick={onSelect ? () => onSelect(etage.id.toString()) : undefined}
            link={!onSelect ? `/inventaire/${batimentId}/${etage.id}` : undefined}
          />
        ))}
      </div>
    </div>
  );
}
