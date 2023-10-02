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
    comparative: async function (dateFrom, dateTo, typeComparative,token) {
        const dateFromString = new Date(dateFrom);
        const dateToString = new Date(dateTo);
    
        let prevMonthDateFrom, prevMonthDateTo, prevYearDateFrom, prevYearDateTo;
    
        // Restar 1 mes
        dateFromString.setMonth(dateFromString.getMonth() - 1);
        dateToString.setMonth(dateToString.getMonth() - 1);
        prevMonthDateFrom = dateFromString.toISOString().split('T')[0];
        prevMonthDateTo = dateToString.toISOString().split('T')[0];
    
        // Reset y restar 1 año
        dateFromString.setFullYear(new Date(dateFrom).getFullYear() - 1);
        dateToString.setFullYear(new Date(dateTo).getFullYear() - 1);
        prevYearDateFrom = dateFromString.toISOString().split('T')[0];
        prevYearDateTo = dateToString.toISOString().split('T')[0];
        let salesResponseMonth,salesResponseYear
        switch (typeComparative) {
            case "month":
                salesResponseMonth = await this.sales(token,prevMonthDateFrom,prevMonthDateTo);
                return {prevMonth: salesResponseMonth.Variables};
            case "year":
                salesResponseYear = await this.sales(token,prevYearDateFrom,prevYearDateTo);
                return {prevYear: salesResponseYear.Variables};
            case "all":
                salesResponseMonth = await this.sales(token,prevMonthDateFrom,prevMonthDateTo);
                salesResponseYear = await this.sales(token,prevYearDateFrom,prevYearDateTo);
                return { 
                    prevMonth: salesResponseMonth.Variables,
                    prevYear: salesResponseYear.Variables 
                };
            default:
                return null;
        }
    },
    calculateDiferent: function(salesResponse,prevSalesResponse){
        function addPercent(salesResponse, prevSalesResponse) {
            const calculateDifference = (current, previous) => {
                // Verificar si el valor previo es 0 para evitar división por cero
                if (previous === 0) return 0;
                return (parseFloat((current / previous)).toFixed(2) - 1) *100;
            };
        
            salesResponse.forEach((sale, index) => {
                // Lista de propiedades para las que calcular la diferencia
                const properties = ['Bruto', 'Neto', 'Tickets', 'Unidades', 'CAT', 'PP', 'TP', 'CMV'];
                
                properties.forEach(prop => {
                    // Usar prop como clave para obtener el valor actual y previo
                    const currentVal = sale[prop];
                    const prevVal = prevSalesResponse[index][prop];
                    
                    // Calcular la diferencia y almacenarla
                    prevSalesResponse[index][`diferentPercent${prop}`] = calculateDifference(currentVal, prevVal);
                });
            });
            console.log(prevSalesResponse)
            return prevSalesResponse;
        }
        
        if (prevSalesResponse.prevMonth && !prevSalesResponse.prevYear) {
            return {
                prevMonth: addPercent(salesResponse, prevSalesResponse.prevMonth)
            };
        } else if (!prevSalesResponse.prevMonth && prevSalesResponse.prevYear) {
            return {
                prevYear: addPercent(salesResponse, prevSalesResponse.prevYear)
            };
        } else if (prevSalesResponse.prevMonth && prevSalesResponse.prevYear) {
            return {
                prevMonth: addPercent(salesResponse, prevSalesResponse.prevMonth),
                prevYear: addPercent(salesResponse, prevSalesResponse.prevYear)
            };
        } else {
            return null;
        }
    },
    
}