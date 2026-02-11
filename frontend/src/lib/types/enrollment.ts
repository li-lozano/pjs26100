import type { Student } from "./student";

export interface Degree {
  id: number;
  documentId: string;
  name: string;
  section: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AcademicPeriod {
  id: number;
  documentId: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type EnrollmentStatus = "Pendiente" | "Aprobado" | "Rechazado" | "Pagado";

export interface Enrollment {
  id: number;
  documentId: string;
  enrollment_status: EnrollmentStatus;
  student?: Student;
  degree?: Degree;
  academic_period?: AcademicPeriod;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}
