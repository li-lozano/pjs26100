import type { CreateStudentData, Student } from "../../types/student";

/**
 * Actualiza un estudiante existente en la API de Strapi v5.
 * @param token Token de autenticación Bearer.
 * @param documentId Document ID del estudiante a actualizar.
 * @param data Datos del estudiante a actualizar.
 * @returns El estudiante actualizado.
 */
export default async function UpdateStudent(
  token: string,
  documentId: string,
  data: Partial<CreateStudentData>,
): Promise<Student> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/students/${documentId}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      errorBody.error?.message || "No se pudo actualizar el estudiante",
    );
  }

  const result = await response.json();
  return result.data;
}
