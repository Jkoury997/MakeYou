"use client"
import {Login} from "@/components/component/login";
import authApi from "@/api/auth";


export default function login(){

    const handleFormSubmit =  async (email, password) => {
        try {
            const userData = await authApi.login(email, password);
            console.log(userData);
            // Aquí puedes manejar la respuesta exitosa
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            // Manejo de error, como mostrar un mensaje al usuario
        }
    };


    return (
        <Login onFormSubmit={handleFormSubmit} />
        
    );
}