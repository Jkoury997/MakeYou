import { useState } from 'react';

const FilterDate = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [comparative, setComparative] = useState(''); // Ajusta el valor inicial según sea necesario

    const handleSubmit = (e) => {
        e.preventDefault();
        // Manejar la lógica del envío del formulario aquí
        console.log({ dateFrom, dateTo, comparative });
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="input-group mb-3">
                    <span className="input-group-text">Fecha</span>
                    <input 
                        type="date" 
                        aria-label="Desde" 
                        className="form-control" 
                        placeholder="Desde" 
                        name="dateFrom" 
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <input 
                        type="date" 
                        aria-label="Hasta" 
                        className="form-control" 
                        placeholder="Hasta" 
                        name="dateTo" 
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-6 mb-3">
                <div className="input-group">
                    <label className="input-group-text" htmlFor="inputGroupSelect">Comparacion</label>
                    <select 
                        className="form-select" 
                        id="inputGroupSelect" 
                        name="comparative" 
                        value={comparative}
                        onChange={(e) => setComparative(e.target.value)}
                    >
                        <option value="">Sin - Celular</option>
                        <option value="month">Mensual - Tablet</option>
                        <option value="year">Anual - Tablet</option>
                        <option value="all">Ambos - Laptop</option>
                    </select>
                    <button 
                        className="btn btn-outline-secondary btn-pink" 
                        type="submit" 
                        onClick={handleSubmit}
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterDate;
