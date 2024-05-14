"use client"

import { Login } from "@/components/component/login"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { login} from "../api/Interna/auth/login"; 
import { loginMK } from "../api/Externa/auth/login";
import { AlertText } from "@/components/component/alert-text";



export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para manejar los mensajes de error
    const router = useRouter();
  
    const handleLogin = async (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario
      setError(''); // Resetear el mensaje de error antes de intentar iniciar sesión
  
      try {
        const response = await login(email, password);
        await loginMK(email, password);
  
        if (response) {
          router.push("/dashboard");
        } else {
            setError('Email o contraseña incorrectos. Por favor, inténtalo de nuevo.');
          }
        } catch (err) {
          setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };
  
    return (
      <div>
        {error && (
            <AlertText
            message={error}
            variant="destructive"
            onClose={() => setError('')}
            />
        )}
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={(event) => handleLogin(event)}
        />
      </div>
    );
  }