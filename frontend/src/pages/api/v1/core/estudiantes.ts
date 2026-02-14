import type { APIRoute } from "astro";
import type { CreateStudentData } from "@lib/types/student";
import CreateStudent from "@lib/services/private/CreateStudent";
import { z } from "zod";


const studentSchema = z.object({
  names: z.string().min(1, "El nombre es requerido"),
  surnames: z.string().min(1, "El apellido es requerido"),
  dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres").max(8, "El DNI debe tener como máximo 8 caracteres"),
  birthday: z.string().min(1, "La fecha de nacimiento es requerida"),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = studentSchema.safeParse(data);

  if (!result.success) {
    const message = "Datos inválidos";
    return redirect(`/dashboard/estudiantes?error=${encodeURIComponent(message)}`);
  }

  const studentData: CreateStudentData = {
    names: result.data.names,
    surnames: result.data.surnames,
    dni: result.data.dni,
    birthday: result.data.birthday,
  }

  try {
    const student = await CreateStudent(token as string, studentData);

    if (!student) {
      return redirect(`/dashboard/estudiantes?error=Error al crear el estudiante`);
    }

    return redirect(`/dashboard/estudiantes?success=Estudiante creado correctamente`);
  } catch (error) {
    let errorMessage = "Error desconocido al crear el estudiante";

    if (error instanceof Error) {
      const msg = error.message;
      // Strapi v5 suele devolver errores en el body, pero el servicio tira Error
      // Aquí podemos personalizar según lo que lance el servicio CreateStudent
      if (msg.includes("DNI already taken") || msg.includes("already exists")) {
        errorMessage = "El DNI ya está registrado";
      } else {
        errorMessage = msg;
      }
    }

    return redirect(`/dashboard/estudiantes?error=${encodeURIComponent(errorMessage)}`);
  }


}

