import type { Enrollment } from "@lib/types/enrollment";
import type { StrapiSingleResponse } from "@lib/types/strapi";

export default async function ReadEnrollment(
  token: string,
  documentId: string,
): Promise<Enrollment> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/enrollments/${documentId}?populate=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las matrículas");
    }

    const { data } =
      (await response.json()) as StrapiSingleResponse<Enrollment>;
    return data;
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    throw error;
  }
}
