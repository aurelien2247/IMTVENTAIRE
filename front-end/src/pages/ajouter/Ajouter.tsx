import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

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
import { NumericInput } from "@/components/ui/numeric-input";
import Card from "@/components/custom/Card";
import { Combobox } from "@/components/ui/combobox";
import Header from "@/components/custom/Header";
import {
  useAddArticle,
  useAddArticlesBatch,
  useCategories,
} from "@/hooks/useArticle";
import AjoutMultipleDialog from "@/components/custom/ajouterArticle/AjoutMultipleDialog";
import ChoisirPiece from "@/components/custom/piece/ChoisirPiece";
import { usePiece } from "@/hooks/usePiece";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { pieceSelectedAtom, searchPiecesOnly } from "@/lib/atoms";
import { useSearchParams } from "react-router-dom";


const AjouterSchema = z.object({
  num_inventaire: z.string().regex(/^\d+$/, {
    message: "Veuillez renseigner un numéro d'inventaire valide",
  }),
  nb_articles: z.string().regex(/^[1-9]\d*$/, {
    message: "Le nombre doit être supérieur à 0",
  }),
  num_serie: z.string().optional(),
  categorie: z
    .string()
    .regex(/.+/, { message: "Veuillez renseigner la catégorie" }),
  etat: z.string(),
  id_piece: z
    .string()
    .regex(/.+/, { message: "Veuillez sélectionner une pièce" }),
  num_bon_commande: z
    .string()
    .regex(/.+/, { message: "Veuillez renseigner le numéro de commande" }),
  fournisseur: z
    .string()
    .regex(/.+/, { message: "Veuillez renseigner le nom du fournisseur" }),
  code_fournisseur: z.string().optional(),
  marque: z
    .string()
    .regex(/.+/, { message: "Veuillez renseigner une marque valide" }),
});

type AjouterFormValues = z.infer<typeof AjouterSchema>;

export default function Ajouter() {
  const [searchParams] = useSearchParams();
  const numInventaireFromUrl = searchParams.get("num_inventaire") || "";
  const [showMultipleDialog, setShowMultipleDialog] = useState(false);
  const [pieceSelected, setPieceSelected] = useAtom(pieceSelectedAtom);
  const [modeChangementPiece, setModeChangementPiece] =
    useAtom(searchPiecesOnly);

  const form = useForm<AjouterFormValues>({
    resolver: zodResolver(AjouterSchema),
    defaultValues: {
      num_inventaire: numInventaireFromUrl,
      nb_articles: "1",
      num_serie: "",
      categorie: "",
      etat: "1",
      id_piece: "",
      num_bon_commande: "",
      fournisseur: "",
      code_fournisseur: "",
      marque: "",
    },
  });

  const addArticle = useAddArticle();
  const addArticlesBatch = useAddArticlesBatch();
  const { data: piece } = usePiece(
    form.watch("id_piece"),
    form.watch("id_piece").length > 0
  );
  const { data: categories = [] } = useCategories();

  // Trouver la catégorie correspondante à l'identifiant stocké dans le formulaire
  const selectedCategorie = categories.find(
    (cat) => cat.id.toString() === form.watch("categorie")
  );

  function onSubmit(data: AjouterFormValues) {
    const nbArticles = parseInt(data.nb_articles, 10);

    // On ne passe pas les dates à l'API
    const submitData = {
      num_inventaire: data.num_inventaire,
      categorie: data.categorie,
      id_piece: data.id_piece,
      num_serie: data.num_serie,
      num_bon_commande: data.num_bon_commande,
      fournisseur: data.fournisseur,
      code_fournisseur: data.code_fournisseur,
      marque: data.marque,
      etat: data.etat,
    };

    if (nbArticles > 1) {
      // Pour plusieurs articles, on affiche la confirmation
      setShowMultipleDialog(true);
    } else {
      // Pour un seul article, on crée directement
      addArticle.mutate(submitData, {
        onSuccess: () => {
          form.reset();
        },
      });
    }
  }

  useEffect(() => {
    if (pieceSelected) {
      handleSelectPiece(pieceSelected);
    }
  }, [pieceSelected]);

  useEffect(() => {
    setPieceSelected("");
    return () => {
      setPieceSelected("");
    };
  }, []);
  function handleSelectPiece(pieceId: string) {
    form.setValue("id_piece", pieceId, { shouldValidate: true });
    setModeChangementPiece(false);
  }

  function padWithZeros(num: number, length: number) {
    return num.toString().padStart(length, "0");
  }

  function handleMultipleConfirm(confirmed: boolean) {
    setShowMultipleDialog(false);

    if (!confirmed) {
      return;
    }

    const formData = form.getValues();
    const numInventaireBase = parseInt(formData.num_inventaire, 10);
    const numInventaireLength = formData.num_inventaire.length;
    const nbArticles = parseInt(formData.nb_articles, 10);

    const articlesToCreate = [];

    for (let i = 0; i < nbArticles; i++) {
      articlesToCreate.push({
        ...formData,
        num_inventaire: padWithZeros(
          numInventaireBase + i,
          numInventaireLength
        ),
        nb_articles: "1",
      });
    }

    addArticlesBatch.mutate(articlesToCreate, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  if (modeChangementPiece) {
    return <ChoisirPiece />;
  }

  const formData = form.getValues();

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
                  <NumericInput placeholder="12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nb_articles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre d'articles à créer</FormLabel>
                <FormControl>
                  <NumericInput placeholder="1" {...field} />
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
                    status={selectedCategorie}
                    type="categorie"
                    allowCreate={true}
                    noOptionText="Aucune catégorie"
                    onSelectedStatusChange={(statusId) => {
                      field.onChange(statusId || "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_piece"
            render={() => (
              <FormItem>
                <FormLabel>Pièce</FormLabel>
                <FormControl>
                  <Card
                    content={piece?.nom || "Aucune pièce"}
                    size="small"
                    onClick={() => setModeChangementPiece(true)}
                    className={cn(piece?.nom ? "" : "text-muted-foreground", form.formState.errors.id_piece ? "border-1 border-destructive" : "")}
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
                <FormLabel>
                  Numéro de série{" "}
                  <i className="text-muted-foreground">(Optionnel)</i>
                </FormLabel>
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
                <FormLabel>
                  Code fournisseur <i>(Optionnel)</i>
                </FormLabel>
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
      <AjoutMultipleDialog
        open={showMultipleDialog}
        num_inventaire_from={formData.num_inventaire}
        num_inventaire_to={padWithZeros(
          parseInt(formData.num_inventaire, 10) +
            parseInt(formData.nb_articles, 10) -
            1,
          formData.num_inventaire.length
        )}
        nb_articles={parseInt(formData.nb_articles)}
        onConfirm={handleMultipleConfirm}
      />
    </div>
  );
}
