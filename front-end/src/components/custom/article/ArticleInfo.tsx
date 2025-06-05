import { Button } from "@/components/ui/button";
import { useArticle } from "@/hooks/useArticles";
import ArticleEtat, { ArticleEtatSkeleton } from "./ArticleEtat";
import { useAtom } from "jotai";
import { codeScannedAtom } from "@/lib/atoms";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleInfo() {
  const [codeScanned] = useAtom(codeScannedAtom);
  const { data: article } = useArticle(codeScanned);

  if (!article) {
    return null;
  }

  return (
    <div className="container flex flex-col gap-16">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <ArticleEtat etat={article.etat} />
            <h1>{article.categorie.nom}</h1>
          </span>
          <p className="text-muted-foreground">{article.piece.nom}</p>
        </div>
        <div className="flex gap-8 flex-wrap">
          <span className="min-w-0">
            <p className="font-bold truncate w-full">N° d'inventaire</p>
            <p>{article.num_inventaire}</p>
          </span>
          <span className="min-w-0">
            <p className="font-bold truncate w-full">N° de commande</p>
            <p>{article.num_serie}</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Button>Changer de pièce</Button>
        <Button variant="secondary">Modifier</Button>
      </div>
    </div>
  );
}

export function ArticleInfoSkeleton() {
  return (
    <div className="container flex flex-col gap-16">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <ArticleEtatSkeleton />
            <h1><Skeleton className="h-8 w-48 bg-muted animate-pulse rounded" /></h1>
          </span>
          <p className="text-muted-foreground"><Skeleton className="h-4 w-48 bg-muted animate-pulse rounded" /></p>
        </div>
        <div className="flex gap-8 flex-wrap">
          <span className="min-w-0">
            <p className="font-bold truncate w-full"><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
            <p><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
          </span>
          <span className="min-w-0">
            <p className="font-bold truncate w-full"><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
            <p><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Button disabled><Skeleton className="h-10 w-full bg-muted animate-pulse rounded" /></Button>
        <Button variant="secondary" disabled><Skeleton className="h-10 w-full bg-muted animate-pulse rounded" /></Button>
      </div>
    </div>
  );
}