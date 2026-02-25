import type {
  AcademicPeriod,
  CreateAcademicPeriodData,
} from "@lib/types/academic_period";
import type { StrapiSingleResponse } from "@lib/types/strapi";

export default async function UpdateAcademicPeriod(
  token: string,
  documentId: string,
  data: CreateAcademicPeriodData,
): Promise<AcademicPeriod> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/academic-periods/${documentId}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Error al actualizar el período académico",
      );
    }

    const { data: updatedData } =
      (await response.json()) as StrapiSingleResponse<AcademicPeriod>;
    return updatedData;
  } catch (error) {
    console.error("Error updating academic period:", error);
    throw error;
  }
}
