import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Card from "@/components/custom/Card";
import { CategoriesList } from "@/components/custom/CategoriesList";

const AjouterSchema = z.object({
  numInventaire: z.number(),
  categorie: z.string(),
  piece: z.string(),
  numCommande: z.string(),
  fournisseur: z.string(),
  codeFournisseur: z.string(),
  marque: z.string(),
});

export default function Ajouter() {
  const form = useForm<z.infer<typeof AjouterSchema>>({
    resolver: zodResolver(AjouterSchema),
  });

  function onSubmit(data: z.infer<typeof AjouterSchema>) {
    toast("You submitted the following values: " + data);
  }

  return (
    <div className="px-8 py-12 flex flex-col gap-8">
      <h1>Ajouter</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="numInventaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro d'inventaire</FormLabel>
                <FormControl>
                  <Input placeholder="12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2.5">
            <FormLabel>Catégorie</FormLabel>
            <CategoriesList />
          </div>
          <div className="flex flex-col gap-2.5">
            <FormLabel>Pièce</FormLabel>
            <Card
              label="Aucune pièce"
              size="small"
              link="/piece"
              className="text-muted-foreground "
            />
          </div>
          <FormField
            control={form.control}
            name="numCommande"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de commande</FormLabel>
                <FormControl>
                  <Input placeholder="05-201-1019" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fournisseur"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fournisseur</FormLabel>
                <FormControl>
                  <Input placeholder="Samas Office" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codeFournisseur"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code fournisseur</FormLabel>
                <FormControl>
                  <Input placeholder="8573" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numInventaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marque</FormLabel>
                <FormControl>
                  <Input placeholder="Samas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
}
