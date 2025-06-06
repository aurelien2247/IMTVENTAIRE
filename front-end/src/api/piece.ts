import type { Piece } from "@/types";
import { fetchApi } from "./api";

/**
 * Récupère les pièces d'un étage
 * @param etageId - L'identifiant de l'étage
 * @returns Les pièces de l'étage
 */
export const fetchPieces = async (etageId: string): Promise<Piece[]> => {
  const response = await fetchApi(`/etages/${etageId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des pièces");
  }

  return response;
};

/**
 * Récupère une pièce par son nom
 * @param nom - Le nom de la pièce
 * @returns La pièce correspondante
 */
export const fetchPieceByName = async (nom: string): Promise<Piece> => {
  const response = await fetchApi(`/pieces/nom/${nom}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la pièce");
  }

  return response;
};
