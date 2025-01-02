import api from "./api";
import { AuthResponse, User } from "../types/auth";

class AuthService {
  private static instance: AuthService;
  private tokenKey = "auth_token";
  private userKey = "auth_user";

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    this.setSession(data);
    return data;
  }

  async signUp(
    email: string,
    password: string,
    fullName: string
  ): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", {
      email,
      password,
      fullName,
    });
    this.setSession(data);
    return data;
  }

  async resetPassword(email: string): Promise<void> {
    await api.post("/auth/reset-password", { email });
  }

  async updatePassword(password: string): Promise<void> {
    await api.put("/auth/password", { password });
  }

  async updateProfile(profile: Partial<User>): Promise<User> {
    const { data } = await api.put<User>("/auth/profile", profile);
    this.setUser(data);
    return data;
  }

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>("/auth/profile");
    this.setUser(data);
    return data;
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

export default AuthService.getInstance();
