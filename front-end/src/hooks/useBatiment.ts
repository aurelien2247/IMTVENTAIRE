import { useQuery } from '@tanstack/react-query';
import { fetchBatiments } from '@/api/batiment';
import type { Batiment } from '@/types';

export const useBatiments = () => {
  return useQuery<Batiment[]>({
    queryKey: ['batiments'],
    queryFn: fetchBatiments,
  });
}; 