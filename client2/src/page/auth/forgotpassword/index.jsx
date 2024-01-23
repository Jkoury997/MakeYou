import React, { useState } from 'react';
import ForgotPassword from "../../../components/Auth/ForgotPassword";
import authService from "../../../api/auth";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí manejas la solicitud al servidor
        // Por ejemplo, una solicitud POST
        try {
            const response = await authService.forgotPassword(email)
            setMessage(response.Mensaje);
            console.log(response)
        } catch (error) {
            setMessage(response.Mensaje);
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <ForgotPassword 
            email={email} 
            onEmailChange={handleEmailChange} 
            onSubmit={handleSubmit} 
            message={message}
        />
    );
}
