import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
      },
      title: {
        display: true,
        text: title, // Título del gráfico
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day', // Ajusta esto según el modo de vista, podría ser 'hour', 'day', 'week'
        },
      },
    },
  };

  // Prepara los datos para el gráfico
  const chartData = {
    labels: data.labels, // Etiquetas para el eje X, por ejemplo, días
    datasets: data.datasets.map(dataset => ({
      label: dataset.label, // Nombre del conjunto de datos
      data: dataset.data, // Ventas por día para ese conjunto de datos
      borderColor: dataset.borderColor, // Color de la línea
      backgroundColor: dataset.backgroundColor,
    })),
  };

  return <Line options={options} data={chartData} />;
};