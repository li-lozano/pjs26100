import type { Student, StrapiResponse } from "@lib/types/student";

export default async function ReadStudentsByTutor(
  token: string,
  tutorProfileId: string
): Promise<Student[]> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/students?filters[profile][documentId][$eq]=${tutorProfileId}&populate=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching tutor's students");
    }

    const json = await response.json();

    // DEBUG: Ver la respuesta completa
    console.log("=== RAW API RESPONSE ===");
    console.log("Full response:", JSON.stringify(json, null, 2));

    const { data } = json as StrapiResponse<Student>;
    return data;
  } catch (error) {
    console.error("Error fetching students by tutor:", error);
    throw error;
  }
}
