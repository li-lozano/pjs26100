export default async function DeleteStudent(token: string, documentId: string) {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/students/${documentId}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el estudiante");
    }

    if (response.status === 204) {
      return { success: true };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : { success: true };
    return data;
  } catch (error) {
    console.error("Error en DeleteStudent:", error);
    throw error;
  }
}
