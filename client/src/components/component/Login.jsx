
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"

export function Login({ onFormSubmit }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Esto evita el comportamiento predeterminado del formulario
    onFormSubmit(email, password);
  };

  return (
    (<div
      key="1"
      className="w-full h-screen flex items-center justify-center bg-gray-50">
      <Card
        className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-center mb-6">
            <Image
              alt="Logo"
              className="h-20 w-20 rounded-full"
              height="100"
              src="/placeholder.svg"
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100" />
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-700 mb-4">Inicio de sesion</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label className="text-sm text-gray-600" htmlFor="email">
                Email
              </Label>
              <Input
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                id="email"
                placeholder="Escribe tu email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="email"
                 />
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-end">
                <Label className="text-sm text-gray-600" htmlFor="password">
                  Contaseña
                </Label>
                <Link className="text-sm text-indigo-400 hover:underline" href="#">
                  Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  id="password"
                  placeholder="Escribe tu contraseña"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="current-password"
                  
                   />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                  <EyeIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              <Button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                type="submit">
                Ingresar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}


function EyeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}
