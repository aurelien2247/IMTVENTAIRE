import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import type { Piece } from "@/types";


export default function PieceList() {
  const { batimentId, etageId } = useParams();

  // Données fictives des pièces
  const pieces: Piece[] = [
    { id: 101, nom: "Salle 101" },
    { id: 102, nom: "Salle 102" },
    { id: 103, nom: "Salle 103" },
    { id: 104, nom: "Salle 104" },
    { id: 105, nom: "Salle 105" },
  ];

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
