const axios = require('axios');

module.exports = {
    getStores : async function (token) {
        try {
            
            const response = await axios.get('http://190.216.66.210:10291/api/Catalogos/Tiendas', {
                headers: {
                    'Accept': 'application/json',
                    'Token': token
                }
            });
            return response.data ;
        } catch (error) {
            console.error('Error making the request:', error.response ? error.response.data : error.message);
        }
    },
    products: async function (token,store) {
        try {
            const response = await axios.get('http://190.216.66.210:10291/api/Envios/ConsultarEnvio', {
                headers: {
                    'Accept': 'application/json',
                    'Token': token
                },
                params: {
                    'Tienda': store
                }
            });
    
            return response.data;
        } catch (error) {
            console.error('Error al hacer la solicitud:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
}