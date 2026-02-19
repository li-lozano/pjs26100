import type { APIRoute } from "astro";
import type { CreateStudentData } from "@lib/types/student";
import CreateStudent from "@lib/services/private/CreateStudent";
import { z } from "zod";


const studentSchema = z.object({
  names: z.string().min(1, "El nombre es requerido"),
  surnames: z.string().min(1, "El apellido es requerido"),
  dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres").max(8, "El DNI debe tener como máximo 8 caracteres"),
  birthday: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.enum(["Masculino", "Femenino", "Otro"], {
    errorMap: () => ({ message: "Seleccione un género válido" }),
  }),
  address: z.string().min(1, "La dirección es requerida"),
  profile: z.string().optional(),
  student_status: z.enum(["Pendiente", "Activo", "Rechazado"]).optional(),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token, user } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = studentSchema.safeParse(data);

  if (!result.success) {
    const message = "Datos inválidos";
    return redirect(`/dashboard/estudiantes?error=${encodeURIComponent(message)}`);
  }

  // Detectar si el usuario es tutor
  const isTutor = user?.role?.name?.toLowerCase() === "tutor";
  let redirectUrl = isTutor ? "/dashboard/tutor/mis-estudiantes" : "/dashboard/estudiantes";

  const studentData: CreateStudentData = {
    names: result.data.names,
    surnames: result.data.surnames,
    dni: result.data.dni,
    birthday: result.data.birthday,
    gender: result.data.gender,
    address: result.data.address,
  };

  // Si es tutor, auto-asignar profile y status
  if (isTutor) {
    studentData.student_status = "Pendiente";
    studentData.profile = user.profile?.documentId;
    redirectUrl = "/dashboard/tutor/mis-estudiantes";
  } else {
    // Admin puede elegir status y profile
    studentData.student_status = result.data.student_status || "Activo";
    studentData.profile = result.data.profile || undefined;
  }

  try {
    const student = await CreateStudent(token as string, studentData);

    if (!student) {
      return redirect(`${redirectUrl}?error=Error al crear el estudiante`);
    }

    const successMessage = isTutor
      ? "Estudiante registrado. Esperando aprobación del administrador."
      : "Estudiante creado correctamente";

    return redirect(`${redirectUrl}?success=${encodeURIComponent(successMessage)}`);
  } catch (error) {
    let errorMessage = "Error desconocido al crear el estudiante";

    if (error instanceof Error) {
      const msg = error.message;
      if (msg.includes("DNI already taken") || msg.includes("already exists")) {
        errorMessage = "El DNI ya está registrado";
      } else {
        errorMessage = msg;
      }
    }

    return redirect(`${redirectUrl}?error=${encodeURIComponent(errorMessage)}`);
  }

}
