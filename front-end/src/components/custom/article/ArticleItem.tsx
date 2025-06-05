import { Button } from "@/components/ui/button";
import ArticleEtat, { ArticleEtatSkeleton } from "./ArticleEtat";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

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

export function ArticleItemSkeleton() {
  return (
    <div
      className="flex justify-between gap-4 items-center"
    >
      <div>
        <span className="flex items-center gap-2">
          <ArticleEtatSkeleton />
          <Skeleton className="h-4.5 w-24" />
        </span>
        <small className="text-muted-foreground flex items-center gap-2">
          #<Skeleton className="h-3.5 w-24" />
        </small>
      </div>
      <Button variant="secondary" disabled>Modifier</Button>
    </div>
  );
}
