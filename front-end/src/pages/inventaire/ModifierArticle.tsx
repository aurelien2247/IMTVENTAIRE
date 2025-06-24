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
import { useNavigate, useParams } from "react-router-dom";
import {
  useArticle,
  useUpdateArticle,
  useDeleteArticle,
} from "@/hooks/useArticle";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ChoisirPiece from "@/components/custom/piece/ChoisirPiece";
import { usePiece } from "@/hooks/usePiece";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ModifierSchema = z.object({
  num_inventaire: z.string().regex(/^\d{5,}$/, {
    message:
      "Veuillez renseigner un numéro d'inventaire valide (5 chiffres minimum)",
  }),
  num_serie: z
    .string()
    .regex(/.+/, { message: "Veuillez renseigner le numéro de série" }),
  categorie: z
    .string()
    .min(1, { message: "Veuillez sélectionner une catégorie" }),
  etat: z.string().min(1, { message: "Veuillez sélectionner un état" }),
  id_piece: z.string().min(1, { message: "Veuillez sélectionner une pièce" }),
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

type ModifierFormValues = z.infer<typeof ModifierSchema>;

export default function ModifierArticle() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading } = useArticle(articleId || null);

  const updateArticle = useUpdateArticle();
  const deleteArticleMutation = useDeleteArticle();
  const [modeChangementPiece, setModeChangementPiece] = useState(false);

  const handleDeleteArticle = () => {
    if (!articleId) return;

    deleteArticleMutation.mutate(articleId, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  const form = useForm<ModifierFormValues>({
    resolver: zodResolver(ModifierSchema),
    values: article
      ? {
          num_inventaire: article.num_inventaire.toString(),
          categorie: article.categorie.id.toString(),
          etat: article.etat.id.toString(),
          id_piece:
            article.piece?.id != null
              ? article.piece.id.toString()
              : "Aucune pièce",
          num_bon_commande: article.num_bon_commande,
          fournisseur: article.fournisseur,
          code_fournisseur: article.code_fournisseur?.toString() || "",
          marque: article.marque,
          num_serie: article.num_serie,
        }
      : undefined,
  });

  const { data: piece } = usePiece(
    form.watch("id_piece"),
    form.watch("id_piece")?.length > 0
  );

  const onSubmit = async (data: ModifierFormValues) => {
    if (!articleId) return;

    updateArticle.mutate(
      { articleId, data },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const handleSelectPiece = (pieceId: string) => {
    form.setValue("id_piece", pieceId, { shouldDirty: true });
    setModeChangementPiece(false);
  };

  if (modeChangementPiece) {
    return (
      <ChoisirPiece
        onSelect={handleSelectPiece}
        onClose={() => setModeChangementPiece(false)}
      />
    );
  }

  return (
    <div className="container">
      <div className="flex items-center gap-2 justify-between">
        <Header title="Modifier article" />
      </div>
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
                    type="categorie"
                    disabled={isLoading}
                    status={article?.categorie}
                    onSelectedStatusChange={(status) => {
                      field.onChange(status?.id.toString() || "");
                    }}
                    allowCreate={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2.5">
            <FormLabel>Pièce</FormLabel>
            <Card
              content={
                !article?.piece || article?.piece?.id == null
                  ? "Aucune pièce"
                  : article.piece.nom
              }
              size="small"
              onClick={() => setModeChangementPiece(true)}
              className={cn(piece?.nom ? "" : "text-muted-foreground")}
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
                  <Combobox
                    type="etat"
                    disabled={isLoading}
                    status={article?.etat}
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
          <div className="w-full flex justify-between gap-4">
            {article?.date_modification && (
              <span>
                <p className="font-bold">Dernière modification</p>
                <p>
                  {format(new Date(article.date_modification), "dd/MM/yyyy", {
                    locale: fr,
                  })}
                </p>
              </span>
            )}
            {article?.date_creation && (
              <span>
                <p className="font-bold">Créé le</p>
                <p>
                  {format(new Date(article.date_creation), "dd/MM/yyyy", {
                    locale: fr,
                  })}
                </p>
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isDirty}
            >
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous sûr de vouloir supprimer cet article ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. L'article sera définitivement
                    supprimé de l'inventaire.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteArticle}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  );
}
