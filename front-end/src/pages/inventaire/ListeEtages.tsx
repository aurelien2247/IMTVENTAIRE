import { useParams } from "react-router-dom";
import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import { useEtages } from "@/hooks/useEtages";
import NotFound from "../common/NotFound";
import Error from "../common/Error";

export default function ListeEtages() {
  const { batimentId } = useParams();
  const { data: etages, isLoading, error } = useEtages(batimentId);
  const headerTitle = `Bâtiment ${etages?.[0]?.batiment.nom.toUpperCase()}`;

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

  if (!etages || etages.length === 0) {
    return (
      <div className="container">
        <Header title={headerTitle} />
        <SearchBar label="Rechercher" />
        <NotFound message="Aucun étage trouvé" />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title={headerTitle} />
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
