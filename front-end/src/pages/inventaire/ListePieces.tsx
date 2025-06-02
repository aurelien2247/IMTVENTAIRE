import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import { usePieces } from "@/hooks/usePieces";


export default function ListePieces() {
  const { batimentId, etageId } = useParams();
  const { data: pieces, isLoading, error } = usePieces(etageId ?? "");

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error || !pieces) {
    return <div>Erreur lors de la récupération des pièces</div>;
  }

  return (
    <div className="container">
      <Header title={`Étage ${etageId}`} />
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
