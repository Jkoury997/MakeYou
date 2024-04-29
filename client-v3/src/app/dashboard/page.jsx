"use client"

import { useState, useEffect } from "react";
import { CardsHome } from "@/components/component/cards-home";
import { searchAdvanced } from "../api/Interna/ircounter/countdata";
import { Arrow_Up, Arrow_Down, Trending_Up } from '@/components/ui/icons';
import { FilterDate } from "@/components/component/filter-date";
import { StoreAll } from "../api/Interna/ircounter/store";
import { variables } from "../api/Externa/leona/consultaTiendas";
import { Loading } from "@/components/component/loading";

export default function Page() {
    const [cardsData, setCardsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const today = new Date();
        fetchData(today, today);
    }, []);

    const fetchData = async (startDate, endDate) => {
        setIsLoading(true);
        try {
            const [response, stores, variablesResponse] = await Promise.all([
                searchAdvanced({ startDate, endDate }),
                StoreAll(),
                variables(startDate, endDate)
            ]);

            const storeNames = new Set(stores.map(store => store.name));
            const filteredVariables = variablesResponse.Variables.filter(variable => storeNames.has(variable.Tienda));

            const totalTickets = filteredVariables.reduce((acc, variable) => acc + variable.Tickets, 0);
            const cards = calculateCardsData(response, filteredVariables, totalTickets);
            setCardsData(cards);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCardsData([]);
            // Optionally update state to show error message in UI
        }finally{
            setIsLoading(false);
        }
    };

    const calculateCardsData = (response, filteredVariables, totalTickets) => {
        const totalInCount = response.reduce((acc, curr) => acc + (curr.inCount || 0), 0);
        const conversion = totalTickets / totalInCount;
        const cantSN = new Set(response.map(item => item.sn)).size;

        return [
            {
                icon: Arrow_Up,
                title: "Entran",
                value: totalInCount.toLocaleString()
            },
            {
                icon: Arrow_Down,
                title: "Salen",
                value: response.reduce((acc, curr) => acc + (curr.outCount || 0), 0).toLocaleString()
            },
            {
                icon: Trending_Up,
                title: `Promedio (${cantSN})`,
                value: (totalInCount / cantSN).toLocaleString()
            },
            {
                icon: Trending_Up,
                title: "Conversión Global",
                value: `${(conversion * 100).toFixed(2)} %`
            }
        ];
    };

    const handleSearch = (start, end) => {
        fetchData(start, end);
    };

    

    return (
        <>
            <FilterDate onSearch={handleSearch} />
            <>
                {isLoading ? (
                    <Loading /> // Muestra el spinner mientras carga los datos
                ) : (
                    cardsData.length > 0 ? (
                        <CardsHome cards={cardsData} />
                    ) : (
                        <p>No hay datos disponibles</p>
                    )
                )}
            </>
            
        </>
    );
}
