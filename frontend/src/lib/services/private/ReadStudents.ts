import type { Student, StrapiResponse } from "@lib/types/student";

export default async function ReadStudents(token: string): Promise<Student[]> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/students?populate=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching students");
    }

    const { data } = (await response.json()) as StrapiResponse<Student>;
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}
