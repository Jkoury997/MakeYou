


const saleVariable = async (dataFrom,dataTo) => {
    const Token = localStorage.getItem('Token')

    try {
        const response = await fetch(`/analytics/api/ConsultasTiendas/Variables?Desde=${dataFrom}&Hasta=${dataTo}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Token': Token
            }
        });

        const data = await response.json();
         // Verificar el estado de la respuesta
         if (data.Estado) {
            
            return data.Variables;
        } else {
            // Inicio de sesión fallido, manejar el error
            throw new Error(data.Mensaje || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error during company:', error);
        throw error;
    }
}

const paymentMetheods = async (dataFrom,dataTo) => {
    const Token = localStorage.getItem('Token')

    try {
        const response = await fetch(`/analytics/api/ConsultasTiendas/ResumenCobranzas?Desde=${dataFrom}&Hasta=${dataTo}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Token': Token
            }
        });

        const data = await response.json();
         // Verificar el estado de la respuesta
         if (data.Estado) {
            return data.Cajas;
        } else {
            // Inicio de sesión fallido, manejar el error
            throw new Error(data.Mensaje || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error during company:', error);
        throw error;
    }
}




export default {
    saleVariable,
    paymentMetheods
    // ...otros métodos relacionados con la autenticación
};