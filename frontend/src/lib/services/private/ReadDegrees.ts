import type { Degree, StrapiResponse } from "@lib/types/enrollment";

export default async function ReadDegrees(token: string): Promise<Degree[]> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/degrees?populate=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los grados");
    }

    const { data } = (await response.json()) as StrapiResponse<Degree>;
    return data;
  } catch (error) {
    console.error("Error fetching degrees:", error);
    throw error;
  }
}
