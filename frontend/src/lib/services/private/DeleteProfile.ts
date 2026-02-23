export default async function DeleteProfile(token: string, documentId: string) {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/profiles/${documentId}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el perfil");
    }

    if (response.status === 204) {
      return { success: true };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : { success: true };
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
