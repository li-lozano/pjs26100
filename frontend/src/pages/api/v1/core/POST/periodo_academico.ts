import type { APIRoute } from "astro";
import CreateAcademicPeriod from "@lib/services/private/CreateAcademicPeriod";
import type { CreateAcademicPeriodData } from "@lib/types/academic_period";
import { z } from "zod";

const academicPeriodSchema = z.object({
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

  const academicPeriodData: CreateAcademicPeriodData = {
    name: result.data.name,
    active: result.data.active,
  };

  try {
    const academicPeriod = await CreateAcademicPeriod(
      token as string,
      academicPeriodData,
    );
    if (!academicPeriod) {
      return redirect(
        `/dashboard/configuraciones?tab=periodos&error=Error al crear el periodo académico`,
      );
    }

    return redirect(
      `/dashboard/configuraciones?tab=periodos&success=Periodo académico creado correctamente`,
    );
  } catch (error) {
    let errorMessage = "Error desconocido al crear el periodo académico";

    if (error instanceof Error) {
      const msg = error.message;
      if (msg.includes("Name already taken")) {
        errorMessage = "El nombre ya está en uso";
      } else {
        errorMessage = msg;
      }
    }

    return redirect(
      `/dashboard/configuraciones?tab=periodos&error=${encodeURIComponent(errorMessage)}`,
    );
  }
};
