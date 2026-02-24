export default async function ReadStudent(token: string, documentId: string) {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/students/${documentId}?populate=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Body:", errorBody);
      throw new Error(
        `Error fetching students: ${response.status} ${response.statusText}`,
      );
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}
