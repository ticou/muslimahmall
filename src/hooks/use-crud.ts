import { useState, useCallback, useEffect } from "react";
import { apiClient } from "../services/apiClient";
import toast from "react-hot-toast";

// Type générique avec ID obligatoire
export interface EntityWithId {
  id: number | string;
}

// Options de configuration du hook
interface UseCRUDOptions<T> {
  onSuccess?: (data: T | T[]) => void;
  onError?: (error: Error) => void;
  initialData?: T[];
}

export function useCRUD<T extends EntityWithId>(
  endpoint: string,
  options: UseCRUDOptions<T> = {}
) {
  // États
  const [items, setItems] = useState<T[]>(options.initialData || []);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Récupérer tous les éléments
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<T[]>(endpoint);
      setItems(data);
      options.onSuccess?.(data);
      return data;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Erreur de récupération");
      setError(error);
      options.onError?.(error);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  // Récupérer un élément par ID
  const fetchById = useCallback(
    async (id: number | string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiClient.get<T>(`${endpoint}/${id}`);
        setSelectedItem(data);
        options.onSuccess?.(data);
        return data;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Élément non trouvé");
        setError(error);
        options.onError?.(error);
        toast.error(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  // Créer un nouvel élément
  const create = useCallback(
    async (newItem: Partial<T>) => {
      setLoading(true);
      setError(null);
      try {
        const createdItem = await apiClient.post<T>(endpoint, newItem);
        setItems((prev) => [...prev, createdItem]);
        setSelectedItem(createdItem);
        options.onSuccess?.(createdItem);
        toast.success("Création réussie");
        return createdItem;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Création impossible");
        setError(error);
        options.onError?.(error);
        toast.error(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  // Mettre à jour un élément
  const update = useCallback(
    async (id: number | string, updatedItem: Partial<T>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiClient.put<T>(`${endpoint}/${id}`, updatedItem);
        setItems((prev) =>
          prev.map((item) => (item.id === id ? result : item))
        );
        setSelectedItem(result);
        options.onSuccess?.(result);
        toast.success("Mise à jour réussie");
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Mise à jour impossible");
        setError(error);
        options.onError?.(error);
        toast.error(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  // Supprimer un élément
  const remove = useCallback(
    async (id: number | string) => {
      setLoading(true);
      setError(null);
      try {
        await apiClient.delete(`${endpoint}/${id}`);
        setItems((prev) => prev.filter((item) => item.id !== id));

        // Réinitialiser l'élément sélectionné si c'était celui-ci
        if (selectedItem?.id === id) {
          setSelectedItem(null);
        }

        options.onSuccess?.(items);
        toast.success("Suppression réussie");
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Suppression impossible");
        setError(error);
        options.onError?.(error);
        toast.error(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, items, options, selectedItem]
  );

  // Charger les données au montage (optionnel)
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    // États
    items,
    selectedItem,
    loading,
    error,

    // Méthodes
    fetchAll,
    fetchById,
    create,
    update,
    remove,

    // Utilitaires
    setItems,
    setSelectedItem,
  };
}

// // Exemple d'utilisation dans un composant
// export function UserList() {
//   const {
//     items: users,
//     loading,
//     create,
//     update,
//     remove
//   } = useCRUD<User>('/users', {
//     onSuccess: (data) => console.log('Opération réussie', data),
//     onError: (error) => console.error('Erreur', error)
//   });

//   return (
//     // Votre logique de rendu
//   );
// }
