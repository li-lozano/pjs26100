import type { APIRoute } from "astro";
import CreateTutor from "@lib/services/private/CreateTutor";
import { z } from "zod";


const tutorSchema = z.object({
  dni: z.string().min(8, "DNI debe tener al menos 8 caracteres"),
  names: z.string().min(1, "Nombres es requerido"),
  surnames: z.string().min(1, "Apellidos es requerido"),
  email: z.string().email("Email es requerido"),
  cell_phone: z.string().min(1, "Celular es requerido"),
})

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = tutorSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues.map((issue) => issue.message).join(", ");
    return redirect(`/tutores?message=${message}`);
  }

  try {

  }  
}