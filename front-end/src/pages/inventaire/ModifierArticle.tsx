import Header from "@/components/custom/Header";
import { FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/custom/Card";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const ModifierSchema = z.object({
  numInventaire: z.number(),
  categorie: z.string(),
  piece: z.string(),
  numCommande: z.string(),
  fournisseur: z.string(),
  codeFournisseur: z.string(),
  marque: z.string(),
});

export default function ModifierArticle() {
  const { articleId } = useParams();
  const form = useForm<z.infer<typeof ModifierSchema>>({
    resolver: zodResolver(ModifierSchema),
  });

  function onSubmit(data: z.infer<typeof ModifierSchema>) {
    toast("You submitted the following values: " + data);
  }

  const categories = [
    {
      value: "chaise",
      label: "Chaise",
    },
    {
      value: "table",
      label: "Table",
    },
    {
      value: "ordinateur",
      label: "Ordinateur",
    },
    {
      value: "souris",
      label: "Souris",
    },
    {
      value: "clavier",
      label: "Clavier",
    },
  ];

  return (
    <div className="container">
      <Header title="Modifier article" />
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
            <Combobox options={categories} />
          </div>
          <div className="flex flex-col gap-2.5">
            <FormLabel>Pièce</FormLabel>
            <Card
              content="Aucune pièce"
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
          <div className="flex gap-4 justify-between *:text-sm">
            <span>
              <p className="font-bold">Dernier inventaire</p>
              <p>02/03/2025</p>
            </span>
            <span>
              <p className="font-bold">Crée le</p>
              <p>13/01/2019</p>
            </span>
          </div>
          <Button type="submit" className="w-full">
            Modifier
          </Button>
        </form>
      </Form>
    </div>
  );
}
