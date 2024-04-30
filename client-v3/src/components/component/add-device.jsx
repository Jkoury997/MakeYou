import React, { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddDevice({ onDeviceData, storesList }) {
  const [selectedStore, setSelectedStore] = useState(null);  // Cambiar a null para manejar el objeto completo
  const [serialNumber, setSerialNumber] = useState('');

  const handleStoreChange = (event) => {
    // Buscar el objeto de la tienda basado en el código seleccionado
    const store = storesList.find(store => store.codigo === event.target.value);
    setSelectedStore(store);  // Almacenar el objeto de la tienda
  };

  const handleSerialChange = (event) => {
    setSerialNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envía el código y la descripción de la tienda, junto con el número de serie
    onDeviceData({
      idStore: selectedStore ? selectedStore.codigo : '',  // Envía código vacío si no se selecciona nada
      name: selectedStore ? selectedStore.descripcion : '',  // Envía descripción vacía si no se selecciona nada
      sn: serialNumber
    });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>Cargar dispositivo</CardTitle>
            <CardDescription>Ingrese la información del dispositivo para iniciar el proceso de carga.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="store">Tienda</Label>
                <select
                  id="store"
                  value={selectedStore ? selectedStore.codigo : ''}
                  onChange={handleStoreChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="" disabled>Seleccione una tienda</option>
                  {storesList.map((option) => (
                    <option key={option.Codigo} value={option.Codigo}>{option.Descripcion}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="serial">Número de serie</Label>
                <Input id="serial" placeholder="Ingrese el número de serie" value={serialNumber} onChange={handleSerialChange} />
              </div>
              <Button className="w-full" type="submit">
                Cargar dispositivo
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
