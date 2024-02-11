
const CardSale = ({data,valorTitulo}) => {
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

    const mostrarValor = (key, valor) => {
        const keysNoEnPesos = ['Tickets', 'CAT', 'Unidades'];
        if (keysNoEnPesos.includes(key)) {
            return valor;
        }
        return Pesos(valor);
    };

     // Determina la primera clave y valor relevantes
    const keysToShow = Object.keys(data).filter(key => !['Tienda', 'comparative', 'uuid'].includes(key));
    const primerClave = keysToShow[valorTitulo];
    const primerValor = data[primerClave];
    const valorComparativo = data.comparative ? data.comparative[primerClave] || 0 : 0;

    return (
        <div className="col mt-3">
            <div className="card mb-1">
                {/*isImageTop && <img src="..." className="card-img-top" alt="Imagen superior" />*/}
                <div className="card-body">
                    <h5 className="card-title">{data.Tienda}</h5>
                    <div className="accordion accordion-flush" id={parentId}>
                        <div className="accordion-item">
                        <h2 className="accordion-header" id={headerId}>
                            <button className="accordion-button collapsed d-flex justify-content-between align-items-center p-0" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                                    <div className="w-100 d-flex justify-content-between align-items-center px-3">
                                        <span className="card-text fs-1">{Pesos(primerValor)}</span>
                                        <span className={`badge rounded-pill ${calcularCambioPorcentual(primerValor, valorComparativo) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}>
                                            {calcularCambioPorcentual(primerValor, valorComparativo).toFixed(2)} %
                                        </span>
                                    </div>
                                </button>
                            </h2>
                            <div id={collapseId} className="accordion-collapse collapse" data-bs-parent={`#${parentId}`}> 
                                <div className="accordion-body">
                                <ul className="list-group list-group-flush">
                                        {keysToShow.map(key => (
                                            <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span className="fs-6">{key}: <span className="fw-bold">{mostrarValor(key, data[key])}</span></span>
                                                <span className={`badge rounded-pill ${calcularCambioPorcentual(data[key], data.comparative[key] || 0) >= 0 ? 'text-bg-success' : 'text-bg-danger'}`}>
                                                    {calcularCambioPorcentual(data[key], data.comparative[key] || 0).toFixed(2)} %
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*!isImageTop && <img src="..." className="card-img-bottom" alt="Imagen inferior" /> */}
            </div>
        </div>
    );
};

export default CardSale;
