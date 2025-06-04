import { Button } from "@/components/ui/button";
import { useArticle } from "@/hooks/useArticles";
import ArticleEtat from "./ArticleEtat";

interface ArticleInfoProps {
  idArticle: string | null;
}
export default function ArticleInfo({ idArticle }: ArticleInfoProps) {
  const { data: article } = useArticle(idArticle);

  if (!article) {
    return null;
  }

  console.log(article);

  return (
    <div className="container">
      <div className="flex flex-col gap-4 justify-between">
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
    </div>
  );
}
