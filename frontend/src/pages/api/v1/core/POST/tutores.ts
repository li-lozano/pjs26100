import type { APIRoute } from "astro";
import CreateUser from "@lib/services/private/CreateUser";
import CreateProfile from "@lib/services/private/CreateProfile";
import { getRoleIdByName } from "@lib/services/private/ReadRole";
import type { CreateUserData, CreateProfileData } from "@lib/types/user";
import { z } from "zod";

const tutorSchema = z.object({
  dni: z.string().min(8, "DNI debe tener al menos 8 caracteres"),
  names: z.string().min(1, "Nombres es requerido"),
  surnames: z.string().min(1, "Apellidos es requerido"),
  email: z.string().email("Email es requerido"),
  cell_phone: z.string().min(1, "Celular es requerido"),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;
  const roleId = await getRoleIdByName(token as string, "Tutor");

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = tutorSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return redirect(`/dashboard/tutores?error=${encodeURIComponent(message)}`);
  }

  const userData: CreateUserData = {
    username: result.data.email.split("@")[0],
    email: result.data.email,
    password: result.data.dni,
    role: roleId,
    confirmed: true,
    blocked: false,
  };

  try {
    const userResult = await CreateUser(token as string, userData);
    if (!userResult || !userResult.id) {
      return redirect(`/dashboard/tutores?error=Error al crear el usuario`);
    }

    const profileData: CreateProfileData = {
      names: result.data.names,
      surnames: result.data.surnames,
      dni: result.data.dni,
      cell_phone: result.data.cell_phone,
      users_permissions_user: userResult.id,
    };

    const profile = await CreateProfile(token as string, profileData);
    if (!profile) {
      return redirect(`/dashboard/tutores?error=Error al crear el perfil`);
    }

    return redirect(`/dashboard/tutores?success=Tutor creado correctamente`);
  } catch (error) {
    let errorMessage = "Error desconocido al crear el tutor";

    if (error instanceof Error) {
      const msg = error.message;
      if (msg.includes("Email already taken")) {
        errorMessage = "El correo electrónico ya está registrado";
      } else if (msg.includes("Username already taken")) {
        errorMessage = "El nombre de usuario ya está en uso";
      } else {
        errorMessage = msg;
      }
    }

    return redirect(
      `/dashboard/tutores?error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
