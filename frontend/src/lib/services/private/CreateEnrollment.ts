import type { CreateEnrollmentData, Enrollment, StrapiSingleResponse } from "@lib/types/enrollment";

export default async function CreateEnrollment(
  token: string,
  data: CreateEnrollmentData | FormData
): Promise<StrapiSingleResponse<Enrollment>> {

  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/enrollments`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(
        "DEBUG: Strapi Error Response:",
        JSON.stringify(errorBody, null, 2)
      );
      throw new Error(
        errorBody.error?.message || "No se pudo registrar la matrícula"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }
}
