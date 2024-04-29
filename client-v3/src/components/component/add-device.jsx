
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CameraScanner } from "../ui/webcam";

export function AddDevice({onClose}) {

  const storeOptions = [
    { id: 'store1', name: 'Tienda 1' },
    { id: 'store2', name: 'Tienda 2' },
    { id: 'store3', name: 'Tienda 3' }
  ];
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
      <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Agregar Dispositivo</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Ingrese los detalles del dispositivo para agregarlo.</p>
        </div>
        <div className="mb-6">
          <Label className="mb-2 block font-semibold" htmlFor="store">
            Seleccionar Tienda
          </Label>
          <Select id="store">
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tienda" />
            </SelectTrigger>
            <SelectContent>
              {storeOptions.map(store => (
                <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-6">
          <Label className="mb-2 block font-semibold" htmlFor="serial">
            Número de Serie
          </Label>
          <Input id="serial" placeholder="Ingrese el número de serie" type="text" />
        </div>
        <CameraScanner></CameraScanner>
        <Button className="w-full mb-2">Agregar Dispositivo</Button>
        <Button className="w-full text-gray-500 bg-white  border-gray-300 hover:bg-gray-300 hover:text-white rounded-lg overflow-hidden" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}

function CameraIcon(props) {
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
      <path
        d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>)
  );
}
