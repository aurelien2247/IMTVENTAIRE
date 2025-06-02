import { useQuery } from "@tanstack/react-query";
import { fetchEtages } from "@/api/inventaire";
import type { Etage } from "@/types";

export const useEtages = (batimentId: string) => {
  return useQuery<Etage[]>({
    queryKey: ["etages", batimentId],
    queryFn: () => fetchEtages(batimentId),
  });
};