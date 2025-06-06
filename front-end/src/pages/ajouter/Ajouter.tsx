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
import { Combobox } from "@/components/ui/combobox";
import Header from "@/components/custom/Header";
import { API_BASE_URL } from "@/api/config";

const AjouterSchema = z.object({
  num_inventaire: z.string().regex(/^\d{5,}$/, { message: "Renseignez un nombre valide (5 chiffres min)" }),
  num_serie: z.string().regex(/.+/, { message: "Renseignez le numéro de série" }),
  categorie: z.string().regex(/.+/, { message: "Renseignez la catégorie" }),
  etat: z.string(),
  id_piece: z.string(),
  num_bon_commande: z.string().regex(/.+/, { message: "Renseignez le numéro de commande" }),
  fournisseur: z.string().regex(/.+/, { message: "Renseignez le nom du fournisseur" }),
  code_fournisseur: z.string().regex(/^\d{4,}$/, { message: "Renseignez un code fournisseur valide (4 chiffres min)" }),
  marque: z.string().regex(/.+/, { message: "Renseignez une marque valide" }),
});

type AjouterFormValues = z.infer<typeof AjouterSchema>;

export default function Ajouter() {
  const form = useForm<AjouterFormValues>({
    resolver: zodResolver(AjouterSchema),
    defaultValues: {
      num_inventaire: "",
      categorie: "", // A gérer avec le merge de la feature catégorie
      etat: "1", // Neuf par défaut
      id_piece: "1", // A gérer avec le merge de la feature pièce
      num_bon_commande: "",
      fournisseur: "",
      code_fournisseur: "",
      marque: "",
    },
  });

  function onSubmit(data: AjouterFormValues) {
    
    // Conversion du numéro d'inventaire et code fournisseur en nombre
    const payload = {
      ...data,
      code_fournisseur: parseInt(data.code_fournisseur, 10),
      etat: parseInt(data.etat, 10),
      id_piece: parseInt(data.id_piece, 10),
      categorie: parseInt(data.categorie, 10)
    };

    console.log(payload);

    fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Une erreur est survenue');
        }
        return response.json();
      })
      .then(() => {
        toast.success('Article ajouté avec succès');
        // Réinitialiser le formulaire
        form.reset();
      })
      .catch((error) => {
        toast.error(error.message || 'Une erreur est survenue lors de l\'ajout de l\'article');
      });
  }

  return (
    <div className="container gap-8">
      <Header title="Ajouter" />
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
                  <Input type="number" placeholder='12345' {...field} />
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
                    noOptionText="Aucune catégorie"
                    onSelectedStatusChange={(status) => {
                      console.log(status);
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
              //link="/piece"
              className="text-muted-foreground"
            />
          </div>
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
                  <Input type="number" placeholder="8573" {...field} />
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
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
}
