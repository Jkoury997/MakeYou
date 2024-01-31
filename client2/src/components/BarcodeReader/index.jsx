import { useState } from 'react';

export default function BarcodeReader({ onBarcodeSubmit }) {
    const [barcode, setBarcode] = useState('');

    const handleTextChange = e => {
        setBarcode(e.target.value);
    };


    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            onBarcodeSubmit(barcode);
            setBarcode('');
        }
    };



    return (
        <div className='fixed-bottom'>
            <div className="input-group">
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
            </div>
        </div>
    );
}
