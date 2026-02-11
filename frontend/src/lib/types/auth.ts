export interface AuthUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface Credentials {
  email: string;
  password: string;
}
