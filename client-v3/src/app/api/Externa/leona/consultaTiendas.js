"use server"

import { cookies } from "next/headers";

const LEONA_API_MK_URL = process.env.LEONA_API_MK_URL
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export async function variables (startDate, endDate) {
    const cookieStore = cookies();
    const Token = cookieStore.get("Token")

    startDate = formatDate(startDate)
    endDate = formatDate(endDate)

    const url = `${LEONA_API_MK_URL}/api/ConsultasTiendas/Variables?Desde=${startDate}&Hasta=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Token': Token.value
        }
    })

    const data = await response.json()

    return data

}

export async function CatalogoTiendas () {
    const cookieStore = cookies();
    const Token = cookieStore.get("Token")

    const url = `${LEONA_API_MK_URL}/api/Catalogos/Tiendas`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Token': Token.value
        }
    })

    const data = await response.json()
    return data.Lista
}