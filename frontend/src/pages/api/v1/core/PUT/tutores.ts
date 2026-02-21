import type { APIRoute } from "astro";
import UpdateProfile from "@lib/services/private/UpdateProfile";
import type { CreateProfileData } from "@lib/types/user";
import { z } from "zod";

const tutorUpdateSchema = z.object({
  documentId: z.string().min(1, "Document ID es requerido"),
  dni: z.string().min(8, "DNI debe tener al menos 8 caracteres"),
  names: z.string().min(1, "Nombres es requerido"),
  surnames: z.string().min(1, "Apellidos es requerido"),
  cell_phone: z.string().min(1, "Celular es requerido"),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = tutorUpdateSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    const documentId = data.documentId || "";
    return redirect(
      `/dashboard/tutores/edit/${documentId}?error=${encodeURIComponent(message)}`,
    );
  }

  const { documentId, ...profileData } = result.data;

  try {
    const profile = await UpdateProfile(
      token as string,
      documentId,
      profileData as CreateProfileData,
    );

    if (!profile) {
      return redirect(
        `/dashboard/tutores/edit/${documentId}?error=Error al actualizar el perfil`,
      );
    }

    return redirect(
      `/dashboard/tutores/${documentId}?success=Tutor actualizado correctamente`,
    );
  } catch (error) {
    let errorMessage = "Error desconocido al actualizar el tutor";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return redirect(
      `/dashboard/tutores/edit/${documentId}?error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
