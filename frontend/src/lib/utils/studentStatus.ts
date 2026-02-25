import type { StudentStatus } from "@lib/types/student";

interface StatusConfig {
  bgIndex: string;
  textIndex: string;
  label: string;
}

export const STUDENT_STATUS_CONFIG: Record<StudentStatus, StatusConfig> = {
  Pendiente: {
    bgIndex: "bg-yellow-600",
    textIndex: "text-yellow-100",
    label: "Pendiente",
  },
  Activo: {
    bgIndex: "bg-green-600",
    textIndex: "text-green-100",
    label: "Activo",
  },
  Rechazado: {
    bgIndex: "bg-red-600",
    textIndex: "text-red-100",
    label: "Rechazado",
  },
};

export const getStudentStatusConfig = (
  status: StudentStatus | undefined,
): StatusConfig | null => {
  if (!status) return null;
  return STUDENT_STATUS_CONFIG[status] || null;
};
