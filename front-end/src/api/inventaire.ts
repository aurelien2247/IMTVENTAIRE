import type { Article, Batiment, Etage, Piece, Zone } from "@/types";
import { fetchApi } from "@/config/api";

export const fetchZones = async (): Promise<Zone[]> => {
  const response = await fetchApi(`/zones`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des zones");
  }

  return response.json();
};

/**
 * Récupère les bâtiments
 * @returns Les bâtiments
 */
export const fetchBatiments = async (): Promise<Batiment[]> => {
  const response = await fetchApi(`/batiments`);

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
  const response = await fetchApi(`/batiments/${batimentId}`);

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
  const response = await fetchApi(`/etages/${etageId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des pièces");
  }

  return response.json();
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

  return response.json();
};


/**
 * Récupère les articles d'une pièce
 * @param pieceId - L'identifiant de la pièce
 * @returns Les articles de la pièce
 */
export const fetchArticles = async (pieceId: string): Promise<Article[]> => {
  const response = await fetchApi(`/pieces/${pieceId}`);

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
  const response = await fetchApi(`/article/${articleId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'article");
  }

  return response.json();
};

/**
 * Recherche des articles par numéro d'inventaire ou nom de pièce
 * @param query - Le terme de recherche
 * @returns Les articles correspondant à la recherche
 */
export const searchArticles = async (query: string): Promise<Article[]> => {
  const response = await fetchApi(`/search?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche des articles");
  }

  return response.json();
};
