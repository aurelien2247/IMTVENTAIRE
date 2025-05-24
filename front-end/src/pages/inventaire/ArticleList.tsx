import { useParams } from "react-router-dom";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import { Etat, type Article } from "@/types";
import ArticleCard from "@/components/custom/ArticleCard";

export default function ArticleList() {
  const { batimentId, etageId, pieceId } = useParams();

  // Données fictives des articles
  const articles: Article[] = [
    {
      num_inventaire: "INV-001",
      categorie: "Ordinateur",
      num_serie: "SN123456",
      num_bon_commande: "BC789",
      etat: Etat.Neuf,
    },
    {
      num_inventaire: "INV-002",
      categorie: "Écran",
      num_serie: "SN789012",
      num_bon_commande: "BC456",
      etat: Etat["Bon état"],
    },
    {
      num_inventaire: "INV-003",
      categorie: "Imprimante",
      num_serie: "SN345678",
      num_bon_commande: "BC123",
      etat: Etat["Mauvais état"],
    },
    {
      num_inventaire: "INV-004",
      categorie: "Bureau",
      num_serie: "SN901234",
      num_bon_commande: "BC321",
      etat: Etat["En attente de destruction"],
    },
    {
      num_inventaire: "INV-005",
      categorie: "Chaise",
      num_serie: "SN567890",
      num_bon_commande: "BC654",
      etat: Etat.Détruit,
    },
  ];

  return (
    <div className="container">
      <Header title={`Salle ${pieceId}`} />
      <SearchBar label="Rechercher" />
      <div className="flex flex-col gap-2">
        {articles.map((article) => (
          <ArticleCard
            key={article.num_inventaire}
            article={article}
            link={`/inventaire/${batimentId}/${etageId}/${pieceId}/${article.num_inventaire}`}
          />
        ))}
      </div>
    </div>
  );
}
