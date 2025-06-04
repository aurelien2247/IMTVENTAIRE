import { Button } from "@/components/ui/button";
import ArticleEtat from "./ArticleEtat";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

interface ArticleItemProps {
  article: Article;
  isScanned?: boolean;
}

export default function ArticleItem({
  article,
  isScanned = true,
}: ArticleItemProps) {
  return (
    <div
      key={article.num_inventaire}
      className="flex justify-between gap-4 items-center"
    >
      <div className={cn(!isScanned && "opacity-50")}>
        <span className="flex items-center gap-2">
          <ArticleEtat etat={article.etat} />
          <h3>{article.categorie.nom}</h3>
        </span>
        <small className="text-muted-foreground">
          #{article.num_inventaire}
        </small>
      </div>
      <Button variant="secondary">Modifier</Button>
    </div>
  );
}
