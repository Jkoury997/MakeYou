"use client";

import { useEffect, useState } from 'react';
import { timeDate } from "@/app/api/Interna/ircounter/analytics";
import CustomChart from "@/components/component/custom-chart";
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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [storesList, setStoresList] = useState([]);
  const [selectStore, setSelectStore] = useState("all");

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [startDate, endDate, selectStore]);

  const fetchData = async (startDate, endDate) => {
    setIsLoading(true);
    try {
      const stores = await StoreAll();
      setStoresList(stores);

      let trafficPromises = [];
      if (selectStore === "all") {
        trafficPromises = stores.map(store => timeDate(store.idStore, startDate, endDate));
      } else {
        trafficPromises = [timeDate(selectStore, startDate, endDate)];
      }

      const allTrafficData = await Promise.all(trafficPromises);
      if (allTrafficData.length > 0) {
        const labels = allTrafficData[0].map(data => data.date);
        const datasets = allTrafficData.map((trafficData, index) => {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return {
            label: stores[index] ? stores[index].name : 'Single Store',
            data: trafficData.map(data => data.totalIn),
            borderColor: `rgb(${r}, ${g}, ${b})`,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.8)`,
          };
        });
        setChartData({ labels, datasets });
      } else {
        setChartData({ labels: [], datasets: [] });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newStartDate, newEndDate, selectedStore) => {
    setSelectStore(selectedStore);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Entrada por día',
      },
    },
  };

  return (
    <>
      <Filter onSearch={handleSearch} initialStartDate={startDate} initialEndDate={endDate} stores={storesList} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CustomChart type="line" data={chartData} options={chartOptions} />
        </>
      )}
    </>
  );
}
