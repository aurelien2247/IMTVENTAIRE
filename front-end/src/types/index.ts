/**
 * Représente un étage dans un bâtiment
 */
export interface Etage {
  id: number;
  nom: string;
  batiment: Batiment;
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
  articles?: Article[];
}

/**
 * Représente un article dans l'inventaire
 */
export interface Article {
  num_inventaire: string;
  categorie: Categorie;
  num_serie?: string;
  num_bon_commande: string;
  etat: Etat;
  piece: Piece;
  fournisseur: string;
  marque: string;
  date_creation: string;
  date_modification: string;
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