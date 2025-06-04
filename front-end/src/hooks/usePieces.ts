import { useQuery } from "@tanstack/react-query";
import { fetchPieces } from "@/api/inventaire";

export const usePieces = (etageId: string | undefined) => {
  if (!etageId) {
    throw new Error("L'étage est introuvable");
  }

  return useQuery({
    queryKey: ["pieces", etageId],
    queryFn: () => fetchPieces(etageId),
  });
};