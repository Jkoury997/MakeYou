import { Link } from "react-router-dom";

const ListQr = ({qrCode,index}) => {
    const linkShowQr = `https://mkapp.online/showqr/${qrCode.uuid}`

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
                    <i className="bi bi-download"></i>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end col-3">
                    <form action={`/delete/${qrCode.uuid}`} method="post">
                        <button className="btn btn-danger" type="submit"><i className="bi bi-trash"></i></button>
                    </form>
                    <form action={`/admin/qr/edit/${qrCode.uuid}`} method="get">
                        <button className="btn btn-secondary" type="submit"><i className="bi bi-pencil-square"></i></button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default ListQr