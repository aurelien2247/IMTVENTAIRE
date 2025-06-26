import { useParams } from "react-router-dom";
import { SearchBar } from "@/components/custom/SearchBar";
import Header, { HeaderSkeleton } from "@/components/custom/Header";
import ArticleCard, { ArticleCardSkeleton } from "@/components/custom/article/ArticleCard";
import NotFound from "../common/NotFound";
import { useArticles } from "@/hooks/useArticle";
import { usePieces } from "@/hooks/usePiece";
import Error from "../common/Error";
import { searchQueryAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import SearchResults from "../SearchResults";

export default function ListeArticles() {
  const { etageId, pieceId } = useParams();
  const { data: articles, isLoading: isLoadingArticles, error: errorArticles } = useArticles(pieceId);
  const { data: pieces, isLoading: isLoadingPieces, error: errorPieces } = usePieces(etageId);
  const [query] = useAtom(searchQueryAtom);

  const piece = pieces?.find((p) => p.id === Number(pieceId));
  const headerTitle = `${piece?.nom?.toUpperCase() ?? ""}`;

  if (query.trim().length >= 1) {
    return (<SearchResults queryParam={query} />)
  } else {
    if (isLoadingArticles || isLoadingPieces) {
      return (
        <div className="container">
          <HeaderSkeleton />
          <SearchBar />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      );
    }

    if (errorArticles || errorPieces) {
      return (
        <div className="container">
          <Header title="Salle introuvable" />
          <SearchBar />
          <Error />
        </div>
      );
    }

    if (!articles || articles.length === 0) {
      return (
        <div className="container">
          <Header title={headerTitle} />
          <SearchBar />
          <NotFound message="Aucun article trouvé" />
        </div>
      );
    }

    return (
      <div className="container">
        <Header title={headerTitle} />
        <SearchBar />
        <div className="flex flex-col gap-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.num_inventaire}
              article={article}
              link={`/inventaire/${article.num_inventaire}/modifier`}
            />
          ))}
        </div>
      </div>
    );
  }
}
