/**
 * Représente un étage dans un bâtiment
 */
export interface Etage {
  id: number;
  nom: string;
}

/**
 * Représente une pièce dans un étage
 */
export interface Piece {
  id: number;
  nom: string;
}

/**
 * Représente un article dans l'inventaire
 */
export interface Article {
  num_inventaire: string;
  categorie: string;
  num_serie: string;
  num_bon_commande: string;
}