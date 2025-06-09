import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header, { HeaderSkeleton } from "@/components/custom/Header";
import { usePieces } from "@/hooks/usePiece";
import NotFound from "../common/NotFound";
import Error from "../common/Error";

export default function ListePieces() {
  const { batimentId, etageId } = useParams();
  const { data: pieces, isLoading, error } = usePieces(etageId);
  const headerTitle = pieces?.[0]?.etage.nom.toUpperCase() 
    ? `Étage ${pieces[0].etage.nom.toUpperCase()}`
    : "Étage";

  if (isLoading) {
    return (
      <div className="container">
        <HeaderSkeleton />
        <SearchBar label="Rechercher" />
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
        <SearchBar label="Rechercher" />
        <Error />
      </div>
    );
  }

  if (!pieces || pieces.length === 0) {
    return (
      <div className="container">
        <Header title={headerTitle} />
        <SearchBar label="Rechercher" />
        <NotFound message="Aucune pièce trouvée" />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title={headerTitle} />
      <SearchBar label="Rechercher" />
      <div className="flex flex-col gap-2">
        {pieces.map((piece) => (
          <Card
            key={piece.id}
            content={piece.nom}
            link={`/inventaire/${batimentId}/${etageId}/${piece.id}`}
          />
        ))}
      </div>
    </div>
  );
}
