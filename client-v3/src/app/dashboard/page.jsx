"use client"

import { useState, useEffect } from "react";
import { StoreAll,} from "../api/Interna/ircounter/store";
import { variables } from "../api/Externa/leona/consultaTiendas";
import { Loading } from "@/components/component/loading";
import { FilterDate } from "@/components/component/filter-date";
import { CardsHome } from "@/components/component/cards-home";
import { StoreTrafficBarChart } from "@/components/component/StoreTrafficBarChart";
import { Arrow_Up, Arrow_Down, Trending_Up } from '@/components/ui/icons';
import { statistics } from "../api/Interna/ircounter/analytics";
import { Filter } from "@/components/component/filter";

export default function Page() {
    const [cardsData, setCardsData] = useState([]);
    const [storeTrafficData, setStoreTrafficData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [storesList, setStoresList] = useState([]);
    const [selectStore, setSelectStore] = useState("all");

    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    });
    const [endDate, setEndDate] = useState(new Date());


    useEffect(() => {
        fetchData(startDate, endDate);
    }, [startDate, endDate,selectStore]); 

    const fetchData = async (startDate, endDate) => {
        setIsLoading(true);
        try {
            const stores = await StoreAll();
            setStoresList(stores);
    
            const variableData = await variables(startDate, endDate);
            console.log('Stores:', stores); // Log store data
            console.log('Variable data:', variableData); // Log variable data
    
            let statsPromises;
            if (selectStore === "all") {
                statsPromises = stores.map(store => 
                    statistics(store.idStore, startDate, endDate).then(data => ({
                        idStore: store.idStore,
                        name: store.name,
                        ...data
                    }))
                );
            } else {
                // Si es una sola tienda, encontrar esa tienda específica y solicitar sus datos
                const store = stores.find(store => store.idStore === selectStore);
                if (store) {
                    statsPromises = [statistics(selectStore, startDate, endDate).then(data => ({
                        idStore: store.idStore,
                        name: store.name,
                        ...data
                    }))];
                }
            }
    
            const statsResults = await Promise.all(statsPromises);
            console.log(statsResults);
    
            const storeTrafficData = statsResults.map((stat, index) => ({
                ...stores.find(store => store.idStore === stat.idStore), // Encuentra la tienda correspondiente por ID
                totalIn: stat.totalIn,
                totalOut: stat.totalOut
            }));
    
            // Preparar datos para el componente StoreTrafficBarChart
            const storeTrafficDataBar = statsResults.map(stat => ({
                store: stat.name,  // Usa el nombre de la tienda como referencia
                totalIn: stat.totalIn
            }));
            setStoreTrafficData(storeTrafficDataBar);
    
            const filteredVariables = variableData.Variables.filter(v => storeTrafficData.some(s => s.name === v.Tienda));
            const cards = calculateCardsData(storeTrafficData, filteredVariables);
            console.log(cards)
            setCardsData(cards);
    
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateCardsData = (storeTrafficData, filteredVariables) => {
        // Calcular totalIn y totalOut sumando los datos correspondientes de todas las tiendas
        const totalIn = storeTrafficData.reduce((acc, store) => acc + store.totalIn, 0);
        const totalOut = storeTrafficData.reduce((acc, store) => acc + store.totalOut, 0);
    
        // Calcular el promedio de entradas (si es aplicable)
        const averageIn = storeTrafficData.length > 0 ? totalIn / storeTrafficData.length : 0;
    
        // Calcular la conversión total usando los Tickets totales de las variables filtradas
        const totalTickets = filteredVariables.reduce((acc, varData) => acc + varData.Tickets, 0);
        const conversionRate = totalIn > 0 ? (totalTickets / totalIn) * 100 : 0;  // Convertido a porcentaje
    
        return [
            { icon: Arrow_Up, title: "Total Entradas", value: totalIn.toLocaleString() },
            { icon: Arrow_Down, title: "Total Salidas", value: totalOut.toLocaleString() },
            { icon: Trending_Up, title: "Promedio Entradas", value: averageIn.toLocaleString() },
            { icon: Trending_Up, title: "Tasa de Conversión", value: `${conversionRate.toFixed(2)} %` }
        ];
    };

    const handleSearch = (newStartDate, newEndDate,selectedStore) => {
        setSelectStore(selectedStore)
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    return (
        <>
            <Filter onSearch={handleSearch} initialStartDate={startDate} initialEndDate={endDate} stores={storesList}/>
            {isLoading ? (
                <Loading />
            ) : (
                cardsData.length > 0 ? (
                    <>
                        <CardsHome cards={cardsData} />
                        <StoreTrafficBarChart data={storeTrafficData} title={"Entradas por tienda"} />
                    </>
                ) : (
                    <p>No hay datos disponibles</p>
                )
            )}
        </>
    );
}
