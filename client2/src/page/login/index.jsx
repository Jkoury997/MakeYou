// LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../../api/auth";
import Login from "../../components/Auth/Login";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await authService.login(email, password);
            if (userData.Estado) {
                // Guardar datos del usuario en Local Storage
                localStorage.setItem('userDataLogin', JSON.stringify(userData));
                navigate('/company');
            } else {
                // Manejar el caso de inicio de sesión no exitoso
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Login
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
        />
    );
}