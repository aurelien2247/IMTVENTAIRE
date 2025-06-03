/**
 * Représente un étage dans un bâtiment
 */
export interface Etage {
  id: number;
  nom: string;
}

/**
 * Représente une catégorie de bâtiment
 */
export interface Categorie {
  id: number;
  nom: string;
  batiments: Batiment[];
}

/**
 * Représente un bâtiment
 */
export interface Batiment {
  id: number;
  nom: string;
}

/**
 * Représente une pièce dans un étage
 */
export interface Piece {
  id: number;
  nom: string;
  etage: Etage;
}

/**
 * Représente un article dans l'inventaire
 */
export interface Article {
  num_inventaire: string;
  categorie: Categorie;
  num_serie: string;
  num_bon_commande: string;
  etat: Etat;
  piece: Piece;
}

export enum Etat {
  Neuf,
  "Bon état",
  "Mauvais état",
  "En attente de destruction",
  Détruit,
}

export interface Categorie {
  id: number;
  nom: string;
}