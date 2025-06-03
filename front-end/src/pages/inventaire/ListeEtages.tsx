import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import { useEtages } from "@/hooks/useEtages";
import NotFound from "../common/NotFound";
import Error from "../common/Error";

export default function ListeEtages() {
  const { batimentId } = useParams();
  const { data, isLoading, error } = useEtages(batimentId);
  const { etages, batiment } = data ?? { etages: [], batiment: { nom: "" } };
  const headerTitle = `Bâtiment ${batiment.nom.toUpperCase()}`;

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
        {etages?.map((etage) => (
          <Card
            content={etage.nom}
            link={`/inventaire/${batimentId}/${etage.id}`}
          />
        ))}
        {etages?.length === 0 && <NotFound message="Aucun étage trouvé" />}
      </div>
    </div>
  );
}
