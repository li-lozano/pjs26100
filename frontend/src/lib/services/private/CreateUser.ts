import type { CreateUserData, User } from "../../types/user";

/**
 * Crea un nuevo usuario en la API de Strapi v5.
 * @param token Token de autenticación Bearer.
 * @param data Datos del usuario a crear.
 * @returns El usuario creado.
 */
export default async function CreateUser(
  token: string,
  data: CreateUserData,
): Promise<User> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/users`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error?.message || "No se pudo crear el usuario");
  }

  return await response.json();
}
