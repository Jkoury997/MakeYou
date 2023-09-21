const axios = require('axios');

module.exports = {
    login: async function(password, email) {
        try {
            const response = await axios.post('http://190.216.66.210:10287/api/Login', {
                Usuario: email,
                Password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    },
    bussines: async function(id, accesskey) {
        try {
            const response = await axios.post('http://190.216.66.210:10287/api/UserAccess', {
                AccessKey: accesskey, // Aquí fue corregido a "AccessKey"
                Empresa: id // Aquí fue corregido a "Empresa"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }
    
}
