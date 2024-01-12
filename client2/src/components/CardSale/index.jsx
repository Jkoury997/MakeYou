
const CardSale = ({data}) => {
    const collapseId = `flush-collapse-${data.uuid}`; // Usar UUID para generar un ID único
    const headerId = `flush-heading-${data.uuid}`;
    const parentId = `accordionFlushExample-${data.uuid}`;
    const isImageTop = false;

    function Pesos ( numero) {
        return numero.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
    }

    function calcularCambioPorcentual(actual, comparativo) {
        if (comparativo === 0) {
            return actual === 0 ? 0 : 100; // Evitar división por cero
        }
        return ((actual - comparativo) / comparativo) * 100;
    }


    return (
        <div className="col">
            <div className="card mb-3">
                {isImageTop && <img src="..." className="card-img-top" alt="Imagen superior" />}
                <div className="card-body">
                    <h5 className="card-title">{data.Tienda}</h5>
                    <div className="accordion accordion-flush" id={parentId}>
                        <div className="accordion-item">
                        <h2 className="accordion-header" id={headerId}>
                                <button className="accordion-button collapsed d-flex justify-content-between align-items-center p-0" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                                   <div className="w-100 d-flex justify-content-between align-items-center px-3">
                                        <span className="card-text fs-1">{Pesos(data.Bruto)}</span>
                                            <span 
                                                className={`badge rounded-pill ${calcularCambioPorcentual(data.Bruto, data.comparative.Bruto) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                            >
                                                {calcularCambioPorcentual(data.Bruto, data.comparative.Bruto).toFixed(2)} %
                                            </span>

                        
                                    </div>
                                </button>
                            </h2>
                            <div id={collapseId} className="accordion-collapse collapse" data-bs-parent={`#${parentId}`}> 
                                <div className="accordion-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className="fs-6">Neta: <span className="fw-bold">{Pesos(data.Neto)}</span></span>
                                            <span 
                                            className={`badge rounded-pill ${calcularCambioPorcentual(data.Neto, data.comparative.Neto) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                        >{calcularCambioPorcentual(data.Neto, data.comparative.Neto).toFixed(2)} %</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="fs-6">Tickets: <span className="fw-bold">{data.Tickets}</span></span>
                                        <span 
                                            className={`badge rounded-pill ${calcularCambioPorcentual(data.Tickets, data.comparative.Tickets) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                        >
                                            {calcularCambioPorcentual(data.Tickets, data.comparative.Tickets).toFixed(2)} %
                                            </span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className="fs-6">Unidades: <span className="fw-bold">{data.Unidades}</span></span>
                                            <span 
                                            className={`badge rounded-pill ${calcularCambioPorcentual(data.Unidades, data.comparative.Unidades) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                        >{calcularCambioPorcentual(data.Unidades, data.comparative.Unidades).toFixed(2)} %</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="fs-6">CAT: <span className="fw-bold">{data.CAT}</span></span>
                                        <span 
                                            className={`badge rounded-pill ${calcularCambioPorcentual(data.CAT, data.comparative.CAT) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                        >{calcularCambioPorcentual(data.CAT, data.comparative.CAT).toFixed(2)} %</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <span className="fs-6">PP: <span className="fw-bold">{Pesos(data.PP)}</span></span>
                                                <span 
                                            className={`badge rounded-pill ${calcularCambioPorcentual(data.PP, data.comparative.PP) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                        >{calcularCambioPorcentual(data.PP, data.comparative.PP).toFixed(2)} %</span></li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center"><span className="fs-6">TP: <span className="fw-bold">{Pesos(data.TP)}</span></span><span 
                                            className={`badge rounded-pill ${calcularCambioPorcentual(data.TP, data.comparative.TP) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                        >{calcularCambioPorcentual(data.TP, data.comparative.TP).toFixed(2)} %</span></li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center"><span className="fs-6">CMV: <span className="fw-bold">{Pesos(data.CMV)}</span></span><span 
                                            className={`badge rounded-pill ${calcularCambioPorcentual(data.CMV, data.comparative.CMV) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}
                                        >{calcularCambioPorcentual(data.CMV, data.comparative.CMV).toFixed(2)} %</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="card-text"><small className="text-body-secondary">Last updated hace 3 minutos</small></p>
                </div>
                {!isImageTop && <img src="..." className="card-img-bottom" alt="Imagen inferior" />}
            </div>
        </div>
    );
};

export default CardSale;
