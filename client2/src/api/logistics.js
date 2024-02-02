import Cookies from "js-cookie";

const Token = Cookies.get("Token")

const stores = async () => {
    console.log(Token)
    try {
        const response = await fetch('/logistics/api/Catalogos/Tiendas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Token': Token
            }
        });
        const data = await response.json();
        if (!data.Estado) {
            throw new Error('La respuesta de la red no fue ok');
        }
        return data;
    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        throw error;
    }

}

const preparationstore = async (store) => {

    try{
        const response = await fetch(`/logistics/api/Envios/ConsultarEnvio?Tienda=${store}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Token': Token
            } 
        })

        const data = await response.json()
        if (!data.Estado) {
            throw new Error('La respuesta de la red no fue ok');
        }
        return data;
    } catch (error) {
            console.error('Hubo un problema con la solicitud fetch:', error);
            throw error;
    }

}

export default {
    stores,
    preparationstore
}