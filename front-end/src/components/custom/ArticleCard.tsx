import type { Article, Etat } from "@/types";
import { EtatEnum } from "@/types";
import Card from "./Card";

interface Props {
  article: Article;
  link: string;
}

export default function ArticleCard({ article, link }: Props) {
  const getEtatColor = (etat: Etat) => {
    switch (etat.id) {
      case EtatEnum.Neuf:
        return 'bg-green-500';
      case EtatEnum["Bon état"]:
        return 'bg-green-400';
      case EtatEnum["Mauvais état"]:
        return 'bg-yellow-500';
      case EtatEnum["En attente de destruction"]:
        return 'bg-orange-500';
      case EtatEnum.Détruit:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const content = (
    <div className="flex flex-col gap-4">
      <span className="flex flex-col">
        <div className="flex items-center gap-2">
          <div 
            className={`w-1.5 aspect-square rounded-full ${getEtatColor(article.etat)}`} 
            title={EtatEnum[article.etat.id]}
          />
          <p>{article.categorie.nom}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          #{article.num_inventaire}
        </p>
      </span>
      <div className="flex gap-4">
        <span>
          <p className="text-sm">Numéro de série</p>
          <p className="text-sm text-muted-foreground">{article.num_serie}</p>
        </span>
        <span>
          <p className="text-sm">N° de commande</p>
          <p className="text-sm text-muted-foreground">
            {article.num_bon_commande}
          </p>
        </span>
      </div>
    </div>
  );

  return <Card content={content} link={link} />;
}

export function ArticleCardSkeleton() {
  const content = (
    <div className="flex flex-col gap-4 w-full">
      <span className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 aspect-square rounded-full bg-muted-foreground/20" />
          <div className="h-4 w-24 bg-muted-foreground/20 rounded" />
        </div>
        <div className="h-3 w-32 bg-muted-foreground/20 rounded" />
      </span>
      <div className="flex gap-4">
        <span className="flex flex-col gap-1">
          <div className="h-3 w-24 bg-muted-foreground/20 rounded" />
          <div className="h-3 w-32 bg-muted-foreground/20 rounded" />
        </span>
        <span className="flex flex-col gap-1">
          <div className="h-3 w-24 bg-muted-foreground/20 rounded" />
          <div className="h-3 w-32 bg-muted-foreground/20 rounded" />
        </span>
      </div>
    </div>
  );

  return <Card content={content} className="animate-pulse" />;
}
