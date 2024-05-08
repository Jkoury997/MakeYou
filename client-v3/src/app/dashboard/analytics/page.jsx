"use client";

import { useEffect, useState } from 'react';
import { timeDate } from "@/app/api/Interna/ircounter/analytics";
import { LineChart } from "@/components/component/LineChart";
import { StoreAll } from '@/app/api/Interna/ircounter/store';
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
    const [selectStore, setSelectStore] = useState("all");


    useEffect(() => {

        fetchData(startDate, endDate);

    }, [startDate, endDate,selectStore]); 

        const fetchData = async (startDate,endDate) => {
            setIsLoading(true);
            let trafficPromises = [];
            try {
                const stores = await StoreAll();
                setStoresList(stores);
    
                if (selectStore === "all") {
                    trafficPromises = stores.map(store => timeDate(store.idStore, startDate, endDate));
                } else {
                    const singleData = await timeDate(selectStore, startDate, endDate); // Direct fetch without wrapping into Promise.all
                    trafficPromises = [singleData]; // Wrap in array for consistent handling
                }
    
                const allTrafficData = await Promise.all(trafficPromises);
                if (allTrafficData.length > 0 && allTrafficData[0].length > 0) { // Checking data existence
                    const labels = allTrafficData[0].map(data => data.date);
                    const datasets = allTrafficData.map((trafficData, index) => ({
                        name: stores[index] ? stores[index].name : 'Single Store',
                        sales: trafficData.map(data => data.totalIn),
                        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
                    }));
                    setChartData({ labels, datasets });
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false)
            }
        }


        const handleSearch = (newStartDate, newEndDate,selectedStore) => {
            setSelectStore(selectedStore)
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
