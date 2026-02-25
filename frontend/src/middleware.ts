import { defineMiddleware } from "astro:middleware";
import ReadMe from "@lib/services/private/ReadMe";

const protectedRoutes = ["/dashboard"];
const loginRoute = "/login"; // La página de login es la raíz del sitio.

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect, locals } = context;
  const pathname = url.pathname;
  const token = cookies.get("strapi_jwt");

  if (token && token.value) {
    try {
      const user = await ReadMe(token.value);
      if (user) {
        locals.user = user;
        locals.token = token.value;
      } else {
        cookies.delete("strapi_jwt", { path: "/" });
        locals.user = undefined;
      }
    } catch (error) {
      console.error("Error fetching user in middleware:", error);
      cookies.delete("strapi_jwt", { path: "/" });
      locals.user = undefined;
    }
  }

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !locals.user
  ) {
    return redirect(loginRoute);
  }

  if (locals.user) {
    const roleName = locals.user.role?.name || "";

    // Redirección específica para Tutores
    if (roleName.toLowerCase() === "tutor") {
      if (pathname === loginRoute || pathname === "/dashboard") {
        return redirect("/dashboard/tutor");
      }
    }

    // Redirección general para otros roles (como Administrador)
    if (pathname === loginRoute) {
      return redirect("/dashboard");
    }
  }

  return next();
});
