import Login from "../../components/Login"
import { useState } from 'react';
import axios from 'axios';
export default function LoginPage () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        console.log(email)
        e.preventDefault();
        const url = 'http://190.216.66.210:10287/api/Login';
        const data = {
            Usuario: email,
            Password: password
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
                // Agrega aquí cualquier otro encabezado que necesites
            }
        };
        try {
            const response = await axios.post(url, data, config);
            console.log(response.data); // Manejar la respuesta
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    return (

       <Login
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit} 
        />
                        
    )
}