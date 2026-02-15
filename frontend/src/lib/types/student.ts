import type { StrapiResponse } from "./strapi";

export interface Student {
  id: number;
  documentId: string;
  names: string;
  surnames: string;
  dni: string;
  birthday: string;
  gender: string;
  address: string;
  profile?: {
    id: number;
    documentId: string;
    names: string;
    surnames: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CreateStudentData {
  names: string;
  surnames: string;
  dni: string;
  birthday: string;
  gender: string;
  address: string;
  profile?: string;
}