import type { Etage } from "@/types";
import { fetchApi } from "./api";

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
  
    return response;
  };