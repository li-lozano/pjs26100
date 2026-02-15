import type { Student } from "./student";
import type { AcademicPeriod } from "./academic_period";
import type { StrapiResponse, StrapiSingleResponse } from "./strapi";
import type { Degree } from "./degree";

// Re-export for convenience
export type { Degree, AcademicPeriod };

export type EnrollmentStatus = "Pendiente" | "Aprobado" | "Rechazado" | "Pagado";

export interface Enrollment {
  id: number;
  documentId: string;
  enrollment_status: EnrollmentStatus;
  student?: Student;
  degree?: Degree;
  academic_period?: AcademicPeriod;
  enrollment_date?: string;
  observations?: string;
  student_dni_copy?: any;
  medical_certificate?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CreateEnrollmentData {
  student: string; // documentId
  degree: string; // documentId
  academic_period: string; // documentId
  enrollment_status: EnrollmentStatus;
  enrollment_date?: string;
  observations?: string;
}
