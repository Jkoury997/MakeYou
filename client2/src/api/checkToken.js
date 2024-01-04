import Cookies from 'js-cookie';

const isUserAuthenticated = () => {
  const token = Cookies.get('Token'); // Asume que el token está almacenado con la clave 'token'
  return !!token; // Devuelve true si el token existe, false en caso contrario
};

export default {
    isUserAuthenticated
    // ...otros métodos relacionados con la autenticación
};
