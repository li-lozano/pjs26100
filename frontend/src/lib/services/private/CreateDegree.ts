import type { Degree, StrapiSingleResponse } from "@lib/types/enrollment";

export interface DegreeData {
  name: string;
  section: string;
  capacity: number;
}

export default async function CreateDegree(
  token: string,
  data: DegreeData,
): Promise<Degree> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/degrees`;

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
        errorData.error?.message || "Error al crear el grado",
      );
    }

    const { data: createdData } = (await response.json()) as StrapiSingleResponse<Degree>;
    return createdData;
  } catch (error) {
    console.error("Error creating degree:", error);
    throw error;
  }
}
