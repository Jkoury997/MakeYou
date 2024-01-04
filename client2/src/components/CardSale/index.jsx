
const CardSale = () => {
    const isImageTop = false;

    return (
        <div className="col">
            <div className="card mb-3">
                {isImageTop && <img src="..." className="card-img-top" alt="Imagen superior" />}
                <div className="card-body">
                    <h5 className="card-title">Lanus Oeste</h5>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex justify-content-between align-items-center p-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <div className="w-100 d-flex justify-content-between align-items-center px-3">
                                        <span className="card-text fs-1">$ 500.000.000</span>
                                        <span className="badge text-bg-success fs-6">35 %</span>
                                    </div>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className="fs-6">Neta: <span className="fw-bold">$ 460.000.000</span></span>
                                            <span className="badge bg-primary rounded-pill">14 %</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Tickets: 100.000
                                            <span className="badge bg-primary rounded-pill">14 %</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Unidades: 1.000.000
                                            <span className="badge bg-primary rounded-pill">14 %</span>
                                        </li>
                                        <li className="list-group-item">Cat</li>
                                        <li className="list-group-item">PP</li>
                                        <li className="list-group-item">TP</li>
                                        <li className="list-group-item">CMV</li>
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
