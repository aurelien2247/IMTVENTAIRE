import { useParams } from "react-router-dom";
import { SearchBar } from "@/components/custom/SearchBar";
import Header from "@/components/custom/Header";
import ArticleCard, { ArticleCardSkeleton } from "@/components/custom/ArticleCard";
import NotFound from "../common/NotFound";
import { useArticles } from "@/hooks/useArticles";
import Error from "../common/Error";

export default function ListeArticles() {
  const { batimentId, etageId, pieceId } = useParams();
  const { data: articles, isLoading, error } = useArticles(pieceId);
  const headerTitle = `Salle ${articles?.[0]?.piece.nom.toUpperCase()}`;

  if (isLoading) {
    return (
      <div className="container">
        <Header title={headerTitle} />
        <SearchBar label="Rechercher" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
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

  if (!articles || articles.length === 0) {
    return (
      <div className="container">
        <Header title={headerTitle} />
        <SearchBar label="Rechercher" />
        <NotFound message="Aucun article trouvé" />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title={headerTitle} />
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
