import type { Article } from "@/types";
import Card from "./Card";

interface Props {
  article: Article;
  link: string;
}

export default function ArticleCard({ article, link }: Props) {
  const content = (
    <div className="flex flex-col gap-4">
      <span className="flex flex-col">
        <p>{article.categorie}</p>
        <p className="text-sm text-muted-foreground">
          {article.num_inventaire}
        </p>
      </span>
      <div className="flex gap-4">
        <span className="flex flex-col gap-1">
          <p className="text-sm">Numéro de série</p>
          <p className="text-sm text-muted-foreground">{article.num_serie}</p>
        </span>
        <span className="flex flex-col gap-1">
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
