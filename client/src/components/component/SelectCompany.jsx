import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../../public/vercel.svg";

export function SelectCompany({ datos }) {
  const { Nombre, Empresas} = datos;
  console.log(Empresas)
  // Verificar si Empresas es un array
  if (!Array.isArray(Empresas)) {
    return <p>No hay empresas disponibles.</p>;
  }
  return (
    <div
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
              src={logo}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100" />
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-700 mb-4">Bienvenido {Nombre} !</h1>
          <form>
            {Empresas.map((empresa) => (
              <div key={empresa.Codigo} className="mb-2">
                <Button
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                  type="button"
                  onClick={() => console.log(`Seleccionada: ${empresa.Nombre}`)} // Aquí puedes poner tu lógica real
                >
                  {empresa.Nombre}
                </Button>
              </div>
            ))}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
