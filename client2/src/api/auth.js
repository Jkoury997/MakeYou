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

const forgotPassword = async (email) => {
    try {
        // Codificar el email para la URL
        const encodedEmail = encodeURIComponent(email);

        // Hacer una solicitud GET, no es necesario enviar un body para GET
        const response = await fetch(`/api/SolicitaRecuperoClave?Email=${encodedEmail}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        // Procesar la respuesta
        const data = await response.json();
        if (data.Estado) {
            // Solicitud exitosa, procesar los datos
            return data;
        } else {
            // Solicitud fallida, lanzar error con mensaje
            throw new Error(data.Mensaje || 'Error al solicitar el cambio de contraseña');
        }
    } catch (error) {
        console.error('Error al solicitar el cambio de contraseña:', error);
        throw error;
    }
};


export default {
    login,
    userAccess,
    forgotPassword
    // ...otros métodos relacionados con la autenticación
};
