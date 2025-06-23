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
import { useParams } from "react-router-dom";
import { useArticle, useUpdateArticle } from "@/hooks/useArticle";
import { EtatCombobox } from "@/components/ui/etat-combobox";

const ModifierSchema = z.object({
  num_inventaire: z.string().regex(/^\d{5,}$/, { message: "Veuillez renseigner un numéro d'inventaire valide (5 chiffres minimum)" }),
  num_serie: z.string().regex(/.+/, { message: "Veuillez renseigner le numéro de série" }),
  categorie: z.string(),
  etat: z.string(),
  id_piece: z.string(),
  num_bon_commande: z.string().regex(/.+/, { message: "Veuillez renseigner le numéro de commande" }),
  fournisseur: z.string().regex(/.+/, { message: "Veuillez renseigner le nom du fournisseur" }),
  code_fournisseur: z.string().optional(),
  marque: z.string().regex(/.+/, { message: "Veuillez renseigner une marque valide" }),
});

type ModifierFormValues = z.infer<typeof ModifierSchema>;

export default function ModifierArticle() {
  const { articleId } = useParams();
  const { data: article, isLoading } = useArticle(articleId || null);
  const updateArticle = useUpdateArticle();

  const form = useForm<ModifierFormValues>({
    resolver: zodResolver(ModifierSchema),
    values: article ? {
      num_inventaire: article.num_inventaire.toString(),
      categorie: article.categorie.id.toString(),
      etat: article.etat.id.toString(),
      id_piece: article.piece?.id != null ? article.piece.id.toString() : "Aucune pièce",
      num_bon_commande: article.num_bon_commande,
      fournisseur: article.fournisseur,
      code_fournisseur: article.code_fournisseur?.toString() || "",
      marque: article.marque,
      num_serie: article.num_serie,
    } : undefined
  });

  const onSubmit = async (data: ModifierFormValues) => {
    if (!articleId) return;
    
    updateArticle.mutate(
      { articleId, data },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

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
            disabled={isLoading}
            name="num_inventaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro d'inventaire</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categorie"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <Combobox 
                    disabled={isLoading}
                    initialStatus={article?.categorie}
                    onSelectedStatusChange={(status) => {
                      field.onChange(status?.id || "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2.5">
            <FormLabel>Pièce</FormLabel>
            <Card
              content={!article?.piece || article?.piece?.id == null ? "Aucune pièce" : article.piece.nom}
              size="small"
              link="/piece"
              className="text-muted-foreground"
              disabled={isLoading}
            />
          </div>
          <FormField
            control={form.control}
            name="etat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>État</FormLabel>
                <FormControl>
                  <EtatCombobox 
                    disabled={isLoading}
                    initialStatus={article?.etat}
                    onSelectedStatusChange={(status) => {
                      field.onChange(status?.id.toString() || "");
                    }}
                    noOptionText="Aucun état"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num_bon_commande"
            disabled={isLoading}
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
            name="num_serie"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de série</FormLabel>
                <FormControl>
                  <Input placeholder="FUDGZ67328EYGH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fournisseur"
            disabled={isLoading}
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
            name="code_fournisseur"
            disabled={isLoading}
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
            name="marque"
            disabled={isLoading}
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            Modifier
          </Button>
        </form>
      </Form>
    </div>
  );
}
