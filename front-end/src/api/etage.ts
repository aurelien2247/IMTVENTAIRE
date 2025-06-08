import type { Etage } from "@/types";
import { fetchApi } from "./api";

/**
 * Récupère les étages d'un bâtiment
 * @param batimentId - L'identifiant du bâtiment
 * @returns Les étages du bâtiment
 */
export const fetchEtages = async (batimentId: string): Promise<Etage[]> => {
  return await fetchApi(`/batiments/${batimentId}`);
};