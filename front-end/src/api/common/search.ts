import { fetchApi } from "../api.ts";
import type { Article, Piece } from "@/types";

export interface SearchResults {
  articles: Article[];
  rooms: Piece[];
}

/**
 * Recherche des articles par numéro d'inventaire, nom de pièce, nom de bâtiment, nom de catégorie, marque, fournisseur ou numéro de bon de commande
 * @param query - Le terme de recherche
 * @returns Les articles et salles correspondant à la recherche
 */
export const search = async (
  query: string
): Promise<{ articles: Article[]; rooms: Piece[] }> => {
  return await fetchApi(`/search?query=${encodeURIComponent(query)}`);
};