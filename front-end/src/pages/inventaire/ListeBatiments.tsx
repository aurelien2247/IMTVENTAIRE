import Card from "@/components/custom/Card";
import Header from "@/components/custom/Header";
import { SearchBar } from "@/components/custom/SearchBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useZones } from "@/hooks/useZones";
import type { Zone } from "@/types";
import type { Batiment } from "@/types";
import NotFound from "../common/NotFound";
import Error from "../common/Error";

export default function ListeBatiments() {
  const { data: zones, isLoading, error } = useZones();

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

  if (!zones || zones.length === 0) {
    return (
      <div className="container mx-auto">
        <Header title="Inventaire" />
        <SearchBar label="Rechercher" />
        <NotFound message="Aucun bâtiment trouvé" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Header title="Inventaire" />
      <SearchBar label="Rechercher" />
      <Accordion 
        type="multiple" 
        defaultValue={zones.map(zone => zone.id.toString())}
      >
        {zones.map((zone: Zone) => (
          <AccordionItem key={zone.id} value={zone.id.toString()}>
            <AccordionTrigger>{zone.nom}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {zone.batiments.map((building: Batiment) => (
                <Card
                  key={building.id}
                  content={`Bâtiment ${building.nom}`}
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
