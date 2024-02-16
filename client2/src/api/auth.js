const login = async (email, password) => {
    try {
        const response = await fetch('/api/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Usuario: email, Password: password }),
        });

        const data = await response.json();


        if (data.Estado) {
            console.log("Entre")
            // Si el inicio de sesión es exitoso, entonces reemplaza el AccessKey existente
            if (localStorage.getItem('AccessKey')) {
                localStorage.removeItem('AccessKey'); // Eliminar AccessKey existente
            }
            localStorage.setItem('AccessKey', data.AccessKey); // Almacenar nuevo AccessKey
            return data
        } else {
            throw new Error(data.Mensaje || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const userAccess = async (Empresa) => {
    const AccessKey = localStorage.getItem('AccessKey');
    
    if (!AccessKey) {
        throw new Error('AccessKey not found. Please login again.');
    }

    try {
        const response = await fetch('/api/UserAccess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ AccessKey, Empresa }),
        });

        const data = await response.json();

        if (data.Estado) {
            localStorage.setItem('Token', data.Token);
            console.log(data.Token) // Almacenar nuevo Token
            return data;
        } else {
            throw new Error(data.Mensaje || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error during company access:', error);
        throw error;
    }
};

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

const resetPassword = async ( Email, Codigo, NuevaClave) => {
    const Newpassword = {
        Email,
        Codigo,
        NuevaClave
    };

    console.log(Email)

    try {
        const response = await fetch('/api/CambiarClave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(Newpassword)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.Mensaje || 'Error desconocido al cambiar la contraseña');
        }

        return data;
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        throw error;
    }
};



export default {
    login,
    userAccess,
    forgotPassword,
    resetPassword
    // ...otros métodos relacionados con la autenticación
};
