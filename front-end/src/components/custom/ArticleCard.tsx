import type { Article } from "@/types";
import { Etat } from "@/types";
import Card from "./Card";

interface Props {
  article: Article;
  link: string;
}

export default function ArticleCard({ article, link }: Props) {
  const getEtatColor = (etat: Etat) => {
    switch (etat) {
      case Etat.Neuf:
        return 'bg-green-500';
      case Etat["Bon état"]:
        return 'bg-green-400';
      case Etat["Mauvais état"]:
        return 'bg-yellow-500';
      case Etat["En attente de destruction"]:
        return 'bg-orange-500';
      case Etat.Détruit:
        return 'bg-red-500';
    }
  };

  const content = (
    <div className="flex flex-col gap-4">
      <span className="flex flex-col">
        <div className="flex items-center gap-2">
          <div 
            className={`w-1.5 aspect-square rounded-full ${getEtatColor(article.etat)}`} 
            title={Etat[article.etat]}
          />
          <p>{article.categorie}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {article.num_inventaire}
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
