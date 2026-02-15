import type { CreateDegreeData } from "@lib/types/degree";
import type { StrapiSingleResponse } from "@lib/types/strapi";

export default async function CreateDegree(
  token: string,
  data: CreateDegreeData,
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
