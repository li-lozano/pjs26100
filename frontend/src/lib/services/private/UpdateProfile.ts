import type { CreateProfileData, Profile } from "../../types/user";

/**
 * Actualiza un perfil existente en la API de Strapi v5.
 * @param token Token de autenticación Bearer.
 * @param documentId Document ID del perfil a actualizar.
 * @param data Datos del perfil a actualizar.
 * @returns El perfil actualizado.
 */
export default async function UpdateProfile(
  token: string,
  documentId: string,
  data: Partial<CreateProfileData>,
): Promise<Profile> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/profiles/${documentId}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      errorBody.error?.message || "No se pudo actualizar el perfil",
    );
  }

  const result = await response.json();
  return result.data;
}
