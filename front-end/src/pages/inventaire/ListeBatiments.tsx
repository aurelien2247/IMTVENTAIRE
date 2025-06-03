import Card from "@/components/custom/Card";
import Header from "@/components/custom/Header";
import { SearchBar } from "@/components/custom/SearchBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBatiments } from "@/hooks/useBatiments";
import type { Categorie } from "@/types";
import type { Batiment } from "@/types";
import NotFound from "../common/NotFound";
import Error from "../common/Error";

export default function ListeBatiments() {
  const { data, isLoading, error } = useBatiments();
  const batiments = data ?? [];

  const categories = [
    {
      id: 1,
      nom: "École",
      batiments: batiments ?? [],
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Header title="Inventaire" />
        <SearchBar label="Rechercher" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card content={<div className="h-4 w-32 bg-muted-foreground/20 rounded" />} className="animate-pulse h-14" key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto">
        <Header title="Inventaire" />
        <SearchBar label="Rechercher" />
        <Error />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Header title="Inventaire" />
      <SearchBar label="Rechercher" />
      <Accordion 
        type="multiple" 
        defaultValue={categories.map(category => category.id.toString())}
      >
        {categories?.map((category: Categorie) => (
          <AccordionItem key={category.id} value={category.id.toString()}>
            <AccordionTrigger>{category.nom}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {category.batiments.map((building: Batiment) => (
                <Card
                  key={building.id}
                  content={building.nom}
                  link={`/inventaire/${building.id}`}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
        {categories.length === 0 && <NotFound message="Aucun bâtiment trouvé" />}
      </Accordion>
    </div>
  );
}
