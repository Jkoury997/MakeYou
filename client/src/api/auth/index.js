import axios from 'axios';

// Configura una instancia base de Axios
const apiClient = axios.create({
  baseURL: '/ws_jinx/', // Asegúrate de que esta es la URL base correcta para el proxy
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const authApi = {
    login : async (usuario, password) => {
        try {
            const response = await apiClient.post('Login', {
            Usuario: usuario,
            Password: password
            });
            return response.data;
        } catch (error) {
            // Maneja los errores aquí
            if (error.response) {
            // La respuesta fue recibida pero el servidor respondió con un estado de error
            console.error("Error en la respuesta del servidor:", error.response.data);
            } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error("No se recibió respuesta del servidor:", error.request);
            } else {
            // Algo más causó el error
            console.error("Error al realizar la solicitud:", error.message);
            }
            throw error;
        }
    }
};

export default authApi;
// Puedes añadir más funciones para otros endpoints de tu API aquí
