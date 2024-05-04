import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const StoreTrafficBarChart = ({ data,title }) => {
  const options = {
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
        text: title,
      },
    },
    scales: {
      x: {
        stacked: true, // Opcional, para apilar si es necesario
      },
      y: {
        stacked: true, // Opcional, para apilar si es necesario
      }
    },
  };

  // Función para generar colores para el borde y el fondo con control de opacidad para el fondo
  const generateBarColors = () => {
    return data.map(() => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const borderColor = `rgb(${r}, ${g}, ${b})`; // Color sólido para el borde
      const backgroundColor = `rgba(${r}, ${g}, ${b}, 0.8)`; // Color con opacidad para el fondo
      return { borderColor, backgroundColor };
    });
  };

  const barColors = generateBarColors();
  
  const chartData = {
    labels: data.map(item => item.store),
    datasets: [
      {
        label: 'Entradas',
        data: data.map(item => item.totalIn),
        borderColor: barColors.map(color => color.borderColor),
        backgroundColor: barColors.map(color => color.backgroundColor),
        barThickness: 24,
        categoryPercentage: 0.8, // Ajusta este valor para controlar el espacio entre categorías
        barPercentage: 0.9,

      }
    ],
  };

  return <Bar options={options} data={chartData} />;
};
