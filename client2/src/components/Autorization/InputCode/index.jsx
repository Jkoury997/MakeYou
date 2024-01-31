import { useState } from "react";
const InputCode = ({ onCodeSubmit }) => {
    const [inputCode, setInputCode] = useState('');

    const handleInputChange = (e) => {
        // Convertir a mayúsculas y eliminar caracteres no deseados (no dígitos y guiones)
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
        
        // Formatear el valor para incluir guión después de los primeros 4 dígitos
        if (value.replace(/-/g, "").length <= 4) {
            // Si hay 4 o menos dígitos, simplemente reemplaza múltiples guiones con uno solo
            value = value.replace(/-+/g, "");
        } else {
            // Si hay más de 4 dígitos, inserta un guión después de los primeros 4 dígitos
            value = value.slice(0, 4) + '-' + value.slice(4).replace(/-+/g, "");
        }

        setInputCode(value);
    };

    const handleSubmit = () => {
        onCodeSubmit(inputCode); // Llama a la función pasada como prop con el valor actual del input.
    };

    return (
        <div className="row mt-3">
            <div className="col-12 col-md-9 mb-2 mb-md-0">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Ingrese el código"
                    aria-label="Código de autorización"
                    value={inputCode}
                    onChange={handleInputChange}
                    maxLength={9}
                />
            </div>
            <div className="col-12 col-md-3 d-flex align-items-center">
                <button 
                    type="button" 
                    className="btn btn-primary btn-pink w-100"
                    onClick={handleSubmit}
                >
                    Consultar
                </button>
            </div>
        </div>
    );
};

export default InputCode;
