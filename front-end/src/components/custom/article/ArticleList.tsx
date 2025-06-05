import type { Article } from "@/types";
import ArticleItem, { ArticleItemSkeleton } from "./ArticleItem";

interface ArticleListProps {
  articles?: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (!articles) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">Articles dans la pièce</p>
      {articles.map((article) => (
        <ArticleItem key={article.num_inventaire} article={article} />
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
