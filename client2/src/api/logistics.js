import Cookies from "js-cookie";

const Token = Cookies.get("Token")

const stores = async () => {
    try {
        const response = await fetch('/logistics/api/Catalogos/Tiendas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Token': Token
            }
        });

        if (!response.Estado) {
            throw new Error('La respuesta de la red no fue ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        throw error;
    }
}

export default {
    stores
}