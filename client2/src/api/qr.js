



const url = 'https://vps-3640684-x.dattaweb.com'

const create = async (dataFrom) => {
    const Token = localStorage.getItem('Token')
    try {
        const response = await fetch(`${url}/api/qr/create`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': Token
            },
            body: JSON.stringify(dataFrom)
        });

        if (!response.ok) {
            // Maneja respuestas no exitosas
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        console.log(data);
        return data; // Devolver los datos recibidos del servidor
    } catch (error) {
        console.error('Error to create:', error);
        throw error;
    }
}

const list = async () => {
    const Token = localStorage.getItem('Token')
    try {
        const response = await fetch(`${url}/api/qr/list`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': Token
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }
        const data = await response.json();
        console.log(data);
        return data; // Devolver los datos recibidos del servidor
    } catch (error) {
        console.error('Error to create:', error);
        throw error;
    }
}

const getById = async (uuid) => {
    const Token = localStorage.getItem('Token')
    try {
        const response = await fetch(`${url}/api/qr/id/${uuid}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': Token
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }
        const data = await response.json();
        return data; // Devolver los datos recibidos del servidor
    } catch (error) {
        console.error('Error to create:', error);
        throw error;
    }

}


export default {
    create,
    list,
    getById
    
};