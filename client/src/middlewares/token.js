// pages/middleware.js
import { NextResponse } from 'next/server';
import { getTokenFromCookies } from '../utils/auth'; // Función auxiliar para obtener el token de las cookies

export async function middleware(request) {
  const token = getTokenFromCookies(request.cookies);

  const { pathname } = request.nextUrl;

  // Permitir acceso si el pathname es de recursos estáticos o de la página de inicio de sesión
  if (pathname.includes('/_next') || pathname === '/login') {
    return NextResponse.next();
  }

  // Verificar el token para rutas protegidas
  if (!token && pathname !== '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Utilidad para obtener el token de las cookies
function getTokenFromCookies(cookies) {
  return cookies.get('token'); // Asegúrate que este nombre coincida con cómo guardaste el token
}
