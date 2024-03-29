import { Link } from "react-router-dom";

const ListQr = ({qrCode,index}) => {
    const urlApi = `https://vps-3640684-x.dattaweb.com/api`
    const linkShowQr = `https://mkapp.online/showqr/${qrCode.uuid}`
    const linkDownloadQr = `${urlApi}/qr/downloadQR/${qrCode.uuid}`

    return (

        <div className="shadow-none p-3 mb-3 bg-body-tertiary rounded">
            <div className="row align-items-center">
                <div className="col-1">
                    <span>{index}</span>
                </div>
                <div className="col-2">
                    <span>{qrCode.typeQr}</span>
                </div>
                <div className="col-3">
                    <span>{qrCode.name} {qrCode.lastname}</span>
                </div>
                <div className="col-2">
                    <Link to={linkShowQr}><i className="bi bi-person-vcard"></i></Link>
                </div>
                <div className="col-1">
                <a href={linkDownloadQr} download>
                    <i className="bi bi-download"></i>
                </a>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end col-3">
                    <form action={`${urlApi}/qr/delete/${qrCode.uuid}`} method="post">
                        <button className="btn btn-danger" type="submit"><i className="bi bi-trash"></i></button>
                    </form>
                    <form action={`${urlApi}/qr/edit/${qrCode.uuid}`} method="get">
                        <button className="btn btn-secondary" type="submit"><i className="bi bi-pencil-square"></i></button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default ListQr