import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import { usePieces } from "@/hooks/usePieces";
import NotFound from "../common/NotFound";
import Error from "../common/Error";


export default function ListePieces() {
  const { batimentId, etageId } = useParams();
  const { data, isLoading, error } = usePieces(etageId);
  const { pieces, etage } = data ?? { pieces: [], etage: { nom: "" } };
  const headerTitle = `Étage ${etage.nom.toUpperCase()}`;

  if (isLoading) {
    return (
      <div className="container">
        <Header title={headerTitle} />
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
        <Header title={headerTitle} />
        <SearchBar label="Rechercher" />
        <Error />
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
        {pieces?.length === 0 && <NotFound message="Aucune pièce trouvée" />}
      </div>
    </div>
  );
}
