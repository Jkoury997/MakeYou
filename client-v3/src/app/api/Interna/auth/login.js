"use server"

import { cookies } from 'next/headers'

const AUTH_API_URL = process.env.AUTH_API_URL

export async function login(email,password) {
    

    const response = await fetch(`${AUTH_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

    const data = await response.json()
    const cookieStore = cookies()
    cookieStore.set('token',data.token)
 
  return true
}
