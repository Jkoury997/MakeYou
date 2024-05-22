// CustomChart.js
import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Importa el adaptador de fecha

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  TimeScale
);

const chartComponents = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
};

const CustomChart = ({ type = 'bar', data, options }) => {
  const ChartComponent = chartComponents[type];

  if (!ChartComponent) {
    return <div>Invalid chart type</div>;
  }

  return <ChartComponent data={data} options={options} />;
};

export default CustomChart;
