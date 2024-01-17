import React, { useEffect, useState } from 'react';
import ListQr from '../../components/Qr/ListQr';
import Loading from '../../components/contents/Loading'; // Asegúrate de que esta ruta es correcta
import qr from '../../api/qr'; // Asegúrate de que el módulo 'qr' tiene una función 'list'

export default function ListQrPage() {
    const [qrCodes, setQrCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await qr.list();
                if (response.qrCodes) {
                    setQrCodes(response.qrCodes); // Asegúrate de que la respuesta contiene un campo qrCodes
                } else {
                    throw new Error("La respuesta de la API no contiene códigos QR");
                }
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                // Aquí puedes manejar cómo mostrar el error en la interfaz de usuario
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <section className="mt-3">
            <div className="shadow-none p-3 mb-4 bg-body-tertiary rounded">
              <div className="row align-items-center">
                <div className="col-1">
                  #
                </div>
                <div className="col-2">
                  Tipo
                </div>
                <div className="col-3">
                  Nombre
                </div>
                <div className="col-2">
                  Link
                </div>
                <div className="col-1">
                  Qr
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end col-3">
                  Opciones
                </div>
              </div>
            </div>
          </section>
            {qrCodes.map((qrCode,index) => (
                <ListQr key={qrCode.uuid} qrCode={qrCode} index={index} /> // Utiliza _id como key
            ))}
        </div>
    );
}
