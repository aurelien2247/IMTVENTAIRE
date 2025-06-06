import type { Batiment } from "@/types";
import { fetchApi } from "./api";

/**
 * Récupère les bâtiments
 * @returns Les bâtiments
 */
export const fetchBatiments = async (): Promise<Batiment[]> => {
  return await fetchApi(`/batiments`);
};
