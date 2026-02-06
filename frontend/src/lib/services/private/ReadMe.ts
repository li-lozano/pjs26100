interface Role {
  id: number;
  documentId: string;
  name: string;
  description: string;
  type: string;
}

interface User {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
}

export default async function ReadMe(token: string): Promise<User> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/users/me?populate=*`;

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
    console.error("Error fetching user data:", error);
    throw error;
  }
}