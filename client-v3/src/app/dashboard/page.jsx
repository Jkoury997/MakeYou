"use client"

import { useState, useEffect } from "react";
import { StoreAll } from "../api/Interna/ircounter/store";
import { variables } from "../api/Externa/leona/consultaTiendas";
import { Loading } from "@/components/component/loading";
import { CardsHome } from "@/components/component/cards-home";
import CustomChart from "@/components/component/custom-chart";
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
    const fetchData = async (startDate, endDate) => {
      setIsLoading(true);
      try {
        const stores = await StoreAll();
        setStoresList(stores);

        const variableData = await variables(startDate, endDate);
        console.log('Stores:', stores);
        console.log('Variable data:', variableData);

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
          ...stores.find(store => store.idStore === stat.idStore),
          totalIn: stat.totalIn,
          totalOut: stat.totalOut
        }));

        const storeTrafficDataBar = statsResults.map(stat => ({
          store: stat.name,
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

    fetchData(startDate, endDate);
  }, [startDate, endDate, selectStore]);

  const calculateCardsData = (storeTrafficData, filteredVariables) => {
    const totalIn = storeTrafficData.reduce((acc, store) => acc + store.totalIn, 0);
    const totalOut = storeTrafficData.reduce((acc, store) => acc + store.totalOut, 0);
    const averageIn = storeTrafficData.length > 0 ? totalIn / storeTrafficData.length : 0;
    const totalTickets = filteredVariables.reduce((acc, varData) => acc + varData.Tickets, 0);
    const conversionRate = totalIn > 0 ? (totalTickets / totalIn) * 100 : 0;

    return [
      { icon: Arrow_Up, title: "Total Entradas", value: totalIn.toLocaleString() },
      { icon: Arrow_Down, title: "Total Salidas", value: totalOut.toLocaleString() },
      { icon: Trending_Up, title: "Promedio Entradas", value: averageIn.toLocaleString() },
      { icon: Trending_Up, title: "Tasa de Conversión", value: `${conversionRate.toFixed(2)} %` }
    ];
  };

  const handleSearch = (newStartDate, newEndDate, selectedStore) => {
    setSelectStore(selectedStore);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const chartOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Entradas por tienda",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      }
    },
  };

  const generateBarColors = (data) => {
    return data.map(() => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const borderColor = `rgb(${r}, ${g}, ${b})`;
      const backgroundColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
      return { borderColor, backgroundColor };
    });
  };

  const barColors = generateBarColors(storeTrafficData);

  const chartData = {
    labels: storeTrafficData.map(item => item.store),
    datasets: [
      {
        label: 'Entradas',
        data: storeTrafficData.map(item => item.totalIn),
        borderColor: barColors.map(color => color.borderColor),
        backgroundColor: barColors.map(color => color.backgroundColor),
        barThickness: 24,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      }
    ],
  };

  return (
    <>
      <Filter onSearch={handleSearch} initialStartDate={startDate} initialEndDate={endDate} stores={storesList} />
      {isLoading ? (
        <Loading />
      ) : (
        cardsData.length > 0 ? (
          <>
            <CardsHome cards={cardsData} />
            <CustomChart type="bar" data={chartData} options={chartOptions} />
          </>
        ) : (
          <p>No hay datos disponibles</p>
        )
      )}
    </>
  );
}
