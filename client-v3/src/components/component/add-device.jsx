/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/eZbLKkAIcjQ
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AddDevice() {
  return (
    (<section
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>Cargar dispositivo</CardTitle>
            <CardDescription>Ingrese la información del dispositivo para iniciar el proceso de carga.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div>
                <Label htmlFor="store">Tienda</Label>
                <Select id="store">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una tienda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store1">Tienda 1</SelectItem>
                    <SelectItem value="store2">Tienda 2</SelectItem>
                    <SelectItem value="store3">Tienda 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="serial">Número de serie</Label>
                <Input id="serial" placeholder="Ingrese el número de serie" />
              </div>
              <Button className="w-full" type="submit">
                Cargar dispositivo
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>)
  );
}
