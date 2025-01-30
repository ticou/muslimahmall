import { apiClient } from "@/services/apiClient";
import { HttpMethod } from "@/utils/constants";
import { useCallback, useState } from "react";

// Hook personnalisé pour les requêtes API
export function useAPIRequest<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = useCallback(
    async (method: HttpMethod, url: string, payload?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response =
          method === HttpMethod.GET ||
          method === HttpMethod.DELETE ||
          method === HttpMethod.PATCH
            ? await apiClient[method]<T>(url)
            : await apiClient[method]<T>(url, payload);
        setData(response);
        return response;
      } catch (errorMessage: any) {
        console.log("errorMessage ::: ", errorMessage);
        // console.log("err.message ::: ", err.message);
        setError(errorMessage);
        throw errorMessage;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, executeRequest };
}
