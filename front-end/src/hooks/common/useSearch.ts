import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { search } from '@/api/common/search';
import type { Article, Piece } from '@/types';
import { searchQueryAtom } from '@/lib/atoms';

interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  articles: Article[];
  rooms: Piece[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook pour gérer la recherche d'articles et de salles
 * @param debounceTime - Le délai de debounce en ms (par défaut: 300ms)
 * @returns Les états et fonctions pour gérer la recherche
 */
export function useSearch(debounceTime: number = 300): UseSearchResult {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const debouncedQuery = useDebounce(query, debounceTime);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => search(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
  });

  return {
    query,
    setQuery,
    articles: data?.articles ?? [],
    rooms: data?.rooms ?? [],
    isLoading,
    error: error as Error | null,
  };
}