"use server"

import { cookies } from 'next/headers'

const AUTH_API_URL = process.env.AUTH_API_URL

export async function login(email, password) {
  try {
    const response = await fetch(`${AUTH_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Manejo de errores específicos del servidor
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    
    if (!data.token) {
      throw new Error('Token no recibido del servidor');
    }

    const cookieStore = cookies();
    cookieStore.set('token', data.token);

    return true;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    return false;
  }
}
