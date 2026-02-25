import type { APIRoute } from "astro";
import UpdateStudent from "@lib/services/private/UpdateStudent";
import type { CreateStudentData } from "@lib/types/student";
import { z } from "zod";

const studentUpdateSchema = z.object({
  documentId: z.string().min(1, "Document ID es requerido"),
  names: z.string().min(1, "Nombres es requerido"),
  surnames: z.string().min(1, "Apellidos es requerido"),
  dni: z.string().min(8, "DNI debe tener al menos 8 caracteres"),
  birthday: z.string().min(1, "Fecha de nacimiento es requerida"),
  gender: z.string().min(1, "Género es requerido"),
  address: z.string().min(1, "Dirección es requerida"),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = studentUpdateSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    const documentId = data.documentId || "";
    return redirect(
      `/dashboard/estudiantes/edit/${documentId}?error=${encodeURIComponent(message)}`,
    );
  }

  const { documentId, ...studentData } = result.data;

  try {
    const student = await UpdateStudent(
      token as string,
      documentId,
      studentData as Partial<CreateStudentData>,
    );

    if (!student) {
      return redirect(
        `/dashboard/estudiantes/edit/${documentId}?error=Error al actualizar el estudiante`,
      );
    }

    return redirect(
      `/dashboard/estudiantes/${documentId}?success=${encodeURIComponent("Estudiante actualizado correctamente")}`,
    );
  } catch (error) {
    let errorMessage = "Error desconocido al actualizar el estudiante";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return redirect(
      `/dashboard/estudiantes/edit/${documentId}?error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
