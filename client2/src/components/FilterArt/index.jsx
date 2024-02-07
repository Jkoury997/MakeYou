import React, { useState } from 'react';

function FilterArt({ datos }) {
const [mostrarFiltros, setMostrarFiltros] = useState(false); // Nuevo estado para controlar la visibilidad
// Función para alternar la visibilidad de los filtros
const toggleFiltros = () => {
    setMostrarFiltros(!mostrarFiltros);
  };
  // Estado inicial para los valores de entrada de cada tipo de filtro
  const [inputValues, setInputValues] = useState({
    Cabeceras: '',
    Rubros: '',
    Lineas: '',
    Medidas: '',
    Detalles: '',
  });
  // Estado para las sugerencias de cada tipo de filtro
  const [sugerencias, setSugerencias] = useState({
    Cabeceras: [],
    Rubros: [],
    Lineas: [],
    Medidas: [],
    Detalles: [],
  });

  // Maneja el cambio en los inputs de los filtros
  const handleInputChange = (e, tipo) => {
    const valor = e.target.value;

    // Actualiza el valor del input correspondiente
    setInputValues(prev => ({ ...prev, [tipo]: valor }));

    if (!valor) {
      setSugerencias(prev => ({ ...prev, [tipo]: [] }));
      return;
    }

    // Busca coincidencias en los datos para el tipo de filtro correspondiente
    const coincidencias = datos[tipo].filter(item =>
      item.Descripcion.toLowerCase().includes(valor.toLowerCase()) ||
      item.Codigo.toLowerCase().includes(valor.toLowerCase())
    );

    setSugerencias(prev => ({ ...prev, [tipo]: coincidencias }));
  };

  // Limpia las sugerencias y establece el valor del input seleccionado
  const handleSuggestionClick = (tipo, descripcion) => {
    setInputValues(prev => ({ ...prev, [tipo]: descripcion }));
    setSugerencias(prev => ({ ...prev, [tipo]: [] }));
  };

  // Tipos de filtros a iterar
  const tiposFiltros = ['Cabeceras', 'Rubros', 'Lineas', 'Medidas', 'Detalles'];

  return (
    <div className="container-fluid mt-2">
        <button className="btn btn-primary btn-pink mb-3" onClick={toggleFiltros}>
            {mostrarFiltros ? <i className="bi bi-funnel-fill"></i> : <i className="bi bi-funnel"></i>}
        </button>
      {mostrarFiltros && (
    
      <div className="row">
        {tiposFiltros.map((tipo) => (
          <div key={tipo} className="col-12 col-md-6"> {/* Ajusta aquí para controlar el layout responsivo */}
            <div className="form-group">
              <label htmlFor={`input-${tipo}`}>{tipo}:</label>
              <input
                id={`input-${tipo}`}
                type="text"
                className="form-control"
                value={inputValues[tipo]}
                onChange={(e) => handleInputChange(e, tipo)}
                placeholder={`Buscar ${tipo.toLowerCase()} por código o descripción`}
              />
              {sugerencias[tipo].length > 0 && (
                <div className="list-group position-relative">
                  {sugerencias[tipo].map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSuggestionClick(tipo, item.Descripcion)}
                    >
                      {item.Descripcion} ({item.Codigo})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  );
  
  
}

export default FilterArt;
