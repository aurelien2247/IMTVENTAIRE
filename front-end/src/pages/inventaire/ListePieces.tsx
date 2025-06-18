import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header, { HeaderSkeleton } from "@/components/custom/Header";
import { usePieces } from "@/hooks/usePiece";
import NotFound from "../common/NotFound";
import Error from "../common/Error";

export default function ListePieces({ batimentId: propBatimentId, etageId: propEtageId, onSelect, onBack }: { batimentId?: string, etageId?: string, onSelect?: (id: string) => void, onBack?: () => void }) {
  const params = useParams();
  const routeBatimentId = params.batimentId;
  const routeEtageId = params.etageId;
  const batimentId = propBatimentId || routeBatimentId;
  const etageId = propEtageId || routeEtageId;

  const { data: pieces, isLoading, error } = usePieces(etageId);
  const headerTitle = pieces?.[0]?.etage.nom.toUpperCase() 
    ? `Étage ${pieces[0].etage.nom.toUpperCase()}`
    : "Étage";

  // Si onSelect n'est pas fourni, on est dans le mode route
  const isRouteMode = !onSelect;

  if (isLoading) {
    return (
      <div className="container">
        <HeaderSkeleton />
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
      <div className="container">
        <Header title="Étage introuvable" />
        <SearchBar  />
        <Error />
      </div>
    );
  }

  if (!pieces || pieces.length === 0) {
    return (
      <div className="container">
        <Header title={headerTitle} />
        <SearchBar  />
        <NotFound message="Aucune pièce trouvée" />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title={headerTitle} onBack={onBack} />
      <SearchBar  />
      <div className="flex flex-col gap-2">
        {pieces.map((piece) => (
          <Card
            key={piece.id}
            content={piece.nom}
            onClick={onSelect ? () => onSelect(piece.id.toString()) : undefined}
            link={!onSelect ? `/inventaire/${batimentId}/${etageId}/${piece.id}` : undefined}
          />
        ))}
      </div>
    </div>
  );
}
