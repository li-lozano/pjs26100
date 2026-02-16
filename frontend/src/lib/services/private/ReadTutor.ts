export default async function ReadTutor(token: string, documentId: string) {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/profiles/${documentId}?populate=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tutor data:", error);
    throw error;
  }
}