import type { Article, Piece } from "@/types";
import { useNavigate } from "react-router-dom";
import ArticleItem, { ArticleItemSkeleton } from "./ArticleItem";

interface ArticleListProps {
  articles?: Article[];
  piece?: Piece;
}

export default function ArticleList({ articles, piece }: ArticleListProps) {
  const navigate = useNavigate();

  if (!articles) {
    return null;
  }

  const handleArticleClick = (article: Article) => {
    const batimentId = article.piece.etage.batiment.id;
    const etageId = article.piece.etage.id;
    const pieceId = article.piece.id;
    const articleId = article.num_inventaire;
    navigate(`/inventaire/${batimentId}/${etageId}/${pieceId}/${articleId}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">Articles dans la pièce</p>
      {articles.map((article) => (
        <div
          key={article.num_inventaire}
          onClick={() => handleArticleClick(article)}
          className="cursor-pointer hover:bg-muted/50 p-2 -m-2 rounded-md transition-colors"
        >
          <ArticleItem article={article} piece={piece} />
        </div>
      ))}
    </div>
  );
}

export function ArticleListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">Articles dans la pièce</p>
      {[...Array(3)].map((_, index) => (
        <ArticleItemSkeleton key={index} />
      ))}
    </div>
  );
}
