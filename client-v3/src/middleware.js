import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;  // Asegúrate de que esta variable de entorno esté configurada.

// Middleware para verificar el token y redirigir si no es válido
export async function middleware(request) {
    const cookieStore = cookies(request);
    const token = cookieStore.get('token');

    if (!token) {
        console.log("No se encontró token, redireccionando a login.");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Asegúrate de incluir la dirección completa en la solicitud fetch
    try {
        const response = await fetch(`${API_URL}/api/auth/verifyToken`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,  // Envía el token en el encabezado Authorization
                'Content-Type': 'application/json'
            }
        });

        // Primero revisa si la respuesta es OK antes de intentar obtener los datos JSON
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Ahora es seguro obtener la respuesta JSON
        return NextResponse.next();
    } catch (error) {
        console.log("Token inválido o expirado:", error.message);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: '/dashboard/:path*',
}
