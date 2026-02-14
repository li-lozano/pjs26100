export interface CreateEnrollmentData {
  student: string; // documentId
  degree: string; // documentId
  academic_period: string; // documentId
  enrollment_status: string;
}

export default async function CreateEnrollment(token: string, formData: FormData): Promise<any> {
  const baseUrl = import.meta.env.BASE_API_URL;

  const response = await fetch(`${baseUrl}/api/enrollments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Error creating enrollment:", errorBody);
    throw new Error("No se pudo registrar la matrícula");
  }

  return await response.json();
}
