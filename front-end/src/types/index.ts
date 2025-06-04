/**
 * Représente un étage dans un bâtiment
 */
export interface Etage {
  id: number;
  nom: string;
  batiment: Batiment;
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
  zone: Zone;
}

/**
 * Représente une zone
 */
export interface Zone {
  id: number;
  nom: string;
  batiments: Batiment[];
}

/**
 * Représente une pièce dans un étage
 */
export interface Piece {
  id: number;
  nom: string;
  etage: Etage;
  articles?: Article[];
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

export interface Etat {
  id: number;
  nom: string;
}

export enum EtatEnum {
  Neuf = 1,
  "Bon état" = 2,
  "Mauvais état" = 3,
  "En attente de destruction" = 4,
  Détruit = 5,
}

export interface Categorie {
  id: number;
  nom: string;
}