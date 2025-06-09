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
import { useEffect } from "react";
import { API_BASE_URL } from "@/api/api";
import { useArticle } from "@/hooks/useArticle";
import { EtatCombobox } from "@/components/ui/etat-combobox";

const ModifierSchema = z.object({
  num_inventaire: z.string().regex(/^\d{5,}$/, { message: "Renseignez un nombre valide (5 chiffres min)" }),
  num_serie: z.string().regex(/.+/, { message: "Renseignez le numéro de série" }),
  categorie: z.string(),
  etat: z.string(),
  id_piece: z.string(),
  num_bon_commande: z.string().regex(/.+/, { message: "Renseignez le numéro de commande" }),
  fournisseur: z.string().regex(/.+/, { message: "Renseignez le nom du fournisseur" }),
  code_fournisseur: z.string().regex(/^\d{4,}$/, { message: "Renseignez un code fournisseur valide (4 chiffres min)" }),
  marque: z.string().regex(/.+/, { message: "Renseignez une marque valide" }),
});

type ModifierFormValues = z.infer<typeof ModifierSchema>;

export default function ModifierArticle() {
  const { articleId } = useParams();
  const { data: article, isLoading } = useArticle(articleId || null);

  const form = useForm<ModifierFormValues>({
    resolver: zodResolver(ModifierSchema),
    defaultValues: {
      num_inventaire: "",
      categorie: "",
      etat: "",
      id_piece: "",
      num_bon_commande: "",
      fournisseur: "",
      code_fournisseur: "",
      marque: "",
      num_serie: "",
    }
  });

  useEffect(() => {
    if (article) {
      console.log(article)
      form.reset({
        num_inventaire: article.num_inventaire.toString(),
        categorie: article.categorie.id.toString(),
        etat: article.etat.id.toString(),
        id_piece: article.piece.id.toString(),
        num_bon_commande: article.num_bon_commande,
        fournisseur: article.fournisseur,
        code_fournisseur: article.code_fournisseur.toString(),
        marque: article.marque,
        num_serie: article.num_serie,
      });
    }
  }, [article, form]);

  const onSubmit = async (data: ModifierFormValues) => {
    console.log(data);
    try {
      const response = await fetch(`${API_BASE_URL}/article/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          num_inventaire: parseInt(data.num_inventaire),
          categorie: parseInt(data.categorie),
          etat: parseInt(data.etat),
          id_piece: parseInt(data.id_piece),
          code_fournisseur: parseInt(data.code_fournisseur),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification');
      }

      toast.success('Article modifié avec succès');
    } catch (error) {
      toast.error("Erreur lors de la modification de l'article");
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <Combobox 
                    initialStatus={article ? { 
                      value: article.categorie.id.toString(), 
                      label: article.categorie.nom 
                    } : undefined}
                    onSelectedStatusChange={(status) => {
                      field.onChange(status?.value || "");
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
              content="Aucune pièce"
              size="small"
              link="/piece"
              className="text-muted-foreground"
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
                    initialStatus={article ? { 
                      value: article.etat.id.toString(), 
                      label: article.etat.nom 
                    } : undefined}
                    onSelectedStatusChange={(status) => {
                      field.onChange(status?.value || "");
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
            Modifier
          </Button>
        </form>
      </Form>
    </div>
  );
}
