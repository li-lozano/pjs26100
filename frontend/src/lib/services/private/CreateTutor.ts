export interface CreateTutorData {
  username: string;
  email: string;
  password?: string;
  names: string;
  surnames: string;
  dni: string;
  cell_phone: string;
}

export default async function CreateTutor(token: string, data: CreateTutorData): Promise<any> {
  const baseUrl = import.meta.env.BASE_API_URL;

  // 1. Crear el Perfil
  const profileResponse = await fetch(`${baseUrl}/api/profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        names: data.names,
        surnames: data.surnames,
        dni: data.dni,
        cell_phone: data.cell_phone,
      },
    }),
  });

  if (!profileResponse.ok) {
    const errorBody = await profileResponse.json();
    console.error("Error creating profile:", errorBody);
    throw new Error("No se pudo crear el perfil del tutor");
  }

  const profileData = await profileResponse.json();
  console.log(profileData);
  const profileId = profileData.data.documentId;
  console.log(profileId);


  // 2. Obtener el ID del rol "Tutor" 


  // 3. Crear el Usuario y linkear al Perfil y Rol
  const userResponse = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password || data.dni, // Password por defecto si no se provee es el DNI
      confirmed: true,
      profile: profileId,
    }),
  });

  if (!userResponse.ok) {
    const errorBody = await userResponse.json();
    console.error("Error creating user:", errorBody);
    // TODO: Considerar borrar el perfil si falla el usuario (rollback manual)
    throw new Error("No se pudo crear el usuario del tutor");
  }

  return await userResponse.json();
}
