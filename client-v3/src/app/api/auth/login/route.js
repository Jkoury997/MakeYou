import { cookies } from 'next/headers'

const AUTH_API_URL = process.env.AUTH_API_URL

export async function POST(request) {
    const {email,password} = await request.json()

    const res = await fetch(`${AUTH_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

 
  const data = await res.json()

  const cookieStore = cookies()
  cookieStore.set('token',data.token)
 
  return Response.json(data)
}