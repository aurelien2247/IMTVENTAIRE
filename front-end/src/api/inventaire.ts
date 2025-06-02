import type { Article, Batiment, Etage, Piece } from "@/types";
import { API_BASE_URL } from "./config";

/**
 * Récupère les bâtiments
 * @returns Les bâtiments
 */
export const fetchBatiments = async (): Promise<Batiment[]> => {
  const response = await fetch(`${API_BASE_URL}/batiments`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des bâtiments");
  }

  return response.json();
};

/**
 * Récupère les étages d'un bâtiment
 * @param batimentId - L'identifiant du bâtiment
 * @returns Les étages du bâtiment
 */
export const fetchEtages = async (batimentId: string): Promise<Etage[]> => {
  const response = await fetch(`${API_BASE_URL}/batiments/${batimentId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des étages");
  }

  return response.json();
};

/**
 * Récupère les pièces d'un étage
 * @param etageId - L'identifiant de l'étage
 * @returns Les pièces de l'étage
 */
export const fetchPieces = async (etageId: string): Promise<Piece[]> => {
  const response = await fetch(`${API_BASE_URL}/etages/${etageId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des pièces");
  }

  return response.json();
};

/**
 * Récupère les articles d'une pièce
 * @param pieceId - L'identifiant de la pièce
 * @returns Les articles de la pièce
 */
export const fetchArticles = async (pieceId: string): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/pieces/${pieceId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des articles");
  }

  return response.json();
};

/**
 * Récupère un article spécifique
 * @param articleId - L'identifiant de l'article
 * @returns L'article spécifique
 */
export const fetchArticle = async (articleId: string): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/article/${articleId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'article");
  }

  return response.json();
};
