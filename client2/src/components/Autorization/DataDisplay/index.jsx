
const DataDisplay = ({ data }) => {
  return (
    <div className="card text-center mt-3">
      <div className="card-header">
        Detalle de Autorización
      </div>
      <div className="card-body">
        <h5 className="card-title">{data.DatosAutorizacion.Tienda}</h5>
        <p className="card-text">Código de Tienda: {data.DatosAutorizacion.CodShop}</p>
        <p className="card-text">Código: {data.DatosAutorizacion.Codigo}</p>
        <p className="card-text">Fecha: {data.DatosAutorizacion.Fecha}</p>
        <p className="card-text">Tipo: {data.DatosAutorizacion.Tipo}</p>
        <p className="card-text">Mensaje: {data.DatosAutorizacion.Mensaje}</p>
        <p className="card-text">Fecha del Comprobante: {data.DatosAutorizacion.FechaComprobante}</p>
        <p className="card-text">Número del Comprobante: {data.DatosAutorizacion.NumeroComprobante}</p>
        {/* Agrega aquí más elementos si lo necesitas */}
      </div>
      <div className="card-footer text-body-secondary">
        Estado: {data.DatosAutorizacion.Estado ? 'Activo' : 'Inactivo'}
      </div>
      <div className="card-footer text-body-secondary">
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Opciones
            </button>
            <ul className="dropdown-menu">
                <li>
                <button className="dropdown-item" type="button">
                    <i className="bi bi-printer"></i> Reimprimir Voucher
                </button>
                </li>
                <li>
                <button className="dropdown-item" type="button">
                    <i className="bi bi-x-circle"></i> Anular Factura
                </button>
                </li>
                <li>
                <button className="dropdown-item" type="button">
                    <i className="bi bi-slash-circle"></i> Rechazar Operación
                </button>
                </li>
            </ul>
        </div>
    </div>
    </div>
  );
};

export default DataDisplay;
