import type { Piece } from "@/types";
import { fetchApi } from "./api";

/**
 * Récupère les pièces d'un étage
 * @param etageId - L'identifiant de l'étage
 * @returns Les pièces de l'étage
 */
export const fetchPieces = async (etageId: string): Promise<Piece[]> => {
  return await fetchApi(`/etages/${etageId}`);
};

/**
 * Récupère une pièce par son nom
 * @param nom - Le nom de la pièce
 * @returns La pièce correspondante
 */
export const fetchPieceByName = async (nom: string): Promise<Piece> => {
  return await fetchApi(`/pieces/nom/${nom}`);
};
