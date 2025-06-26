import { useState } from "react";
import Header from "@/components/custom/Header";
import ArticleList, {
  ArticleListSkeleton,
} from "@/components/custom/article/ArticleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useArchives } from "@/hooks/useArticle";
import { EtatEnum } from "@/types";
import Error from "../common/Error";

export default function Archives() {
  const [tab, setTab] = useState("En attente de destruction");
  const {
    data: articles,
    isLoading,
    error,
  } = useArchives(EtatEnum[tab as keyof typeof EtatEnum]);

  if (isLoading) {
    return (
      <div className="container">
        <Header title="Archives" />
        <Tabs value={tab}>
          <TabsList className="flex-1 max-w-[400px] w-full">
            <TabsTrigger value="En attente de destruction" disabled>
              En attente de destruction
            </TabsTrigger>
            <TabsTrigger value="Détruit" disabled>
              Détruit
            </TabsTrigger>
          </TabsList>
          <TabsContent value="En attente de destruction">
            <ArticleListSkeleton />
          </TabsContent>
          <TabsContent value="Détruit">
            <ArticleListSkeleton />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Header title="Archives" />
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex-1 max-w-[400px] w-full">
            <TabsTrigger value="En attente de destruction">
              En attente de destruction
            </TabsTrigger>
            <TabsTrigger value="Détruit">Détruit</TabsTrigger>
          </TabsList>
        </Tabs>
        <Error />
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="Archives" />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-1 max-w-[400px] w-full">
          <TabsTrigger value="En attente de destruction">
            En attente de destruction
          </TabsTrigger>
          <TabsTrigger value="Détruit">Détruit</TabsTrigger>
        </TabsList>
        <TabsContent value="En attente de destruction">
          <ArticleList
            articles={articles}
            groupBy="annee_derniere_modification"
            openFirstByDefault
          />
        </TabsContent>
        <TabsContent value="Détruit">
          <ArticleList
            articles={articles}
            groupBy="annee_derniere_modification"
            openFirstByDefault
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
