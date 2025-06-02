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

export default function ListeBatiments() {
  const { data: batiments, isLoading, error } = useBatiments();

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
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !batiments) {
    return (
      <div className="container mx-auto">
        <Header title="Inventaire" />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Erreur lors du chargement des données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Header title="Inventaire" />
      <SearchBar label="Rechercher" />
      <Accordion type="multiple">
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
      </Accordion>
    </div>
  );
}
