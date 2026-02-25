import type { APIRoute } from "astro";
import UpdateAcademicPeriod from "@lib/services/private/UpdateAcademicPeriod";
import type { CreateAcademicPeriodData } from "@lib/types/academic_period";
import { z } from "zod";

const academicPeriodSchema = z.object({
  documentId: z.string().min(1, "Document ID es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  active: z.preprocess((val) => val === "on", z.boolean()),
});

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const { token } = locals;

  if (!token) {
    return redirect("/login?error=" + encodeURIComponent("Sesión expirada"));
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const result = academicPeriodSchema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return redirect(
      `/dashboard/configuraciones?tab=periodos&error=${encodeURIComponent(message)}`,
    );
  }

  const { documentId, ...academicPeriodData } = result.data;

  try {
    const academicPeriod = await UpdateAcademicPeriod(
      token as string,
      documentId,
      academicPeriodData,
    );
    if (!academicPeriod) {
      return redirect(
        `/dashboard/configuraciones?tab=periodos&error=Error al actualizar el periodo académico`,
      );
    }

    return redirect(
      `/dashboard/configuraciones?tab=periodos&success=Periodo académico actualizado correctamente`,
    );
  } catch (error) {
    let errorMessage = "Error desconocido al actualizar el periodo académico";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return redirect(
      `/dashboard/configuraciones?tab=periodos&error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
