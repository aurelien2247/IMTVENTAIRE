import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/api/inventaire";

export const useArticles = (pieceId: string | undefined) => {
  if (!pieceId) {
    throw new Error("La pièce est introuvable");
  }

  return useQuery({
    queryKey: ["articles", pieceId],
    queryFn: () => fetchArticles(pieceId),
  });
};