import { useSearchParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import Header, { HeaderSkeleton } from "@/components/custom/Header";
import { SearchBar } from "@/components/custom/SearchBar";
import ArticleCard, {
  ArticleCardSkeleton,
} from "@/components/custom/article/ArticleCard";
import Card from "@/components/custom/Card";
import NotFound from "./common/NotFound";
import Error from "./common/Error";
import { useSearch } from "@/hooks/common/useSearch";
import { searchQueryAtom } from "@/lib/atoms";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const { articles, rooms, isLoading, error } = useSearch();

  // Initialize search query from URL
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam, setSearchQuery]);

  if (isLoading) {
    return (
      <div className="container">
        <HeaderSkeleton />
        <SearchBar />
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
        <Header title="Résultats de la recherche" />
        <SearchBar />
        <Error />
      </div>
    );
  }

  const hasResults =
    (articles && articles.length > 0) || (rooms && rooms.length > 0);

  if (!hasResults) {
    return (
      <div className="container">
        <Header title="Résultats de la recherche" />
        <SearchBar />
        <NotFound message="Aucun résultat trouvé pour cette recherche" />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="Résultats de la recherche" />
      <SearchBar />
      <div className="flex flex-col gap-2 mt-2">
        {rooms.length > 0 && (
          <>
            <h3>Salles</h3>
            <div className="flex flex-col gap-2">
              {rooms.map((room) => (
                <Card
                  key={room.id}
                  content={room.nom}
                  link={`/inventaire/${room.etage?.batiment?.id || ""}/${
                    room.etage?.id || ""
                  }/${room.id}`}
                />
              ))}
            </div>
          </>
        )}

        {articles.length > 0 && (
          <>
            <h3>Articles</h3>
            <div className="flex flex-col gap-2">
              {articles.map((article) => (
                <ArticleCard
                  key={article.num_inventaire}
                  article={article}
                  link={`/inventaire/${
                    article.piece?.etage?.batiment?.id || ""
                  }/${article.piece?.etage?.id || ""}/${
                    article.piece?.id || ""
                  }/${article.num_inventaire}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
