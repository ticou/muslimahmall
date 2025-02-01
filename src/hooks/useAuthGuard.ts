import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "@/config/routes.config";

export const useAuthGuard = (requireAuth: boolean = true) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        navigate(ROUTES.PATH_CONNEXION, {
          state: { from: location },
          replace: true,
        });
      } else if (!requireAuth && user) {
        navigate(ROUTES.PATH_HOME, { replace: true });
      }
    }
  }, [user, loading, navigate, location, requireAuth]);

  return { user, loading };
};
