"use server"

import { cookies } from "next/headers";

const IRCOUNTER_API_URL = process.env.IRCOUNTER_API_URL


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


async function searchAdvanced(data) {
    const { startDate, endDate, idStores, dayOfWeek } = data;

    
    // Preparar los ID de las tiendas y los días de la semana para la URL
    const idStoresParam = idStores ? idStores.join(',') : '';
    const dayOfWeekParam = dayOfWeek ? dayOfWeek.join(',') : '';

    // Construir la URL con parámetros de query
    let url = new URL(`${IRCOUNTER_API_URL}/ircounter/api/countdata/search/advanced`);
    if (startDate) url.searchParams.append('startDate', formatDate(startDate));
    if (endDate) url.searchParams.append('endDate', formatDate(endDate));
    if (idStoresParam) url.searchParams.append('idStores', idStoresParam);
    if (dayOfWeekParam) url.searchParams.append('dayOfWeek', dayOfWeekParam);

    const cookieStore = cookies();
    const token = cookieStore.get("token") // O obtener el token de la manera que prefieras


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`,
        },
    });


    return await response.json();
}




export{
    searchAdvanced,

}