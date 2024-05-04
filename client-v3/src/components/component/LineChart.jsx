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

export const LineChart = ({ data,title }) => {
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
  };

  // Prepara los datos para el gráfico
  const chartData = {
    labels: data.labels, // Etiquetas para el eje X, por ejemplo, días
    datasets: data.datasets.map(store => ({
      label: store.name, // Nombre de la tienda
      data: store.sales, // Ventas por día para esa tienda
      borderColor: store.color, // Color de la línea
      backgroundColor: store.color,
    })),
  };

  return <Line options={options} data={chartData} />;
};
