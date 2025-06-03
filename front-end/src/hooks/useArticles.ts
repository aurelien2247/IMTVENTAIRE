import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/api/inventaire";
import type { Article, Piece } from "@/types";

export const useArticles = (pieceId: string | undefined) => {
  if (!pieceId) {
    throw new Error("La pièce est introuvable");
  }

  return useQuery<{ articles: Article[], piece: Piece }>({
    queryKey: ["articles", pieceId],
    queryFn: () => fetchArticles(pieceId),
  });
};