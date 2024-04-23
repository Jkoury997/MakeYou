import Cookies from 'js-cookie'; // Asegúrate de tener instalado js-cookie

const login = async function (email,password) {
  try {
    const response = await fetch('http://localhost:3004/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to log in');
    }

    // Guardar el token en las cookies de forma segura
    Cookies.set('token', data.token, { expires: 1, secure: true, sameSite: 'Strict' });

    return true;

  } catch (error) {
    console.error('Login Error:', error.message);
    throw error;
  }
}


const verifyToken = async function (token) {
  // Obtener el token de las cookies
  const url = 'http://localhost:3004/api/auth/verifyToken'; // URL del endpoint


  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify token');
    }

    return true
  } catch (error) {
    console.error('Verification Error:', error.message);
    throw error;
  }
}

export default {
  login,
  verifyToken
};
