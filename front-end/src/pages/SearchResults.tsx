import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchArticles } from "@/api/article";
import type { Article, Piece } from "@/types";
import Header, { HeaderSkeleton } from "@/components/custom/Header";
import { SearchBar } from "@/components/custom/SearchBar";
import ArticleCard, { ArticleCardSkeleton } from "@/components/custom/article/ArticleCard";
import Card from "@/components/custom/Card";
import NotFound from "./common/NotFound";
import Error from "./common/Error";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [rooms, setRooms] = useState<Piece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setArticles([]);
        setRooms([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchArticles(query);
        setArticles(results.articles);
        setRooms(results.rooms);
      } catch (err) {
        console.error("Error searching articles:", err);
        setError(err instanceof Error ? err : new Error("Une erreur est survenue"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) {
    return (
      <div className="container">
        <HeaderSkeleton />
        <SearchBar label="Rechercher" defaultValue={query} />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Header title="Résultats de recherche" />
        <SearchBar label="Rechercher" defaultValue={query} />
        <Error />
      </div>
    );
  }

  const hasResults = (articles && articles.length > 0) || (rooms && rooms.length > 0);

  if (!hasResults) {
    return (
      <div className="container">
        <Header title="Résultats de recherche" />
        <SearchBar label="Rechercher" defaultValue={query} />
        <NotFound message="Aucun résultat trouvé pour cette recherche" />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="Résultats de recherche" />
      <SearchBar label="Rechercher" defaultValue={query} />

      {rooms.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-4 mb-2">Salles</h2>
          <div className="flex flex-col gap-2 mb-6">
            {rooms.map((room) => (
              <Card
                key={room.id}
                content={room.nom}
                link={`/inventaire/${room.etage?.batiment?.id || ""}/${room.etage?.id || ""}/${room.id}`}
              />
            ))}
          </div>
        </>
      )}

      {articles.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-4 mb-2">Articles</h2>
          <div className="flex flex-col gap-2">
            {articles.map((article) => (
              <ArticleCard
                key={article.num_inventaire}
                article={article}
                link={`/inventaire/${article.piece?.etage?.batiment?.id || ""}/${article.piece?.etage?.id || ""}/${article.piece?.id || ""}/${article.num_inventaire}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
