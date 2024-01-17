import { Link, NavLink } from "react-router-dom";

export default function ShowQrVcard({data}) {
    // Asegúrate de tener la imagen correcta en la ruta especificada
     // Cambia esto por la ruta correcta a tu logo
     const logo = "/image/logos/MK.svg"
     const url = 'https://vps-3640684-x.dattaweb.com'

     const estiloFondo = {
        backgroundColor: data.color, // Asegúrate de que data.color tenga un valor de color válido
        paddingTop: '5rem',
        paddingBottom: '3rem'
    };
    const openVCard = () => {
        window.location.href = `${url}/api/qr/downloadContact/${data.uuid}`;
    };

    return (
        <> 
        <div className="py-5 pb-3 pt-5" style={estiloFondo}>
            <div className="container text-center">
                <img 
                    className="rounded-4 bg-white mb-3" 
                    src={logo} 
                    alt="Logo" 
                    style={{ width: '100px' }} // Usa un objeto para los estilos en línea en JSX
                />
                <h1 className="fs-3 mb-1 fw-bold">{data.name} {data.lastname} </h1>
                <span className="fs-5">{data.company} </span><br />
                <span className="fs-6">{data.titlejob} </span><br />
            </div>
        </div>
        <div className="container my-3" style={{ flex: 1 }}>
        <div className="list-group list-group-flush">
        {data.phone && (
                <div className="list-group-item">
                    <label className="fw-bold mb-2 d-block link-secondary">Teléfono</label>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-phone fs-4 me-2"></i>
                        <Link className="text-decoration-none fs-4 link-dark" to={data.whatsapplink}>
                            +54 9 {data.phone}
                        </Link>
                    </div>
                </div>
            )}

            {data.email && (
                <div className="list-group-item">
                    <label className="fw-bold mb-2 d-block link-secondary">Email</label>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-envelope fs-4 me-2"></i>
                        <a className="text-decoration-none fs-4 link-dark" href={`mailto:${data.email}`}>
                            {data.email}
                        </a>
                    </div>
                </div>
            )}

            {data.web && (
                <div className="list-group-item">
                    <label className="fw-bold mb-2 d-block link-secondary">Página web</label>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-link-45deg fs-4 me-2"></i>
                        <Link className="text-decoration-none fs-4 link-dark" to={data.web}>
                            {data.web}
                        </Link>
                    </div>
                </div>
            )}

            {data.address && (
                <div className="list-group-item">
                    <label className="fw-bold mb-2 d-block link-secondary">Dirección</label>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt fs-4 me-2"></i>
                        <Link className="text-decoration-none fs-5 link-dark" to="/ruta-de-direccion"> {/* Ajusta esta ruta */}
                            {data.address}
                        </Link>
                    </div>
                </div>
                )}
        </div>
    </div>
    <div className="fixed-bottom">
                <button onClick={openVCard} className="btn btn-primary w-100 text-white rounded-0 border-0 py-3" style={estiloFondo}>
                    <i className="bi bi-plus-lg me-1"></i>Abrir en Contactos
                </button>
            </div>
    </>
    );
}
