import type { APIRoute } from "astro";
import DeleteStudent from "@lib/services/private/DeleteStudent";
import { z } from "zod";

const studentDeleteSchema = z.object({
  documentId: z.string().min(1, "Document ID es requerido"),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = studentDeleteSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    const documentId = data.documentId || "";
    return redirect(
      `/dashboard/estudiantes/${documentId}?error=${encodeURIComponent(message)}`,
    );
  }

  const { documentId } = result.data;

  try {
    await DeleteStudent(token as string, documentId);
    return redirect(
      `/dashboard/estudiantes?success=${encodeURIComponent("Estudiante eliminado correctamente")}`,
    );
  } catch (error) {
    let errorMessage = "Error desconocido al eliminar el estudiante";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return redirect(
      `/dashboard/estudiantes/${documentId}?error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
