import Balances from "../../../components/Balances";
import React, { useState, useEffect } from 'react';
import SearchComponent from "../../../components/contents/Search";
import customerApi from "../../../api/customer";
import FilterSelector from "../../../components/contents/FilterSelector";
import Loading from "../../../components/contents/Loading";

export default function CustomerDebtPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filtro, setFiltro] = useState('0'); // Estado para almacenar el valor del filtro seleccionado
    const [datos, setDatos] = useState({
        Lista: [],
        Estado: false,
        CodigoError: "",
        Mensaje: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Iniciar la carga
            try {
                const result = await customerApi.DebtCustomer(filtro);
                setDatos({
                    Lista: result.Lista || [],
                    Estado: true,
                    CodigoError: "",
                    Mensaje: result.Mensaje || ""
                });
                setIsLoading(false); // Finalizar la carga
            } catch (error) {
                console.error("Error fetching data:", error);
                setDatos(d => ({
                    ...d,
                    Estado: false,
                    CodigoError: "Error fetching data",
                    Mensaje: error.toString()
                }));
                setIsLoading(false); // Finalizar la carga incluso si hay un error
            }
        };

        fetchData();
    }, [filtro]);

    const filteredData = datos.Lista.filter(item =>
        item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="container">
            <div className="row mb-3">
                        <div className="col-7 pe-1">
                            <SearchComponent onSearch={handleSearch} />
                        </div>
                        <div className="col">
                            <FilterSelector onChange={setFiltro} />
                        </div>
                    </div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Balances lista={{ ...datos, Lista: filteredData }} />
                </>
            )}
        </div>
    );
}
