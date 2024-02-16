



const AuthorizationInfo = async (codigo) => {
    const Token = localStorage.getItem('Token')

    try {
        const response = await fetch(`/stores/api/Autorizaciones/InfoCodigoAutorizacion?Codigo=${codigo}`, {
            method: 'POST',
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

const printVoucher = async (codigo) =>{
    const Token = localStorage.getItem('Token')

    try {
        const response = await fetch(`/stores/api/Autorizaciones/ReimprimeVoucher?Codigo=${codigo}`, {
            method: 'POST',
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
}

const declineOperation = async (codigo) => {
    const Token = localStorage.getItem('Token')

    try {
        const response = await fetch(`/stores/api/Autorizaciones/RechazarOperacion?Codigo=${codigo}`, {
            method: 'POST',
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
}

const cancelInvoice = async (codigo) => {
    const Token = localStorage.getItem('Token')

    try {
        const response = await fetch(`/stores/api/Autorizaciones/AnularFactura?Codigo=${codigo}`, {
            method: 'POST',
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
}

export default {
    AuthorizationInfo,
    printVoucher,
    declineOperation,
    cancelInvoice
    // Aquí puedes agregar más funciones relacionadas si es necesario
};
