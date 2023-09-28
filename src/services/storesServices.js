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
    getRubros: function (products) {
        let rubrosUnicos = [...new Set(products.map(product => product.Rubro))];
        rubrosUnicos.unshift("Todos")
        return rubrosUnicos;
    },
    sales:  async function (token, dateFrom, dateTo) {
        try {
            const response = await axios.get('http://190.216.66.210:10288/api/ConsultasTiendas/Variables', {
                headers: {
                    'Accept': 'application/json',
                    'Token': token
                },
                params: {
                    'Desde': dateFrom,
                    'Hasta': dateTo
                }
            });
    
            return response.data;
        } catch (error) {
            console.error('Error al hacer la solicitud:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
}