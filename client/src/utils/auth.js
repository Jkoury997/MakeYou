// utils/auth.js
export function getTokenFromCookies(cookies) {
    // Aquí suponemos que las cookies son una instancia de Headers o un objeto similar
    const cookie = cookies.get('cookie') || ''; // Obtener el string de cookies
    const token = cookie.split(';').find(c => c.trim().startsWith('token='));
    return token ? token.split('=')[1] : null;
  }