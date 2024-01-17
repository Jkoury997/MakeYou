import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowQrVcard from "../../../../components/Qr/CreateQR/ShowQr/V-Card";
import qr from '../../../../api/qr'; // Asegúrate de que esta es la ruta correcta
import Loading from '../../../../components/contents/Loading'; // Asegúrate de que esta es la ruta correcta

export default function ShowQrVcardPage() {
    const { id } = useParams();
    const [qrCodeData, setQrCodeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQrCodeData = async () => {
            try {
                const response = await qr.getById(id);
                if (response) {
                    setQrCodeData(response);
                } else {
                    throw new Error('No se encontraron datos para el QR con ID: ' + id);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQrCodeData();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        qrCodeData ? <ShowQrVcard data={qrCodeData} /> : <p>No se encontraron datos para el QR con ID: {id}</p>
    );
}
