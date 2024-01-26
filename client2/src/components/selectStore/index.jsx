import { useState } from 'react';

const StoreSelect = ({ stores, onCompanySelect }) => {
    const [selectedStore, setSelectedStore] = useState('');

    const handleSelectChange = (event) => {
        setSelectedStore(event.target.value);
    };

    const handleButtonClick = () => {
        onCompanySelect(selectedStore);
    };

    return (
            <div className="row mt-3">
                <div className="col-12 col-md-9 mb-3 mb-md-0">
                    <select 
                        className="form-select form-select-lg" 
                        aria-label="Large select example"
                        value={selectedStore}
                        onChange={handleSelectChange}
                    >
                        <option value="">Seleccionar tienda</option>
                        {stores.map((store) => (
                            <option key={store.Codigo} value={store.Codigo}>
                                {store.Descripcion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-3 d-flex align-items-center">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-pink btn-lg w-100"
                        onClick={handleButtonClick}
                    >
                        Preparar
                    </button>
                </div>
            </div>
    );
};

export default StoreSelect;
