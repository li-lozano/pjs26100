import type { Role } from "@lib/types/user";

export interface AuthUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface Credentials {
  email: string;
  password: string;
}
