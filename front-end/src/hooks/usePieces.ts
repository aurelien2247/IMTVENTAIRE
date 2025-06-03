import { useQuery } from "@tanstack/react-query";
import { fetchPieces } from "@/api/inventaire";
import type { Etage, Piece } from "@/types";

export const usePieces = (etageId: string | undefined) => {
  if (!etageId) {
    throw new Error("L'étage est introuvable");
  }

  return useQuery<{ pieces: Piece[], etage: Etage }>({
    queryKey: ["pieces", etageId],
    queryFn: () => fetchPieces(etageId),
  });
};