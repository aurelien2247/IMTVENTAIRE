import type { Article } from "@/types";
import ArticleItem, { ArticleItemSkeleton } from "./ArticleItem";
import { PackageX } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ArticleListProps {
  articles?: Article[];
  ArticleComponent?: React.ComponentType<{ article: Article }>;
  groupBy?: string;
  openFirstByDefault?: boolean;
}

// Utilitaire pour accéder à une propriété imbriquée via une string (ex: 'categorie.nom')
function getNestedValue<T, R>(obj: T, path: string): R | undefined {
  return path.split(".").reduce((acc: unknown, part) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined), obj) as R | undefined;
}

/**
 * Groupe les articles par l'attribut spécifié dans groupBy
 * @param articles - Les articles à grouper
 * @param groupBy - Le chemin de la propriété (ex: 'categorie.nom')
 * @returns Un objet où les clés sont les valeurs de l'attribut et les valeurs sont les articles correspondants
 */
const groupArticles = (
  articles: Article[],
  groupBy: string
): Record<string, Article[]> => {
  return articles.reduce((groupedArticles: Record<string, Article[]>, article) => {
    const groupValue = getNestedValue<Article, string>(article, groupBy) ?? "Inconnu";
    if (!groupedArticles[groupValue]) {
      groupedArticles[groupValue] = [];
    }
    groupedArticles[groupValue].push(article);
    return groupedArticles;
  }, {} as Record<string, Article[]>);
};

export default function ArticleList({
  articles,
  ArticleComponent = ArticleItem,
  groupBy = "categorie.nom",
  openFirstByDefault = false,
}: ArticleListProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 pb-8 pt-12">
        <PackageX className="w-12 h-12" />
        <p className="text-muted-foreground">Aucun article trouvé</p>
      </div>
    );
  }

  const grouped = groupArticles(articles, groupBy);
  const groupKeys = Object.keys(grouped);
  const defaultOpen = openFirstByDefault && groupKeys.length > 0 ? [groupKeys[0]] : [];

  return (
    <div className="flex flex-col gap-6">
      <Accordion type="multiple" className="w-full" defaultValue={defaultOpen}>
        {Object.entries(grouped).map(([nomGroupe, articles]) => (
          <AccordionItem key={nomGroupe} value={nomGroupe}>
            <AccordionTrigger>
              <div className="flex items-center gap-2 justify-between w-full">
                <p>{nomGroupe}</p>
                <Badge variant="secondary">{articles.length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                {articles.map((article) => (
                  <div key={article.num_inventaire}>
                    <ArticleComponent article={article} />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

interface ArticleListSkeletonProps {
  ArticleComponent?: React.ComponentType;
}

export function ArticleListSkeleton({ ArticleComponent = ArticleItemSkeleton }: ArticleListSkeletonProps) {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
      <ArticleComponent />
    </div>
  );
}
