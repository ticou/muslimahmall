import { User } from "@/types/auth";
import { ResponseAuthAPI } from "@/types/response";
import { Constant } from "@/utils/constants";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";

// Types et Interfaces
export interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface JWTPayload {
  sub: string;
  exp: number;
  iat: number;
  user: AuthenticatedUser;
  roles: string[];
  // role: "ADMIN" | "MARCHAND";
}

interface LoginCredentials {
  telephone: string;
  password: string;
}

interface AuthenticatedUser {
  id: number;
  nom: string;
  prenom: string;
  shopId: number;
  shopName: string;
  telephone: string;
}

class AuthService {
  private static instance: AuthService;
  private tokenKey = "auth_token";
  private userKey = "authenticated_user";

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Stockage sécurisé des tokens
  setTokens(tokens: Token): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokens));
  }

  // Récupération des tokens
  getTokens(): Token | null {
    const storedTokens = localStorage.getItem(this.tokenKey);
    return storedTokens ? JSON.parse(storedTokens) : null;
  }

  // Stockage de l'utilisateur
  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User | null {
    const storedUser = localStorage.getItem(this.userKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Vérification de l'expiration du token
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Suppression des données d'authentification
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    window.location.href = "/login";
  }
}

class APIClient {
  private axiosInstance: AxiosInstance;
  private authService: AuthService;

  constructor(baseURL: string) {
    this.authService = AuthService.getInstance();
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  // Configuration des intercepteurs
  private setupInterceptors(): void {
    // Intercepteur de requête
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        console.log("######## frontend request ######### ", config.data);
        if (Constant.uriToIgnore.includes(config.url ?? "")) {
          return config;
        }
        const tokens = this.authService.getTokens();

        if (tokens) {
          // Refresh token si nécessaire
          if (this.authService.isTokenExpired(tokens.accessToken)) {
            try {
              const newTokens = await this.refreshToken(tokens.refreshToken);
              this.authService.setTokens(newTokens);
            } catch {
              this.authService.logout();
              return Promise.reject(new Error("Token refresh failed"));
            }
          }

          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur de réponse pour gestion globale des erreurs
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log("######## backend response ######### ", response);
        return response;
      },
      (error) => {
        // Gestion centralisée des erreurs
        if (error.response) {
          switch (error.response.status) {
            case 401:
              this.authService.logout();
              break;
            case 403:
              // Gestion des accès non autorisés
              break;
            case 500:
              // Gestion des erreurs serveur
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Methode de logout

  async logout(): Promise<void> {
    this.authService.logout();
  }

  // Méthode de login
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // const response = await this.axiosInstance.post<ResponseAuthAPI>(
      //   "/auth/login",
      //   credentials
      // );

      const response = await this.axiosInstance.post<ResponseAuthAPI>(
        "/auth/login",
        {
          data: credentials,
        }
      );
      console.log("after api");

      // Décoder et extraire les informations utilisateur
      const decoded = jwtDecode<JWTPayload>(response.data.data?.accessToken);

      const user: User = {
        ...decoded.user,
        roles: decoded.roles,
        exp: decoded.exp,
        iat: decoded.iat,
        sub: decoded.sub,

        // id: decoded.sub,
        // telephone: credentials.telephone,
      };

      // Stocker tokens et utilisateur
      this.authService.setTokens(response.data.data);
      this.authService.setUser(user);

      return user;
      // return response.data;
    } catch (error) {
      throw new Error("Error :: " + error);
    }
  }

  // Rafraîchissement du token
  private async refreshToken(refreshToken: string): Promise<Token> {
    try {
      const response = await this.axiosInstance.post<Token>("/auth/refresh", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw new Error("Refresh token failed :: " + error);
    }
  }

  // Méthodes CRUD génériques
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

// Fonction de création du client API
export const createAPIClient = (baseURL: string) => new APIClient(baseURL);
export const apiClient = createAPIClient(
  "http://195.26.248.163:8181/api/v1"
  // process.env.REACT_APP_API_BASE_URL || "/api"
);
