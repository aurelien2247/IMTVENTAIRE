import type { Article } from "@/types";
import { useNavigate } from "react-router-dom";
import ArticleItem, { ArticleItemSkeleton } from "./ArticleItem";
import { PackageX } from "lucide-react";

interface ArticleListProps {
  articles?: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const navigate = useNavigate();

  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <PackageX className="w-12 h-12" />
        <p className="text-muted-foreground">Aucun article dans la pièce</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">Articles dans la pièce</p>
      {articles.map((article) => (
        <div
          key={article.num_inventaire}
          onClick={() => navigate(`/inventaire/${article.num_inventaire}/modifier`)}
          className="cursor-pointer hover:bg-muted/50 p-2 -m-2 rounded-md transition-colors"
        >
          <ArticleItem article={article} />
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
