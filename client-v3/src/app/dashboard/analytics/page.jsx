"use client";

import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Loading } from '@/components/component/loading';
import { Filter } from '@/components/component/filter';
import CustomChart from '@/components/component/custom-chart';
import { DataViewToggle } from '@/components/component/data-view-toggle';
import { StoreAll } from '@/app/api/Interna/ircounter/store';
import { prepareDataDay, prepareDataHour, prepareDataRange } from '@/app/api/Interna/ircounter/analytics';


const MIN_IN_COUNT = 1;
const MAX_IN_COUNT = 38;

const denormalizeInCount = (normalizedValue) => {
  return normalizedValue * (MAX_IN_COUNT - MIN_IN_COUNT) + MIN_IN_COUNT;
};

export default function Page() {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [storesList, setStoresList] = useState([]);
  const [selectedStore, setSelectedStore] = useState("S0027");
  const [chartData, setChartData] = useState({});
  const [predictedData, setPredictedData] = useState({ labels: [], datasets: [] });
  const [view, setView] = useState("hour");
  const [model, setModel] = useState(null);


  useEffect(() => {
    fetchStores();
    loadModel();
  }, []);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, selectedStore, view]);

  const fetchStores = async () => {
    setIsLoading(true);
    try {
      const data = await StoreAll();
      setStoresList(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadModel = async () => {
    try {
      const loadedModel = await tf.loadLayersModel('/model/model.json');
      setModel(loadedModel);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try { 
      const start = startDate
      const end = endDate;

      const url = view === "hour" 
        ? await prepareDataHour(selectedStore,start,end)
        : await prepareDataDay(selectedStore,start,end);
      
      const response = await fetch(url);
      const data = await response.json();

      // Verificar los datos recibidos
      console.log("Datos recibidos de la API:", data);
      
      // Añadir valores ficticios para inCount y outCount si no están presentes
      const enrichedData = data.map(item => ({
        ...item,
        inCount: item.inCount !== undefined ? item.inCount : 0,  // Valor ficticio si no está definido
        outCount: item.outCount !== undefined ? item.outCount : 0  // Valor ficticio si no está definido
      }));

      const aggregatedData = view === "day" ? aggregateDataByDay(enrichedData) : enrichedData;

      const formattedData = formatChartData(aggregatedData);
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const aggregateDataByDay = (data) => {
    const aggregated = data.reduce((acc, item) => {
      const date = item.date.split('T')[0]; // Only keep the date part
      if (!acc[date]) {
        acc[date] = { date, inCount: 0, outCount: 0 };
      }
      acc[date].inCount += item.inCount;
      acc[date].outCount += item.outCount;
      return acc;
    }, {});

    return Object.values(aggregated);
  };

  const fetchDataPredict = async () => {
    setIsLoading(true);
    try {
      const start = startDate;
      // Extender endDate por 7 días adicionales
      const extendedEndDate = new Date(endDate);
      const end = extendedEndDate.setDate(extendedEndDate.getDate() + 7);

      const data = await prepareDataRange(selectedStore,start,end);
      if (model) {
        const predictions = makePredictions(data);
        const aggregatedPredictions = view === "day" ? aggregatePredictionsByDay(predictions) : predictions;
        const formattedPredictedData = formatPredictedData(aggregatedPredictions);
        setPredictedData(formattedPredictedData);
        const combinedData = combineChartData(chartData, formattedPredictedData);
        setChartData(combinedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const makePredictions = (data) => {
    const inputs = data.map(item => [
      item.hour,
      item.isWeekend,
      item.isWeekday,
      item.isStartOfMonth,
      item.isEndOfMonth,
      item.dayOfWeek,
      item.weekOfYear,
      item.quarter,
      item.isHoliday,
      item.month,
    ]);

    const inputTensor = tf.tensor2d(inputs);
    const predictionsTensor = model.predict(inputTensor);
    const predictions = predictionsTensor.dataSync();
    
    return data.map((item, index) => ({
      ...item,
      predictedInCount:predictions[index]
    }));
  };

  const aggregatePredictionsByDay = (data) => {
    const aggregated = data.reduce((acc, item) => {
      const date = item.date.split('T')[0]; // Only keep the date part
      if (!acc[date]) {
        acc[date] = { date, predictedInCount: 0 };
      }
      acc[date].predictedInCount += item.predictedInCount;
      return acc;
    }, {});

    return Object.values(aggregated);
  };

  const formatChartData = (data) => {
    const labels = view === "hour"
      ? data.map(item => new Date(item.date).toLocaleString()) // Include time in the label
      : data.map(item => item.date.split('T')[0]); // Only date

    const inCounts = data.map(item => item.inCount);
    const outCounts = data.map(item => item.outCount);

    return {
      labels,
      datasets: [
        {
          label: 'In Count',
          data: inCounts,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
        },
        {
          label: 'Out Count',
          data: outCounts,
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.2)',
        }
      ]
    };
  };

  const formatPredictedData = (data) => {
    const labels = view === "hour"
      ? data.map(item => new Date(item.date).toLocaleString()) // Include time in the label
      : data.map(item => item.date.split('T')[0]); // Only date

    const predictedInCounts = data.map(item => item.predictedInCount);

    return {
      labels,
      datasets: [
        {
          label: 'Predicted In Count',
          data: predictedInCounts,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }
      ]
    };
  };

  const combineChartData = (chartData, predictedData) => {
    if (!chartData || !predictedData || !predictedData.datasets) {
      return chartData;
    }

    const combinedDatasets = [...chartData.datasets, ...predictedData.datasets];
    const combinedLabels = [...new Set([...chartData.labels, ...predictedData.labels])];

    return {
      labels: combinedLabels,
      datasets: combinedDatasets
    };
  };

  const handleSearch = (start, end, store) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedStore(store);
    fetchData();
  };

  const handlePredict = () => {
    fetchDataPredict();
  };

  return (
    <>
      <Filter onSearch={handleSearch} initialStartDate={startDate} initialEndDate={endDate} stores={storesList} />
      <DataViewToggle view={view} setView={setView} />
      <button onClick={handlePredict}>Predict</button>
      {isLoading && <Loading />}
      {!isLoading && chartData.labels && chartData.labels.length > 0 && (
        <CustomChart type="line" data={chartData} options={{ responsive: true }} />
      )}
    </>
  );
}
