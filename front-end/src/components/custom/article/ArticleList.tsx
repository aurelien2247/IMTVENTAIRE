import type { Article } from "@/types";
import ArticleItem from "./ArticleItem";

interface ArticleListProps {
  articles?: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (!articles) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">Articles dans la pièce</p>
      <div className="flex flex-col gap-2">
        {articles.map((article) => (
          <ArticleItem key={article.num_inventaire} article={article} />
        ))}
      </div>
    </div>
  );
}
