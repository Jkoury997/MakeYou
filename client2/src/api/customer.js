
const DebtCustomer = async (filtro) => {
    const Token = localStorage.getItem('Token')


    try {
        const response = await fetch(`/analytics/api/CuentasCorrientes/SaldoClientes?Tipo=${filtro}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Token': Token, // Aquí usamos el token definido arriba
            }
        });

        const data = await response.json();
        // Verificar el estado de la respuesta
        if (response.ok) { // Si la solicitud fue exitosa
            return data; // Puedes ajustar esto según cómo necesites usar los datos
        } else {
            // La solicitud falló, manejar el error
            throw new Error(data.Mensaje || 'Error al consultar el saldo de proveedores');
        }
    } catch (error) {
        console.error('Error durante la consulta de saldo de proveedores:', error);
        throw error; // Propaga el error para que pueda ser manejado más arriba si es necesario
    }
}

export default {
    DebtCustomer
}