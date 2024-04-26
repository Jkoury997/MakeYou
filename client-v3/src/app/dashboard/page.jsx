"use client"
import { useState,useEffect } from "react";
import { CardsHome } from "@/components/component/cards-home";
import {searchAdvanced} from "../api/ircounter/countdata"
import { Arrow_Up, Arrow_Down } from '@/components/ui/icons';
import {FilterDate} from "@/components/component/filter-date"


export default function Page() {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        const today = new Date();
        fetchData(today, today);
    }, []);
    

    // La función fetchData solicita datos basándose en las fechas proporcionadas.
    const fetchData = async (startDate, endDate) => {
        try {
            const response = await searchAdvanced({ startDate, endDate });
            if (response && response.length > 0) {
                const cards = [
                    {
                        icon: Arrow_Up,
                        title: "Entran",
                        value: response.reduce((acc, curr) => acc + (curr.inCount || 0), 0).toLocaleString()
                    },
                    {
                        icon: Arrow_Down,
                        title: "Salen",
                        value: response.reduce((acc, curr) => acc + (curr.outCount || 0), 0).toLocaleString()
                    },
                    // Agrega más tarjetas según sea necesario
                ];
                setCardsData(cards);
            } else {
                console.log("No data found matching the criteria.");
                setCardsData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setCardsData([]);
        }
    };

    // handleDateChange se llama cuando se presiona el botón de buscar en FilterDate.
    const handleSearch = (start, end) => {
        // Convertir las fechas a formato ISO String para la consulta API.
        const startDate = start;
        const endDate = end;
        console.log(startDate)
        fetchData(startDate,endDate)
    };

    return (
        <>
            <FilterDate onSearch={handleSearch} />
            <CardsHome cards={cardsData} />
        </>
    );
}