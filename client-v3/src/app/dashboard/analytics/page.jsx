"use client";

import { useEffect, useState } from 'react';
import { timeDate } from "@/app/api/Interna/ircounter/analytics";
import { LineChart } from "@/components/component/LineChart";
import { StoreAll } from '@/app/api/Interna/ircounter/store';
import { FilterDate } from '@/components/component/filter-date';
import { Loading } from '@/components/component/loading';
import { Filter } from '@/components/component/filter';



  export default function Page() {

    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    });
    const [endDate, setEndDate] = useState(new Date());
    // Estado inicial para los datos del gráfico
    const [chartData, setChartData] = useState({
        labels: [], // Los días del periodo seleccionado
        datasets: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [storesList, setStoresList] = useState([]);

    useEffect(() => {

        fetchData(startDate, endDate);
    }, [startDate, endDate]); 

        const fetchData = async (startDate,endDate) => {
            setIsLoading(true);
            try {
                // Obteniendo información de las tiendas
                const stores = await StoreAll(); // Asumimos que esta función existe y está implementada correctamente
                setStoresList(stores); 

                // Preparamos un array para recolectar promesas de datos de tráfico por tienda
                const trafficPromises = stores.map(store =>
                    timeDate(store.idStore, startDate, endDate) // Usamos las fechas como ejemplo, ajusta según sea necesario
                );

                // Esperamos a que todas las promesas se resuelvan
                const allTrafficData = await Promise.all(trafficPromises);

                // Mapeando los datos de tráfico para los labels del gráfico (tomando de la primera tienda como ejemplo)
                const labels = allTrafficData[0].map(data => data.date);

                // Creando los datasets
                const datasets = allTrafficData.map((trafficData, index) => {
                    return {
                        name: stores[index].name, // Asegúrate de que el índice corresponda entre las tiendas y sus datos
                        sales: trafficData.map(data => data.totalIn), // Aquí usamos solo totalIn, ajusta si necesitas más datos
                        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)` // Color aleatorio para cada tienda
                    };
                });

                // Actualizando el estado con los nuevos datos
                setChartData({
                    labels,
                    datasets
                });


            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false)
            }
        }


        const handleSearch = (newStartDate, newEndDate,selectedStore) => {
            console.log(selectedStore)
            setStartDate(newStartDate);
            setEndDate(newEndDate);
        };
    return (
        <>
             <Filter onSearch={handleSearch} initialStartDate={startDate} initialEndDate={endDate} stores={storesList}/>
             {isLoading ? (
                <Loading />  // Muestra el componente de carga cuando los datos están cargando
            ) : (
                <>
                    <LineChart data={chartData} title={"Entrada por dia"} />
                    {/* Otros componentes que dependen de los datos cargados */}
                </>
            )}
        </>
    );
}
