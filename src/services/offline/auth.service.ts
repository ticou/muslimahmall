import { AuthResponse, User } from "../../types/auth";
import { users } from "./data";

class AuthOfflineService {
  private static instance: AuthOfflineService;
  private tokenKey = "auth_token";
  private userKey = "auth_user";

  private constructor() {}

  static getInstance(): AuthOfflineService {
    if (!AuthOfflineService.instance) {
      AuthOfflineService.instance = new AuthOfflineService();
    }
    return AuthOfflineService.instance;
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Simuler une vérification d'authentification
    const user = Object.values(users).find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const response: AuthResponse = {
      user,
      token: "fake_jwt_token",
    };

    this.setSession(response);
    return response;
  }

  async signUp(
    telephone: string,
    password: string,
    nom: string
  ): Promise<AuthResponse> {
    // Simuler la création d'un nouvel utilisateur
    const newUser: User = {
      id: Math.random(),
      telephone,
      nom,
      roles: ["ROLE_USER"],
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };

    users[newUser.id ?? 0] = newUser;

    const response: AuthResponse = {
      user: newUser,
      token: "fake_jwt_token",
    };

    this.setSession(response);
    return response;
  }

  async resetPassword(email: string): Promise<void> {
    // Simuler l'envoi d'un email de réinitialisation
    return Promise.resolve();
  }

  async updatePassword(password: string): Promise<void> {
    // Simuler la mise à jour du mot de passe
    return Promise.resolve();
  }

  async updateProfile(profile: Partial<User>): Promise<User> {
    const currentUser = this.getUser();
    if (!currentUser) throw new Error("No user found");

    const updatedUser = {
      ...currentUser,
      // ...profile,
      // updatedAt: new Date(),
    };

    users[currentUser.id ?? 0] = updatedUser;
    this.setUser(updatedUser);
    return updatedUser;
  }

  async getProfile(): Promise<User> {
    const user = this.getUser();
    if (!user) throw new Error("No user found");
    return user;
  }

  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  private setSession(auth: AuthResponse): void {
    localStorage.setItem(this.tokenKey, auth.token);
    localStorage.setItem(this.userKey, JSON.stringify(auth.user));
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}

export default AuthOfflineService.getInstance();
