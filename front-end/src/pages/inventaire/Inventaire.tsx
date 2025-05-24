import Card from "@/components/custom/Card";
import { SearchBar } from "@/components/custom/SearchBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Inventaire() {
  // TODO: Récupérer les données du backend
  const categories = [
    {
      id: "ecole",
      name: "École",
      buildings: [
        { id: "a", name: "Bâtiment A" },
        { id: "b", name: "Bâtiment B" },
        { id: "c", name: "Bâtiment C" },
      ],
    },
    {
      id: "logements",
      name: "Logements",
      buildings: [
        { id: "j", name: "Bâtiment J" },
        { id: "k", name: "Bâtiment K" },
      ],
    },
    {
      id: "administration",
      name: "Administration",
      buildings: [
        { id: "x", name: "Bâtiment X" },
        { id: "y", name: "Bâtiment Y" },
      ],
    },
  ];

  return (
    <div className="container mx-auto">
      <h1>Inventaire</h1>
      <SearchBar label="Rechercher" />
      <Accordion type="multiple">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {category.buildings.map((building) => (
                <Card
                  key={building.id}
                  content={building.name}
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
