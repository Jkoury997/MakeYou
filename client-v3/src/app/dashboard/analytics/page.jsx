"use client"

import { LineChart } from "@/components/component/LineChart";

export default function Page() {
    const chartData = {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [
          { name: 'Tienda 1', sales: [5, 20, 30, 10, 40], color: 'rgba(255, 99, 132, 1)' },
          { name: 'Tienda 2', sales: [15, 25, 10, 35, 30], color: 'rgba(54, 162, 235, 1)' },
          { name: 'Tienda 3', sales: [10, 5, 20, 30, 15], color: 'rgba(75, 192, 192, 1)' },
        ],
      };

    return (
        <div>
            <h2>Traffic Analysis</h2>
            <LineChart data={chartData}></LineChart>
        </div>
    );
};