const DataDisplay = ({ data, onEliminar, onAceptar, onImprimir }) => {
  
  if (!data || !data.DatosAutorizacion) {
    return <div>No hay datos para mostrar.</div>;
  }

  const esAnulacion = data.DatosAutorizacion.Tipo === 'Anulacion'; 

  return (
    <div className="card text-center mt-3">
      <div className="card-header">
        Detalle de Autorización
      </div>
      <div className="card-body">
        <h5 className="card-title">{data.DatosAutorizacion.Tienda}</h5>
        <p className="card-text">Estado: <span className="fw-bolder">{data.DatosAutorizacion.Estado ? "Activo" : "Desactivado"}</span></p>
        <p className="card-text">Código: {data.DatosAutorizacion.Codigo}</p>
        <p className="card-text">Fecha: {data.DatosAutorizacion.Fecha}</p>
        <p className="card-text">Mensaje: {data.DatosAutorizacion.Mensaje}</p>
        <p className="card-text">Fecha del Comprobante: {data.DatosAutorizacion.FechaComprobante}</p>
        <p className="card-text">N° Comprobante: {data.DatosAutorizacion.NumeroComprobante}</p>
        <div className="alert alert-info" role="alert">
        Tipo: <span className="fw-bolder">{data.DatosAutorizacion.Tipo}</span>
        </div>
        {/* ...otros datos... */}
        

        {data.DatosAutorizacion.Estado ? (
          <div className="d-flex justify-content-around mt-4">
                <button onClick={onEliminar} className="btn btn-danger">
                    <i className="bi bi-trash-fill"></i> Eliminar
                </button>

                {esAnulacion ? (
                    <button onClick={onAceptar} className="btn btn-success">
                        <i className="bi bi-check-lg"></i> Aceptar
                    </button>
                ) : (
                    <button onClick={onImprimir} className="btn btn-primary">
                        <i className="bi bi-printer-fill"></i> Imprimir
                    </button>
                )}
          </div>) : (<></>)
          
        }
      </div>
    </div>
  );
};

export default DataDisplay;

