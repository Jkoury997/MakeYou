"use server"

import { cookies } from "next/headers";

const IRCOUNTER_API_URL = process.env.IRCOUNTER_API_URL
const IRCOUNTER_API_URL_Prueba = "http://localhost:3005"

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


export async function timeDate(idStore, startDate, endDate) {
    // Construye la URL con los parámetros
    const baseUrl = `${IRCOUNTER_API_URL}/ircounter/api/analytics/statistics/timedate`;
    const queryParams = new URLSearchParams({
      idStore: idStore,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    });
    const url = `${baseUrl}?${queryParams}`;
  
    try {
      // Realiza la solicitud GET
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parsea la respuesta JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

export async function statistics (idStore,startDate,endDate) {
  const baseUrl = `${IRCOUNTER_API_URL}/ircounter/api/analytics/statistics`;
    const queryParams = new URLSearchParams({
      idStore: idStore,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    });

    const url = `${baseUrl}?${queryParams}`;
    try {
      // Realiza la solicitud GET
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parsea la respuesta JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
}

export async function prepareData(idStore, startDate, endDate) {
  //const baseUrl = `${IRCOUNTER_API_URL_Prueba}/ircounter/api/analytics/prepare-data`;
  const baseUrl = `${IRCOUNTER_API_URL}/ircounter/api/analytics/prepare-data`;
  const queryParams = new URLSearchParams({
    idStore: idStore,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  });

  const url = `${baseUrl}?${queryParams}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export async function prepareDataRange(idStore, startDate, endDate) {
  //const baseUrl = `${IRCOUNTER_API_URL_Prueba}/ircounter/api/analytics/prepare-data`;
  const baseUrl = `${IRCOUNTER_API_URL}/ircounter/api/analytics/prepare-data/range`;
  const queryParams = new URLSearchParams({
    idStore: idStore,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  });

  const url = `${baseUrl}?${queryParams}`;
  console.log(url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export async function prepareDataHour(idStore, startDate, endDate) {
  //const baseUrl = `${IRCOUNTER_API_URL_Prueba}/ircounter/api/analytics/prepare-data`;
  const baseUrl = `${IRCOUNTER_API_URL}/ircounter/api/analytics/prepare-data/hours`;
  const queryParams = new URLSearchParams({
    idStore: idStore,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  });

  const url = `${baseUrl}?${queryParams}`;
  console.log(url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function prepareDataDay(idStore, startDate, endDate) {
  //const baseUrl = `${IRCOUNTER_API_URL_Prueba}/ircounter/api/analytics/prepare-data`;
  const baseUrl = `${IRCOUNTER_API_URL}/ircounter/api/analytics/prepare-data/day`;
  const queryParams = new URLSearchParams({
    idStore: idStore,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  });

  const url = `${baseUrl}?${queryParams}`;
  console.log(url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

