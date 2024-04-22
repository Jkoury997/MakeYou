"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation' // Correcta importación de useRouter
import { Login } from "@/components/component/login";
import login from "@/apis/auth"; // Asumiendo que esto exporta una función async para el login

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Uso correcto del useRouter

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = await login(email, password);
            console.log('Login successful', data);

            // Usar Next.js router para redirigir
            router.push('/dashboard'); // Ajusta esto según la ruta de tu dashboard
        } catch (error) {
            console.error('Error:', error.message);
            // Aquí puedes mostrar un mensaje de error en la UI, por ejemplo:
            alert('Login Failed: ' + error.message); // O usar un estado para mostrar un mensaje en la UI
        }
    };

    return (
        <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLogin}
        />
    );
}
