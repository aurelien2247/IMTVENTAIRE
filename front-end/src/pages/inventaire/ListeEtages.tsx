import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import { useEtages } from "@/hooks/useEtages";

export default function ListeEtages() {
  const { batimentId } = useParams();
  const { data: etages, isLoading, error } = useEtages(batimentId ?? "");

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur lors de la récupération des étages</div>;
  }

  return (
    <div className="container">
      <Header title={`Bâtiment ${batimentId?.toUpperCase()}`} />
      <SearchBar label="Rechercher" />
      <div className="flex flex-col gap-2">
        {etages?.map((etage) => (
          <Card
            content={etage.nom}
            link={`/inventaire/${batimentId}/${etage.id}`}
          />
        ))}
      </div>
    </div>
  );
}
