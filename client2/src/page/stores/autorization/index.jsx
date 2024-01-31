import DataDisplay from "../../../components/Autorization/DataDisplay";
import InputCode from "../../../components/Autorization/InputCode";

export default function AutorizationPage () {
    const exampleData = {
        DatosAutorizacion: {
          CodShop: '12345',
          Tienda: 'Tienda Ejemplo',
          Codigo: 'ABC123',
          Fecha: '2024-01-30',
          Estado: true,
          Tipo: 'Tipo Ejemplo',
          Mensaje: 'Operación exitosa',
          FechaComprobante: '2024-01-30',
          NumeroComprobante: '000123456'
        },
        Estado: true,
        CodigoError: 'Sin errores',
        Mensaje: 'Proceso completado con éxito'
      };

    return(
        <>
        <InputCode></InputCode>
        <DataDisplay data={exampleData}></DataDisplay>
        </>
    )
}