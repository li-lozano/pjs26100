import { defineMiddleware } from 'astro:middleware';
import ReadMe from '@lib/services/private/ReadMe';


const protectedRoutes = ['/dashboard'];
const loginRoute = '/login'; // La página de login es la raíz del sitio.

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect, locals } = context;
  const pathname = url.pathname;
  const token = cookies.get('strapi_jwt');

  if (token && token.value) {
    try {
      const user = await ReadMe(token.value);
      if (user) {
        locals.user = user;
      } else {
        cookies.delete('strapi_jwt', { path: '/' });
        locals.user = undefined;
      }
    } catch (error) {
      console.error("Error fetching user in middleware:", error);
      cookies.delete('strapi_jwt', { path: '/' });
      locals.user = undefined;
    }
  }

  if (protectedRoutes.some(route => pathname.startsWith(route)) && !locals.user) {
    return redirect(loginRoute);
  }

  if (pathname === loginRoute && locals.user) {
    return redirect('/dashboard');
  }

  return next();
});