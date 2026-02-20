import type { EnrollmentStatus } from "@lib/types/enrollment";

interface EnrollmentConfig {
  bgIndex: string;
  textIndex: string;
  label: string;
}

export const ENROLLMENT_STATUS_CONFIG: Record<
  EnrollmentStatus,
  EnrollmentConfig
> = {
  Pendiente: {
    bgIndex: "bg-yellow-600",
    textIndex: "text-yellow-100",
    label: "Pendiente",
  },
  Aprobado: {
    bgIndex: "bg-green-600",
    textIndex: "text-green-100",
    label: "Aprobado",
  },
  Rechazado: {
    bgIndex: "bg-red-600",
    textIndex: "text-red-100",
    label: "Rechazado",
  },
  Pagado: {
    bgIndex: "bg-rayito-blue",
    textIndex: "text-white",
    label: "Pagado",
  },
};

export const getEnrollmentStatusConfig = (
  status: EnrollmentStatus | undefined,
): EnrollmentConfig | null => {
  if (!status) return null;
  return ENROLLMENT_STATUS_CONFIG[status] || null;
};
