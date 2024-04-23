"use client"
// Importar useState y useRouter correctamente
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrige la importación de useRouter
import { Login } from "@/components/component/login";
import auth from "../../api/auth"; // Asegúrate de que la función login está correctamente definida en esta ruta

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Uso correcto del useRouter

    // Define correctamente la función handleLogin
    const handleLogin = async (event) => {
        event.preventDefault();

            const success = await auth.login(email, password);
            if (success) {
                console.log("Login successful");
                router.push('/dashboard'); // Asegúrate de que esta ruta sea la correcta
            } else {
                console.error('Credenciales incorrectas');
                alert('Credenciales incorrectas'); // Considera un manejo más sofisticado del estado de error
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


