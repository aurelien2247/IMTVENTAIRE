import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArticle, fetchArticles, addArticle, addArticlesBatch, updateArticle, fetchCategories, fetchEtats, createCategory } from "@/api/article";
import { toast } from "sonner";

// Type pour la création d'un article (sans les dates qui sont gérées par la BDD)
type CreateArticleData = {
  num_inventaire: string;
  categorie: string;
  id_piece: string;
  num_serie: string;
  num_bon_commande: string;
  fournisseur: string;
  code_fournisseur?: string;
  marque: string;
  etat: string;
};

export const useArticles = (pieceId: string | undefined) => {
  if (!pieceId) {
    throw new Error("La pièce est introuvable");
  }

  return useQuery({
    queryKey: ["articles", pieceId],
    queryFn: () => fetchArticles(pieceId),
  });
};

export const useArticle = (idArticle: string | null, enabled = true) => {
  if (!idArticle) {
    throw new Error("L'article est introuvable");
  }

  return useQuery({
    queryKey: ["article", idArticle],
    queryFn: () => fetchArticle(idArticle),
    enabled,
  });
};

export const useAddArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, CreateArticleData>({
    mutationFn: addArticle,
    onSuccess: () => {
      toast.success("Article ajouté avec succès", {
        position: "top-center",
        richColors: true
      });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useAddArticlesBatch = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, CreateArticleData[]>({
    mutationFn: addArticlesBatch,
    onSuccess: (data) => {
      toast.success(`${data.length} articles ajoutés avec succès`, {
        position: "top-center",
        richColors: true
      });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, data }: { articleId: string; data: Parameters<typeof updateArticle>[1] }) => 
      updateArticle(articleId, data),
    onSuccess: () => {
      toast.success("Article modifié avec succès", {
        position: "top-center",
        richColors: true
      });
      // Invalider le cache des articles pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

export const useEtats = () => {
  return useQuery({
    queryKey: ["etats"],
    queryFn: fetchEtats,
  });
};

export const useAddCategorie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Catégorie ajoutée avec succès", {
        position: "top-center",
        richColors: true
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
