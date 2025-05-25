import type { Batiment } from "@/types";
import { API_BASE_URL } from "./config";

export const fetchBatiments = async (): Promise<Batiment[]> => {
  const response = await fetch(`${API_BASE_URL}/batiments`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des bâtiments");
  }

  return response.json();
};
