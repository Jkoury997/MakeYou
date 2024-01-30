import { useState } from 'react';

export default function BarcodeReader({ onBarcodeSubmit }) {
    const [barcode, setBarcode] = useState('');

    const handleTextChange = e => {
        setBarcode(e.target.value);
    };


    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    const handleSubmit = () => {
        onBarcodeSubmit(barcode);
        setBarcode('');
    };


    return (
        <div>
            <div className="input-group mt-3">
                <span className="input-group-text"><i className="bi bi-upc-scan"></i></span>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="barcodeScan"
                        placeholder="Código de barras"
                        value={barcode}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown} 
                    />
                    <label htmlFor="barcodeScan">Código de barras</label>
                </div>
                <span className="input-group-text">
                    <button onClick={handleSubmit}><i className="bi bi-upc-scan"></i></button>
                </span>
            </div>
        </div>
    );
}
