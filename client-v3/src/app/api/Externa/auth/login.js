"use server"
import { cookies } from 'next/headers'
const AUTH_API_MK_URL = process.env.AUTH_API_MK_URL

export async function loginMK(email,password) {
    const res = await fetch(`${AUTH_API_MK_URL}/api/Login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          Usuario: email,
          Password: password
      }),
  });
  
    const data = await res.json()
    const cookieStore = cookies()
    cookieStore.set("AccessKey",data.AccessKey)
  
    const resEmpresa = await fetch(`${AUTH_API_MK_URL}/api/UserAccess`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          AccessKey: data.AccessKey,
          Empresa: 2
      }),
  });
    
    const dataEmpresa = await resEmpresa.json()
    cookieStore.set("Token",dataEmpresa.Token)
  
  return true
  }