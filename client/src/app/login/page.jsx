"use client"
import {Login} from "@/components/component/login";
import authApi from "@/api/auth";
import { useRouter } from 'next/navigation';



export default function login(){
    const router = useRouter();

    const handleFormSubmit =  async (email, password) => {
        try {
            const userData = await authApi.login(email, password);
            console.log(userData)
            if (userData.Estado === true) {
                router.push('/login/selectCompany');
            } else {
                // Manejar una respuesta de inicio de sesión fallida
                console.error("Inicio de sesión fallido:", userData.Mensaje);
                // Aquí puedes establecer un estado o mostrar un mensaje de error al usuario
            }

        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            // Manejo de error, como mostrar un mensaje al usuario
        }
    };


    return (
        <Login onFormSubmit={handleFormSubmit} />
    );
}