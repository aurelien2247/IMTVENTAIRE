import { useQuery } from "@tanstack/react-query";
import { fetchEtages } from "@/api/inventaire";

export const useEtages = (batimentId: string | undefined) => {
  if (!batimentId) {
    throw new Error("Le bâtiment est introuvable");
  }

  return useQuery({
    queryKey: ["etages", batimentId],
    queryFn: () => fetchEtages(batimentId),
  });
};