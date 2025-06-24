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
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <PackageX className="w-12 h-12" />
        <p className="text-muted-foreground">Aucun article dans la pièce</p>
      </div>
    );
  }

  /**
   * Groupe les articles par leur catégorie
   * @param articles - Les articles à grouper
   * @returns Un objet où les clés sont les noms des catégories et les valeurs sont les articles correspondants
   */
  const groupArticlesByCategory = (articles: Article[]): Record<string, Article[]> => {
    return articles.reduce((groupedArticles, article) => {
      const categoryName = article.categorie.nom;
      
      // Crée un tableau vide pour la catégorie si elle n'existe pas encore
      if (!groupedArticles[categoryName]) {
        groupedArticles[categoryName] = [];
      }
      
      // Ajoute l'article au tableau de sa catégorie
      groupedArticles[categoryName].push(article);
      
      return groupedArticles;
    }, {} as Record<string, Article[]>);
  };

  const grouped = groupArticlesByCategory(articles);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">Articles dans la pièce</p>
      <Accordion type="multiple" className="w-full">
        {Object.entries(grouped).map(([categorieNom, articles]) => (
          <AccordionItem key={categorieNom} value={categorieNom}>
            <AccordionTrigger>
              <div className="flex items-center gap-2 justify-between w-full">
                <p>{categorieNom}</p>
                <Badge variant="secondary">
                  {articles.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                {articles.map((article) => (
                  <div key={article.num_inventaire}>
                    <ArticleItem article={article} />
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

export function ArticleListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">Articles dans la pièce</p>
      {[...Array(3)].map((_, index) => (
        <ArticleItemSkeleton key={index} />
      ))}
    </div>
  );
}
