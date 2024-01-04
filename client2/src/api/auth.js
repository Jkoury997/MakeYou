import Cookies from "js-cookie";

const login = async (email, password) => {
    try {
        const response = await fetch('/api/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Usuario : email, Password: password }),
        });

        const data = await response.json();

        // Verificar el estado de la respuesta
        if (data.Estado) {
            // Inicio de sesión exitoso
            // Procesar datos de usuario, como guardar el AccessKey y otros detalles
            Cookies.set('AccessKey', data.AccessKey, { expires: 2 }); // Expira en 1 día, ajusta según necesites
            return data;
        } else {
            // Inicio de sesión fallido, manejar el error
            throw new Error(data.Mensaje || 'Error desconocido');
        }
    } catch (error) {
        // Manejo de errores de red u otros errores inesperados
        console.error('Error during login:', error);
        throw error;
    }
};

const userAccess = async (Empresa) => {
    const AccessKey = Cookies.get('AccessKey')
    try {
        const response = await fetch('/api/UserAccess',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ AccessKey : AccessKey, Empresa: Empresa }),
        });

        const data = await response.json();
         // Verificar el estado de la respuesta
         if (data.Estado) {
            // Inicio de sesión exitoso
            // Procesar datos de usuario, como guardar el AccessKey y otros detalles
            Cookies.set('Token', data.Token, { expires: 2 }); // Expira en 1 día, ajusta según necesites
            return data;
        } else {
            // Inicio de sesión fallido, manejar el error
            throw new Error(data.Mensaje || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error during company:', error);
        throw error;
    }
}

export default {
    login,
    userAccess
    // ...otros métodos relacionados con la autenticación
};
