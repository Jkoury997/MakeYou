import React, { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddDevice({ onDeviceData, storesList }) {
  const [selectedStore, setSelectedStore] = useState(null);
  const [serialNumber, setSerialNumber] = useState('');

  const handleStoreChange = (event) => {
    const store = storesList.find(store => store.Codigo === event.target.value);
    setSelectedStore(store);
  };

  const handleSerialChange = (event) => {
    setSerialNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedStore) {
      onDeviceData({
        idStore: selectedStore.Codigo,
        name: selectedStore.Descripcion,
        sn: serialNumber
      });
    } else {
      // Manejar caso en que no se selecciona tienda
      console.error("No store selected");
    }
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
                  value={selectedStore ? selectedStore.Codigo : ''}
                  onChange={handleStoreChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">Seleccione una tienda</option>
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
