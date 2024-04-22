import React, { useState } from "react";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function Login({ email, setEmail, password, setPassword, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>Ingresa tus datos para acceder.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  autoComplete="current-email"
                />
              </div>
              <div className="relative">
                <Label htmlFor="password">Contraseña</Label>
                <Input
  id="password"
  name="password"
  type={showPassword ? "text" : "password"}
  required
  value={password}
  onChange={e => setPassword(e.target.value)}
  placeholder="••••••••"
  autoComplete="current-password"  // Agregando el atributo de autocompletado
/>
                <Button onClick={togglePasswordVisibility} type="button" className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost">
                  <EyeIcon className="h-4 w-4" />
                  <span className="sr-only">Mostrar contraseña</span>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" />
                  <Label className="ml-2" htmlFor="remember-me">
                    Recordarme
                  </Label>
                </div>
                <Link className="text-sm text-gray-900 hover:underline dark:text-gray-50" href="#">
                  ¿Olvidé mi contraseña?
                </Link>
              </div>
              <CardFooter>
                <Button type="submit" className="w-full">Ingresar</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
