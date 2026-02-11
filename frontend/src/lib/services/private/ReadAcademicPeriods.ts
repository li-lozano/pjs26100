import type { AcademicPeriod, StrapiResponse } from "@lib/types/enrollment";

export default async function ReadAcademicPeriods(token: string): Promise<AcademicPeriod[]> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/academic-periods?populate=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los períodos académicos");
    }

    const { data } = (await response.json()) as StrapiResponse<AcademicPeriod>;
    return data;
  } catch (error) {
    console.error("Error fetching academic periods:", error);
    throw error;
  }
}
