import type { StrapiResponse } from "./strapi";
import type { Enrollment } from "./enrollment";
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
  enrollments?: Enrollment[];
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
