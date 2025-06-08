import { API_BASE_URL } from "../api.ts";
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
export const searchArticles = async (query: string): Promise<SearchResults> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error("Erreur lors de la recherche des articles");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error searching articles:", error);
    throw error;
  }
};