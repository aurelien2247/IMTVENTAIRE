import { useParams } from "react-router-dom";
import Card from "../../components/custom/Card";
import type { Etage } from "../../types";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";

export default function EtageList() {
  const { batimentId } = useParams();

  // Données fictives des étages
  const etages: Etage[] = [
    { id: 0, nom: "Rez-de-chaussée" },
    { id: 1, nom: "1er étage" },
    { id: 2, nom: "2ème étage" },
    { id: 3, nom: "3ème étage" },
  ];

  return (
    <div className="container">
      <Header title={`Bâtiment ${batimentId?.toUpperCase()}`} />
      <SearchBar label="Rechercher" />
      <div className="flex flex-col gap-2">
        {etages.map((etage) => (
          <Card
            content={etage.nom}
            link={`/inventaire/${batimentId}/${etage.id}`}
          />
        ))}
      </div>
    </div>
  );
}
