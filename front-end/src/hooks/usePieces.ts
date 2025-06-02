import { useQuery } from "@tanstack/react-query";
import { fetchPieces } from "@/api/inventaire";
import type { Piece } from "@/types";

export const usePieces = (etageId: string) => {
  return useQuery<Piece[]>({
    queryKey: ["pieces", etageId],
    queryFn: () => fetchPieces(etageId),
  });
};