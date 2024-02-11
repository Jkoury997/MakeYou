import { useState } from 'react';

const FilterDate = ({ onDateChange, isComparativeEnabled = false }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [comparative, setComparative] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onDateChange(dateFrom, dateTo, comparative);
    };

    return (
        <div className="row mt-3">
            <div className="col-md-6">
                <div className="input-group mb-3">
                    <span className="input-group-text">Fecha</span>
                    <input 
                        type="date" 
                        aria-label="Desde" 
                        className="form-control fs-10" 
                        placeholder="Desde" 
                        name="dateFrom" 
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <input 
                    
                        type="date" 
                        aria-label="Hasta" 
                        className="form-control fs-10" 
                        placeholder="Hasta" 
                        name="dateTo" 
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                    {!isComparativeEnabled && (
                    <button 
                        className="btn btn-pink" 
                        type="submit" 
                        onClick={handleSubmit}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                    )}
                </div>
            </div>
            <div className="col-md-6 mb-3">
                <div className="input-group">
                    {isComparativeEnabled && (
                        <>
                            <label className="input-group-text" htmlFor="inputGroupSelect">Comparacion</label>
                            <select 
                                className="form-select" 
                                id="inputGroupSelect" 
                                name="comparative" 
                                value={comparative}
                                onChange={(e) => setComparative(e.target.value)}
                            >
                                <option value="only">Sin</option>
                                <option value="month">Mensual</option>
                                <option value="year">Anual</option>
                            </select>
                            <button 
                                className="btn btn-pink" 
                                type="submit" 
                                onClick={handleSubmit}
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default FilterDate;
