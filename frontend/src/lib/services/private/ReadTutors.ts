import type { User } from "@lib/types/user";

export default async function ReadTutors(token: string): Promise<User[]> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/users?filters[role][name][$eq]=Tutor&populate[profile][populate]=students`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching tutors");
    }

    const data = await response.json() as User[];
    return data;
  } catch (error) {
    console.error("Error fetching tutors:", error);
    throw error;
  }
}
