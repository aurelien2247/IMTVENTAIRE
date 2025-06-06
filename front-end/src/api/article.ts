import type { Article, Categorie, Piece } from "@/types";
import { fetchApi } from "./api";

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

  return response;
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

  return response;
};

/**
 * Recherche des articles par numéro d'inventaire, nom de pièce, nom de catégorie, marque, fournisseur ou numéro de bon de commande
 * @param query - Le terme de recherche
 * @returns Les articles et salles correspondant à la recherche
 */
export const searchArticles = async (query: string): Promise<{ articles: Article[], rooms: Piece[] }> => {
  const response = await fetchApi(`/search?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche des articles");
  }

  return response.json();
};
/**
 * Ajoute un nouvel article
 * @param articleData - Les données de l'article à ajouter
 * @returns L'article créé
 */
export const addArticle = async (articleData: {
  num_inventaire: string;
  num_serie: string;
  categorie: string;
  etat: string;
  id_piece: string;
  num_bon_commande: string;
  fournisseur: string;
  code_fournisseur?: string;
  marque: string;
}): Promise<Article> => {
  const payload = {
    ...articleData,
    code_fournisseur: articleData.code_fournisseur
      ? parseInt(articleData.code_fournisseur, 10)
      : undefined,
    etat: parseInt(articleData.etat, 10),
    id_piece: parseInt(articleData.id_piece, 10),
    categorie: parseInt(articleData.categorie, 10),
  };

  const response = await fetchApi(`/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || "Une erreur est survenue lors de l'ajout de l'article"
    );
  }

  return response;
};

export const createCategory = async (label: string): Promise<Categorie> => {
  const response = await fetchApi(`/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nom: label }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création du statut");
  }

  return response;
};

export const fetchCategories = async (): Promise<Categorie[]> => {
  const response = await fetchApi(`/categories`);
  if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
  return response;
};
