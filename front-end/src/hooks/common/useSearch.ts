import { useState, useCallback, useEffect } from 'react';
import { searchArticles } from '@/api/common/search';
import type { Article, Piece } from '@/types';

interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  articles: Article[];
  rooms: Piece[];
  isLoading: boolean;
  error: Error | null;
  search: (searchQuery: string) => Promise<void>;
}

/**
 * Hook pour gérer la recherche d'articles et de salles
 * @param initialQuery - La requête initiale (optionnelle)
 * @param debounceTime - Le délai de debounce en ms (par défaut: 300ms)
 * @returns Les états et fonctions pour gérer la recherche
 */
export function useSearch(initialQuery: string = '', debounceTime: number = 300): UseSearchResult {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<Article[]>([]);
  const [rooms, setRooms] = useState<Piece[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [query, debounceTime]);

  // Search function
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setArticles([]);
      setRooms([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchArticles(searchQuery);
      setArticles(results.articles);
      setRooms(results.rooms);
    } catch (err) {
      console.error("Error searching articles:", err);
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Trigger search when debounced query changes
  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery, search]);

  return {
    query,
    setQuery,
    articles,
    rooms,
    isLoading,
    error,
    search
  };
}