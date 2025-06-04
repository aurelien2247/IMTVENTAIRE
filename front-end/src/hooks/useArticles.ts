import { useQuery } from "@tanstack/react-query";
import { fetchArticle, fetchArticles } from "@/api/inventaire";

export const useArticles = (pieceId: string | undefined) => {
  if (!pieceId) {
    throw new Error("La pièce est introuvable");
  }

  return useQuery({
    queryKey: ["articles", pieceId],
    queryFn: () => fetchArticles(pieceId),
  });
};

export const useArticle = (idArticle: string | null) => {
  if (!idArticle) {
    throw new Error("L'article est introuvable");
  }

  return useQuery({
    queryKey: ["article", idArticle],
    queryFn: () => fetchArticle(idArticle),
  });
};