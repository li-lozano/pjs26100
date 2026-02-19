import type { APIRoute } from "astro";
import CreateDegree from "@lib/services/private/CreateDegree";
import type { CreateDegreeData } from "@lib/types/degree";

import { z } from "zod";


const degreeSectionSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre debe tener menos de 100 caracteres"),
  section: z.string().min(1, "La sección es requerida").max(100, "La sección debe tener menos de 100 caracteres"),
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
    const message = result.error.issues.map((issue) => issue.message).join(", ");
    return redirect(`/dashboard/configuraciones?tab=grados&error=${encodeURIComponent(message)}`);
  }

  const degreeSectionData: CreateDegreeData = {
    name: result.data.name,
    section: result.data.section,
    capacity: result.data.capacity,
  }

  try {
    const degreeSection = await CreateDegree(token as string, degreeSectionData);
    if (!degreeSection) {
      return redirect(`/dashboard/configuraciones?tab=grados&error=Error al crear la sección del grado`);
    }

    return redirect(`/dashboard/configuraciones?tab=grados&success=Sección del grado creada correctamente`);
  } catch (error) {
    let errorMessage = "Error desconocido al crear la sección del grado";

    if (error instanceof Error) {
      const msg = error.message;
      if (msg.includes("Name already taken")) {
        errorMessage = "El nombre ya está en uso";
      } else {
        errorMessage = msg;
      }
    }

    return redirect(`/dashboard/configuraciones?tab=grados&error=${encodeURIComponent(errorMessage)}`);
  }
}