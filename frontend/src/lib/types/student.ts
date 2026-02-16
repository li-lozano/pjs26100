import type { StrapiResponse } from "./strapi";

export type StudentStatus = "Pendiente" | "Activo" | "Rechazado";

export interface Student {
  id: number;
  documentId: string;
  names: string;
  surnames: string;
  dni: string;
  birthday: string;
  gender: string;
  address: string;
  student_status?: StudentStatus;
  profile?: {
    id: number;
    documentId: string;
    names: string;
    surnames: string;
  };
  enrollments?: {
    id: number;
    documentId: string;
    enrollment_status: string;
    academic_period?: {
      id: number;
      documentId: string;
      name: string;
      active: boolean;
    };
  }[];
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
  student_status?: StudentStatus;
  profile?: string;
}