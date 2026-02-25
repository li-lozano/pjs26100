import type {
  AcademicPeriod,
  CreateAcademicPeriodData,
} from "@lib/types/academic_period";
import type { StrapiSingleResponse } from "@lib/types/strapi";

export default async function CreateAcademicPeriod(
  token: string,
  data: CreateAcademicPeriodData,
): Promise<AcademicPeriod> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/academic-periods`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Error al crear el período académico",
      );
    }

    const { data: createdData } =
      (await response.json()) as StrapiSingleResponse<AcademicPeriod>;
    return createdData;
  } catch (error) {
    console.error("Error creating academic period:", error);
    throw error;
  }
}
