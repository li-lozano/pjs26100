import type { Degree, CreateDegreeData } from "@lib/types/degree";
import type { StrapiSingleResponse } from "@lib/types/strapi";

export default async function UpdateDegree(
  token: string,
  documentId: string,
  data: CreateDegreeData,
): Promise<Degree> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/degrees/${documentId}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Error al actualizar el grado",
      );
    }

    const { data: updatedData } =
      (await response.json()) as StrapiSingleResponse<Degree>;
    return updatedData;
  } catch (error) {
    console.error("Error updating degree:", error);
    throw error;
  }
}
