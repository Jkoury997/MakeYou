"use server"

import { cookies } from "next/headers"
const IRCOUNTER_API_URL = process.env.IRCOUNTER_API_URL

export async function Search(sn) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const params = new URLSearchParams({ sn: sn });


        const response = await fetch(`${IRCOUNTER_API_URL}/ircounter/api/heartbeat/search?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },
        });

        const data = await response.json();
        
        return data;  // Return null if no records found

}
export async function SearchLast(sn) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const params = new URLSearchParams({ sn: sn });


        const response = await fetch(`${IRCOUNTER_API_URL}/ircounter/api/heartbeat/searchlast?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },
        });

        const data = await response.json();
        console.log(data)
        
        return data;  // Return null if no records found

}
