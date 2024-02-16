
const isUserAuthenticated = () => {
  const Token = localStorage.getItem('Token') // Asume que el token está almacenado con la clave 'token'
  return !!Token; // Devuelve true si el token existe, false en caso contrario
};

export default {
    isUserAuthenticated
    // ...otros métodos relacionados con la autenticación
};
