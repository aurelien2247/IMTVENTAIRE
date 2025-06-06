import type { Batiment } from "@/types";
import { fetchApi } from "./api";

/**
 * Récupère les bâtiments
 * @returns Les bâtiments
 */
export const fetchBatiments = async (): Promise<Batiment[]> => {
  const response = await fetchApi(`/batiments`);

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response;
};
