import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArticle, fetchArticles, addArticle, updateArticle } from "@/api/article";
import { toast } from "sonner";

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

  return useMutation({
    mutationFn: addArticle,
    onSuccess: () => {
      toast.success("Article ajouté avec succès");
      // Invalider le cache des articles pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    }
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ numInventaire, articleData }: { numInventaire: string; articleData: { id_piece: string } }) =>
      updateArticle(numInventaire, articleData),
    onSuccess: (_, variables) => {
      toast.success("Article mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ["article", variables.numInventaire] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'article");
    },
  });
};
