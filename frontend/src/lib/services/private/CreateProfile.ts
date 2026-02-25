import type { CreateProfileData, Profile } from "../../types/user";

/**
 * Crea un nuevo perfil en la API de Strapi v5.
 * @param token Token de autenticación Bearer.
 * @param data Datos del perfil a crear.
 * @returns El perfil creado.
 */
export default async function CreateProfile(
  token: string,
  data: CreateProfileData,
): Promise<Profile> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/profiles`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error?.message || "No se pudo crear el perfil");
  }

  const result = await response.json();
  return result.data;
}
