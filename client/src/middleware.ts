import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import auth from "./api/auth"; // Asegúrate de que el importe sea correcto según tu estructura de proyecto

const loginUrl = '/login'; // Definir URL de la página de login para redireccionar




export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');  // Accede directamente a la cookie desde el request

  // Rechazar y redirigir si no hay token
  if (!token) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  try {
    // Verificar el token pasando el valor del token al método verifyToken
    await auth.verifyToken(token); // Asegúrate de que verifyToken acepta un parámetro token y maneja la verificación internamente
    // Si el token es válido, permitir acceso
    return NextResponse.next();
  } catch (error) {
    // Si el token es inválido o expira, redirigir a la página de login
    console.log("Token inválido o expirado:", error.message);
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*', // Aplica este middleware solo a las rutas dentro de /dashboard
};
