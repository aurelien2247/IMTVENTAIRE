import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Card from "./Card";

export default function BatimentList() {
  return (
      <Accordion type="multiple">
        <AccordionItem value="ecole">
          <AccordionTrigger>École</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <Card label="Bâtiment A" link="/batimentA" />
            <Card label="Bâtiment B" link="/batimentB" />

          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="logements">
          <AccordionTrigger>Logements</AccordionTrigger>
          <AccordionContent>
            <Card label="Bâtiment J" link="/batimentJ" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  );
}
