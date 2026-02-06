interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
  };
}

export default async function AuthenticateUser(credentials: Credentials): Promise<AuthResponse> {
  const baseUrl = import.meta.env.BASE_API_URL;
  const endpoint = `${baseUrl}/api/auth/local`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || "Error de autenticación";
      throw new Error(errorMessage);
    }

    return data as AuthResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Authentication Error:", error.message);
      throw error;
    }
    throw new Error("Ocurrió un error inesperado durante la autenticación");
  }
}