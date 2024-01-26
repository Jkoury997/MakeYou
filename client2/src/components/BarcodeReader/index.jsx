import{ useState } from 'react';

export default function BarcodeReader() {
    const [barcode, setBarcode] = useState('');
    const [scanResult, setScanResult] = useState('');

    const handleScan = data => {
        if (data) {
            setScanResult(data);
        }
    };

    const handleError = err => {
        console.error(err);
    };

    const handleTextChange = e => {
        setBarcode(e.target.value);
    };

    const handleSubmit = () => {
        setScanResult(barcode);
    };

    return (
        <div>
            <p>Resultado del Escaneo: {scanResult}</p>
            <div className="input-group mt-3 mb-3">
                <span className="input-group-text"><i className="bi bi-upc-scan"></i></span>
                <div className="form-floating is-invalid">
                    <input
                        type="text"
                        className="form-control"
                        id="barcodeScan"
                        placeholder="Codigo de barras"
                        value={barcode}
                        onChange={handleTextChange}
                    />
                    <label htmlFor="barcodeScan">Codigo de barras</label>
                </div>
                <span className="input-group-text">
                    <button onClick={handleSubmit}><i className="bi bi-upc-scan"></i></button>
                </span>
            </div>
        </div>
    );
}
