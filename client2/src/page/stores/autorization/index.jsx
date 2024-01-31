import React, { useState, useEffect } from 'react';
import InputCode from '../../../components/Autorization/InputCode';
import DataDisplay from '../../../components/Autorization/DataDisplay';
import Loading from '../../../components/contents/Loading';
import Alert from '../../../components/contents/Alert';
import storesApi from "../../../api/stores";

export default function AuthorizationPage() {
    const [authorizationData, setAuthorizationData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alerta, setAlerta] = useState({ type: '', message: '' });
    const [code, setCode] = useState(null);
    const [dataNeedsRefresh, setDataNeedsRefresh] = useState(false);

    const fetchAuthorizationData = async (inputCode) => {
      setIsLoading(true);
      try {
          const response = await storesApi.AuthorizationInfo(inputCode);
          if (response.Estado) {
              setAuthorizationData(response);
              setAlerta({ type: '', message: '' });
          } else {
              setAlerta({ type: 'warning', message: response.Mensaje });
              setAuthorizationData(null);
          }
      } catch (error) {
          console.error("Error fetching authorization info:", error);
          setAlerta({ type: 'danger', message: 'Error al obtener información de autorización.' });
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
    if (dataNeedsRefresh) {
        fetchAuthorizationData(code);
        setDataNeedsRefresh(false);
    }
}, [dataNeedsRefresh, code]);

const handleCodeSubmit = async (inputCode) => {
  setCode(inputCode);
  await fetchAuthorizationData(inputCode);
};

const handleAction = async (actionType) => {
  setIsLoading(true);
  try {
      let response;
      if (actionType === 'eliminar') {
          response = await storesApi.declineOperation(code);
      } else if (actionType === 'imprimir') {
          response = await storesApi.printVoucher(code);
      } else if (actionType === 'aceptar') {
          response = await storesApi.cancelInvoice(code); // Asumiendo que esta es la función correcta
      }

      if (response && !response.Estado) {
          setAlerta({ type: 'warning', message: response.Mensaje });
      } else {
          const successMessage = actionType === 'eliminar' ? 'Se rechazó correctamente' 
                              : actionType === 'imprimir' ? 'Se imprimió el voucher correctamente' 
                              : actionType === 'aceptar' ? 'Se anuló la factura correctamente' : ""; // Para 'aceptar'
          setAlerta({ type: 'success', message: successMessage });
          setTimeout(() => setDataNeedsRefresh(true), 2000); // Retraso de 1 segundo
      }
  } catch (error) {
      console.error(`Error during ${actionType} action:`, error);
      setAlerta({ type: 'danger', message: `Error al realizar la acción de ${actionType}.` });
  } finally {
      setIsLoading(false);
  }
};

    return (
        <>
            <InputCode onCodeSubmit={handleCodeSubmit} />
            {isLoading && <Loading />}
            {alerta.message && <Alert type={alerta.type} message={alerta.message} />}

            {authorizationData && <DataDisplay 
                data={authorizationData}
                onEliminar={() => handleAction('eliminar')}
                onAceptar={() => handleAction('aceptar')}
                onImprimir={() => handleAction('imprimir')}
            />}
        </>
    );
}
