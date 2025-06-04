import { useQuery } from '@tanstack/react-query';
import { fetchZones } from '@/api/inventaire';
import type { Zone } from '@/types';

export const useZones = () => {
  return useQuery<Zone[]>({
    queryKey: ['zones'],
    queryFn: fetchZones,
  });
}; 