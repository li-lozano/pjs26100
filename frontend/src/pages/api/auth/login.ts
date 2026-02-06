import type { APIRoute } from "astro";
import AuthenticateUser from "@lib/services/public/AuthenticateUser";
import { z } from "zod";


const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.errors.map(e => e.message).join(' ');
    return redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
  }

  const { email, password } = validationResult.data;

  try {
    const strapiResponse = await AuthenticateUser({ email, password });

    if (strapiResponse.jwt) {
      // Set the JWT in a secure, HttpOnly cookie
      cookies.set('strapi_jwt', strapiResponse.jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: import.meta.env.PROD, // Use secure cookies in production
        sameSite: 'strict',
      });

      const successMessage = 'Has iniciado sesión correctamente.';
      return redirect(`/dashboard?success=${encodeURIComponent(successMessage)}`);

    } else {
      const errorMessage = 'Respuesta inesperada del servidor de autenticación';
      return redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
    }
  } catch (error: any) {
    console.error("Login API Error:", error.message);
    const errorMessage = error instanceof Error ? error.message : 'Error de servidor. Inténtalo de nuevo más tarde.';
    return redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
  }
};
