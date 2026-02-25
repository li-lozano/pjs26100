export interface Role {
  id: number;
  documentId: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  nb_users: number;
}

const getRoles = async (): Promise<Role[]> => {
  const baseUrl = import.meta.env.BASE_API_URL;
  const response = await fetch(`${baseUrl}/api/users-permissions/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener la lista de roles");
  }

  const data = await response.json();
  return data.roles;
};

export const getRoleIdByName = async (
  token: string,
  rolname: string,
): Promise<number> => {
  const roles = await getRoles();
  const role = roles.find((role: Role) => role.name === rolname);

  if (!role) {
    throw new Error(`Rol "${rolname}" no encontrado`);
  }

  return role.id;
};

export const getRoleDocumentIdByName = async (
  token: string,
  rolname: string,
): Promise<string> => {
  const roles = await getRoles();
  const role = roles.find((role: Role) => role.name === rolname);

  if (!role) {
    throw new Error(`Rol "${rolname}" no encontrado`);
  }

  return role.documentId;
};
