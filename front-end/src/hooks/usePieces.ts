import { useQuery } from "@tanstack/react-query";
import { fetchPieces, fetchPieceByName } from "@/api/inventaire";

export const usePieces = (etageId: string | undefined) => {
  if (!etageId) {
    throw new Error("L'étage est introuvable");
  }

  return useQuery({
    queryKey: ["pieces", etageId],
    queryFn: () => fetchPieces(etageId),
  });
};

export const usePieceByName = (nom: string | null) => {
  if (!nom) {
    throw new Error("Impossible de récupérer la pièce");
  }

  return useQuery({
    queryKey: ["piece", "nom", nom],
    queryFn: () => fetchPieceByName(nom),
  });
};