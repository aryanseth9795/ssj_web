import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL, ENDPOINTS } from "../config/api";
import type { StaticBhavData } from "../types";

export function useStaticData() {
  const [data, setData] = useState<StaticBhavData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}${ENDPOINTS.PRICES_STATIC}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d: StaticBhavData = await res.json();
      setData(d);
    } catch {
      setError("Failed to load prices");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
