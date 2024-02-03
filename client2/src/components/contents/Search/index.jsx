import React, { useState } from 'react';

function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Llamar a la función onSearch con el término de búsqueda actualizado
  };

  return (

    <div className="input-group flex-nowrap mt-3 ">
    <span className="input-group-text" id="seach"><i className="bi bi-search"/></span>
    <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchComponent;
