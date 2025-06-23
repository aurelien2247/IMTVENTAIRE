import type { Article } from "@/types";
import Card from "../Card";
import ArticleEtat from "./ArticleEtat";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { History } from "lucide-react";

interface Props {
  article: Article;
  link: string;
}

export default function ArticleCard({ article, link }: Props) {
  // Formatage de la date de modification uniquement
  const dateModification = format(new Date(article.date_modification), "dd/MM/yyyy", { locale: fr });

  const content = (
    <div className="flex flex-col gap-4">
      <span className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArticleEtat etat={article.etat} />
            <p>{article.categorie.nom}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <History className="h-3 w-3" />
            <p>{dateModification}</p>
          </div>
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
