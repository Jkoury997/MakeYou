"use client"

import { Login } from "@/components/component/login"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { login} from "../api/Interna/auth/login"; 
import { loginMK } from "../api/Externa/auth/login";



export default function Page (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const response = await login(email,password)
        
        if(response){
            router.push("/dashboard")
            
            await loginMK(email,password)
        }

      };

    return (
        <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={(event) => handleLogin(event)}
        ></Login>
    )
}