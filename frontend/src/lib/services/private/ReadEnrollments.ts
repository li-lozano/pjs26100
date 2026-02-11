import type { Enrollment, StrapiResponse } from "@lib/types/enrollment";

export default async function ReadEnrollments(token: string): Promise<Enrollment[]> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/enrollments?populate=*`;

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

    const { data } = (await response.json()) as StrapiResponse<Enrollment>;
    return data;
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    throw error;
  }
}
