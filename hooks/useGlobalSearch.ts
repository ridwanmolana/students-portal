import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGlobalSearch, GlobalSearchResult } from "@/services/api";

export function useGlobalSearch(delay: number = 300) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  const { data: results, isLoading, isError } = useQuery<GlobalSearchResult[], Error>({
    queryKey: ["globalSearch", debouncedQuery],
    queryFn: () => fetchGlobalSearch(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1 * 60 * 1000, // 1 min cache
  });

  return {
    query,
    setQuery,
    results: results || [],
    isLoading,
    isError,
  };
}
