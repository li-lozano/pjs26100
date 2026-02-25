import type { Student } from "@lib/types/student";
import type { StrapiResponse } from "@lib/types/strapi";

export default async function ReadStudentsByTutor(
  token: string,
  tutorProfileId: string,
): Promise<Student[]> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/students?filters[profile][documentId][$eq]=${tutorProfileId}&populate[profile]=*&populate[enrollments][populate][academic_period]=*`;

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

    const { data } = json as StrapiResponse<Student>;
    return data;
  } catch (error) {
    console.error("Error fetching students by tutor:", error);
    throw error;
  }
}
