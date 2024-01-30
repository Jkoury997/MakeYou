import React from 'react';

export default function FilterRubro({ rubros, onRubroSelect }) {

    const handleRubroSelect = (event) => {
        onRubroSelect(event.target.id === "Todos" ? "" : event.target.id);
    };
    return (
        <div className="btn-group flex-wrap text-center mt-3" role="group" aria-label="Basic radio toggle button group">
            <label className="btn btn-outline-primary"><i className="bi bi-funnel-fill"></i></label>
            {rubros.map((rubro, index) => (
                <React.Fragment key={rubro + index}>
                    <input type="radio" className="btn-check" name="rubroGroup" id={rubro} onClick={handleRubroSelect} autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor={rubro}>{rubro}</label>
                </React.Fragment>
            ))}
        </div>
    );
}
