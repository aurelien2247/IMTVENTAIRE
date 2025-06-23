import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchPiece,
  fetchPieces,
  fetchPieceByName,
  saveScan,
} from "@/api/piece";
import { toast } from "sonner";

export const usePiece = (pieceId: string | undefined, enabled = true) => {
  return useQuery({
    queryKey: ["piece", pieceId],
    queryFn: () => fetchPiece(pieceId ?? ""),
    enabled,
  });
};

export const usePieces = (etageId: string | undefined) => {
  if (!etageId) {
    throw new Error("L'étage est introuvable");
  }

  return useQuery({
    queryKey: ["pieces", etageId],
    queryFn: () => fetchPieces(etageId),
  });
};

export const usePieceByName = (nom: string | null, enabled = true) => {
  if (!nom) {
    throw new Error("Impossible de récupérer la pièce");
  }

  return useQuery({
    queryKey: ["piece", "nom", nom],
    queryFn: () => fetchPieceByName(nom),
    enabled,
    staleTime: 0,
    gcTime: 0,
    placeholderData: (previousData) => previousData,
  });
};

export const useSaveScan = (pieceId: string, articlesId: string[]) => {
  return useMutation({
    mutationFn: () => saveScan(pieceId, articlesId),
    onSuccess: () => {
      toast.success("Articles sauvegardés avec succès", {
        richColors: true,
        position: "top-center",
      });
    },
  });
};
