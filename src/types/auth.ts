export interface User {
  id?: number;
  telephone: string;
  email?: string;
  prenom?: string;
  shopName?: string;
  shopId?: number;
  nom?: string;
  // role: "admin" | "user";
  roles?: string[];
  avatar?: string;
  sub?: string;
  iat?: number;
  exp?: number;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  type?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  code: string;
}
