import type { Categorie } from "@/types";
import { API_BASE_URL } from "./config";

export const createCategory = async (label: string): Promise<Categorie> => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nom: label }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création du statut");
  }

  return response.json();
};

export const fetchCategories = async (): Promise<Categorie[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
  return response.json();
};