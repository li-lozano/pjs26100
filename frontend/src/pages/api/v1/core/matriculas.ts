import type { APIRoute } from "astro";
import type { CreateEnrollmentData } from "@lib/types/enrollment";
import CreateEnrollment from "@lib/services/private/CreateEnrollment";
import { z } from "zod";


const enrollmentSchema = z.object({
  student: z.string().min(1, "El estudiante es requerido"),
  degree: z.string().min(1, "El grado es requerido"),
  academic_period: z.string().min(1, "El período académico es requerido"),
  enrollment_status: z.enum(["Pendiente", "Aprobado", "Rechazado", "Pagado"], {
    errorMap: () => ({ message: "Estado de matrícula no válido" }),
  }).optional(),
  enrollment_date: z.string().min(1, "La fecha de matrícula es requerida"),
  observations: z.string().optional(),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token, user } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = enrollmentSchema.safeParse(data);

  // Detectar si el usuario es tutor
  const isTutor = user?.role?.name?.toLowerCase() === "tutor";
  let redirectUrl = isTutor ? "/dashboard/tutor/mis-estudiantes" : "/dashboard/matriculas";

  if (!result.success) {
    let msg = result.error.issues.map((issue) => issue.message).join(", ");
    return redirect(`${redirectUrl}?error=${encodeURIComponent(msg)}`);
  }

  const enrollmentData: CreateEnrollmentData = {
    student: result.data.student,
    degree: result.data.degree,
    academic_period: result.data.academic_period,
    enrollment_status: "Pendiente",
    observations: result.data.observations,
    enrollment_date: result.data.enrollment_date,
  };

  if (isTutor) {
    enrollmentData.enrollment_status = "Pendiente";
  } else {
    enrollmentData.enrollment_status = result.data.enrollment_status || "Pendiente";
  }

  try {
    const enrollment = await CreateEnrollment(token as string, enrollmentData);

    if (!enrollment) {
      return redirect(`${redirectUrl}?error=${encodeURIComponent("Error al crear la matrícula")}`);
    }

    const successMessage = isTutor
      ? "Solicitud de matrícula enviada. Pendiente de aprobación."
      : "Matrícula creada correctamente";

    return redirect(`${redirectUrl}?success=${encodeURIComponent(successMessage)}`);
  } catch (error) {
    let errorMessage = "Error desconocido al crear la matrícula";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return redirect(`${redirectUrl}?error=${encodeURIComponent(errorMessage)}`);
  }
};