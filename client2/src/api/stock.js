import Cookies from "js-cookie";

// Obtener el token almacenado en las cookies
const Token = Cookies.get('Token');

const getFilter = async () => {
    console.log(Token)
    try {
        const response = await fetch(`/stores/api/Stock/GetFiltrosStock`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Token': Token, // Usar el token obtenido de las cookies
            },
        });

        const data = await response.json();
        
        return data; // Retornar los datos en caso de éxito
    } catch (error) {
        console.error('Error fetching authorization info:', error);
        throw error; // Lanzar el error para que pueda ser manejado por quien llama a la función
    }
};



export default {
getFilter
    // Aquí puedes agregar más funciones relacionadas si es necesario
};
