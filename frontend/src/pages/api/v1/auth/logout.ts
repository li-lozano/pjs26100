import type { APIRoute } from "astro";

export const ALL: APIRoute = async ({ cookies, redirect }) => {
  // Eliminar la cookie del JWT
  cookies.delete('strapi_jwt', {
    path: '/',
  });

  const successMessage = 'Has cerrado sesión correctamente.';
  return redirect(`/login?success=${encodeURIComponent(successMessage)}`);
};
