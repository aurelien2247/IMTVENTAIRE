import { useQuery } from "@tanstack/react-query";
import { fetchEtages } from "@/api/inventaire";
import type { Batiment, Etage } from "@/types";

export const useEtages = (batimentId: string | undefined) => {
  if (!batimentId) {
    throw new Error("Le bâtiment est introuvable");
  }

  return useQuery<{ etages: Etage[], batiment: Batiment }>({
    queryKey: ["etages", batimentId],
    queryFn: () => fetchEtages(batimentId),
  });
};