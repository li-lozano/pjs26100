import type { APIRoute } from "astro";
import DeleteUser from "@lib/services/private/DeleteUser";
import DeleteProfile from "@lib/services/private/DeleteProfile";
import ReadTutor from "@lib/services/private/ReadTutor";
import type { User } from "@lib/types/user";
import { z } from "zod";

const tutorDeleteSchema = z.object({
  documentId: z.string().min(1, "Document ID es requerido"),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = tutorDeleteSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    const documentId = data.documentId || "";
    return redirect(
      `/dashboard/tutores/edit/${documentId}?error=${encodeURIComponent(message)}`,
    );
  }

  const { documentId } = result.data;

  try {
    // Primero obtenemos la información del tutor para saber qué usuario tiene asociado
    const tutorData = await ReadTutor(token as string, documentId);

    // En Strapi v5 popule=* retorna el usuario en users_permissions_user
    // Puede venir como objeto o con la estructura de Strapi data
    const tutor = tutorData.data;
    const associatedUser = tutor.users_permissions_user;

    const userid = associatedUser?.id || associatedUser?.data?.id;

    // Eliminamos el perfil
    await DeleteProfile(token as string, documentId);

    // Si hay un usuario asociado, lo eliminamos también
    if (userid) {
      await DeleteUser(token as string, userid);
    }

    return redirect(`/dashboard/tutores?success=Tutor eliminado correctamente`);
  } catch (error) {
    let errorMessage = "Error desconocido al eliminar el tutor";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return redirect(
      `/dashboard/tutores/edit/${documentId}?error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
