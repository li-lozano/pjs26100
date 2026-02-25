import type { CreateStudentData, Student } from "@lib/types/student";

export default async function CreateStudent(
  token: string,
  data: CreateStudentData,
): Promise<Student> {
  const baseUrl = import.meta.env.BASE_API_URL;

  const response = await fetch(`${baseUrl}/api/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Error creating student:", errorBody);
    throw new Error("No se pudo registrar al estudiante");
  }

  return await response.json();
}
