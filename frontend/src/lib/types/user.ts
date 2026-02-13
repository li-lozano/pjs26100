export interface Role {
  id: number;
  documentId: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Profile {
  id: number;
  documentId: string;
  names: string;
  surnames: string;
  dni: string;
  cell_phone: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  role: Role;
  profile: Profile;
}

export interface CreateUserData {
  username: string;
  email: string;
  password?: string;
  role: number | string; // ID o documentId del rol
  confirmed?: boolean;
  blocked?: boolean;
}

export interface CreateProfileData {
  names: string;
  surnames: string;
  dni: string;
  cell_phone: string;
  users_permissions_user?: string | number;
}
