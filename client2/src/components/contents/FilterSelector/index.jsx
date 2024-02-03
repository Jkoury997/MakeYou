// FilterSelector.js
import React from 'react';

function FilterSelector({ onChange }) {
  return (
    <div className="container mt-3 ps-1">
      <select className="form-control" onChange={(e) => onChange(e.target.value)}>
        <option value="0">Todo</option>
        <option value="1">Filtro</option>
        <option value="2">No filtro</option>
      </select>
    </div>
  );
}

export default FilterSelector;

