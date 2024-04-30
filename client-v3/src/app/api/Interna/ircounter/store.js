"use server"

import { Award } from "lucide-react";
import { cookies } from "next/headers"
const IRCOUNTER_API_URL = process.env.IRCOUNTER_API_URL


export async function StoreAll () {

    const cookieStore = cookies();
    const token = cookieStore.get("token")

    const response = await fetch(`${IRCOUNTER_API_URL}/ircounter/api/store/list`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`,
        },
    })

    const data = await response.json()

    return data
}

export async function CreateStore (item) {

    const cookieStore = cookies();
    const token = cookieStore.get("token")

    const response = await fetch(`${IRCOUNTER_API_URL}/ircounter/api/store/create`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`,
        },
        body: JSON.stringify(item)
    })

    const data = await response.json()
    
    return data
}