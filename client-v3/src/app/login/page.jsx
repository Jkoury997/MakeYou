"use client"

import { Login } from "@/components/component/login"
import { useState } from 'react';
import { useRouter } from "next/navigation";



export default function Page (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
          const response = await fetch("/api/auth/login", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json' // Correct header setup
              },
              body: JSON.stringify({ email, password }) // Correctly format body as a JSON string
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`); // Handling response errors
          }
  
          const data = await response.json(); // Parsing JSON data from the response
          console.log(data)
  
          // Check if status is true and a token is provided
          if (data.token) {

              // Redirect to dashboard
              router.push('/dashboard'); // Adjust the path as necessary for your app
          } else {
              console.error('Login failed: Invalid credentials or no token received');
              // Optionally, handle the error scenario, perhaps by showing an error message to the user
          }
      } catch (error) {
          console.error('Failed to login:', error);
          throw error; // Rethrow to handle the error outside of this function if needed
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