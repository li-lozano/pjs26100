import type { APIRoute } from "astro";
import UpdateDegree from "@lib/services/private/UpdateDegree";
import type { CreateDegreeData } from "@lib/types/degree";
import { z } from "zod";

const degreeSectionSchema = z.object({
  documentId: z.string().min(1, "Document ID es requerido"),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre debe tener menos de 100 caracteres"),
  section: z
    .string()
    .min(1, "La sección es requerida")
    .max(100, "La sección debe tener menos de 100 caracteres"),
  capacity: z.coerce.number().min(1, "La capacidad es requerida"),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = degreeSectionSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    const documentId = data.documentId || "";
    return redirect(
      `/dashboard/configuraciones?tab=grados&error=${encodeURIComponent(message)}`,
    );
  }

  const { documentId, ...degreeSectionData } = result.data;

  try {
    const degreeSection = await UpdateDegree(
      token as string,
      documentId,
      degreeSectionData,
    );
    if (!degreeSection) {
      return redirect(
        `/dashboard/configuraciones?tab=grados&error=Error al actualizar la sección del grado`,
      );
    }

    return redirect(
      `/dashboard/configuraciones?tab=grados&success=Sección del grado actualizada correctamente`,
    );
  } catch (error) {
    let errorMessage = "Error desconocido al actualizar la sección del grado";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return redirect(
      `/dashboard/configuraciones?tab=grados&error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
