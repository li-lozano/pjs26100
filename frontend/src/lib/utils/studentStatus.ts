import type { StudentStatus } from '../types/student';

interface StatusConfig {
  bgIndex: string;
  textIndex: string;
  label: string;
}

export const STUDENT_STATUS_CONFIG: Record<StudentStatus, StatusConfig> = {
  Pendiente: {
    bgIndex: "bg-yellow-100",
    textIndex: "text-yellow-800",
    label: "⏳ Pendiente de Aprobación",
  },
  Activo: {
    bgIndex: "bg-green-100",
    textIndex: "text-green-800",
    label: "✅ Activo",
  },
  Rechazado: {
    bgIndex: "bg-red-100",
    textIndex: "text-red-800",
    label: "❌ Rechazado",
  },
};

export const getStudentStatusConfig = (status: StudentStatus | undefined): StatusConfig | null => {
  if (!status) return null;
  return STUDENT_STATUS_CONFIG[status] || null;
};
