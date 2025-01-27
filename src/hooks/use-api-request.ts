import { apiClient } from "@/services/apiClient";
import { useCallback, useState } from "react";

// Hook personnalisé pour les requêtes API
export function useAPIRequest<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = useCallback(
    async (
      method: "get" | "post" | "put" | "delete",
      url: string,
      payload?: any
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response =
          method === "get" || method === "delete"
            ? await apiClient[method]<T>(url)
            : await apiClient[method]<T>(url, payload);
        setData(response);
        return response;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, executeRequest };
}
