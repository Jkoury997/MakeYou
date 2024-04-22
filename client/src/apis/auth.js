
import Cookies from 'js-cookie'; // Importar js-cookie

// Exportando la función login como default directamente
export default async function login(email, password) {
    try {
      const response = await fetch('http://localhost:3004/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log in');
      }
      const data =  await response.json()

      // Guardar el token en las cookies
      Cookies.set('token', data.token, { expires: 1 }); // Guardar por 1 día

      return true ;
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
};