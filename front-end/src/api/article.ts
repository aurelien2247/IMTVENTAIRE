import type { Article, Categorie, Etat } from "@/types";
import { fetchApi } from "./api";

// Type pour la création/modification d'un article (sans les dates qui sont gérées par la BDD)
type ArticleData = {
  num_inventaire: string;
  num_serie: string;
  categorie: string;
  etat: string;
  id_piece: string;
  num_bon_commande: string;
  fournisseur: string;
  code_fournisseur?: string;
  marque: string;
};

/**
 * Récupère les articles d'une pièce
 * @param pieceId - L'identifiant de la pièce
 * @returns Les articles de la pièce
 */
export const fetchArticles = async (pieceId: string): Promise<Article[]> => {
  return await fetchApi(`/pieces/articles/${pieceId}`);
};

/**
 * Récupère un article spécifique
 * @param articleId - L'identifiant de l'article
 * @returns L'article spécifique
 */
export const fetchArticle = async (articleId: string): Promise<Article> => {
  return await fetchApi(`/article/${articleId}`);
};

/**
 * Ajoute un nouvel article
 * @param articleData - Les données de l'article à ajouter
 * @returns L'article créé
 */
export const addArticle = async (articleData: ArticleData): Promise<Article> => {
  const payload = {
    ...articleData,
    code_fournisseur: articleData.code_fournisseur
      ? parseInt(articleData.code_fournisseur, 10)
      : undefined,
    etat: parseInt(articleData.etat, 10),
    id_piece: parseInt(articleData.id_piece, 10),
    categorie: parseInt(articleData.categorie, 10),
  };

  return await fetchApi(`/articles`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const addArticlesBatch = async (articles: ArticleData[]): Promise<Article[]> => {
  const articlesWithParsedInts = articles.map(article => ({
    ...article,
    code_fournisseur: article.code_fournisseur
      ? parseInt(article.code_fournisseur, 10)
      : undefined,
    etat: parseInt(article.etat, 10),
    id_piece: parseInt(article.id_piece, 10),
    categorie: parseInt(article.categorie, 10),
  }));

  return await fetchApi(`/articles/batch`, {
    method: "POST",
    body: JSON.stringify({ articles: articlesWithParsedInts }),
  });
};

export const createCategory = async (label: string): Promise<Categorie> => {
  return await fetchApi(`/categories`, {
    method: "POST",
    body: JSON.stringify({ nom: label }),
  });
};

export const fetchCategories = async (): Promise<Categorie[]> => {
  return await fetchApi(`/categories`);
};

export const updateArticle = async (articleId: string, articleData: ArticleData) => {
  const payload = {
    ...articleData,
    num_inventaire: parseInt(articleData.num_inventaire, 10),
    code_fournisseur: articleData.code_fournisseur
      ? parseInt(articleData.code_fournisseur, 10)
      : undefined,
    etat: parseInt(articleData.etat, 10),
    id_piece: parseInt(articleData.id_piece, 10),
    categorie: parseInt(articleData.categorie, 10),
  };

  return await fetchApi(`/article/${articleId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const fetchEtats = async (): Promise<Etat[]> => {
  return await fetchApi(`/etats`);
};

/**
 * Supprime un article par son numéro d'inventaire
 * @param articleId - Le numéro d'inventaire de l'article à supprimer
 * @returns Un message de confirmation
 */
export const deleteArticle = async (articleId: string): Promise<{ message: string }> => {
  return await fetchApi(`/article/${articleId}`, {
    method: "DELETE",
  });
};
