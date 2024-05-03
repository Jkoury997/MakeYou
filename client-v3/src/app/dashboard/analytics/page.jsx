"use client"

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

export default function Page() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/ircounter/api/analytics/statistics/time?idStore=S0027&startDate=2024-04-27&endDate=2024-04-27`);
            console.log(response.data)
            setChartData(transformDataForChart(response.data));
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        Chart.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend
        );
    
        fetchData();
    }, []);


    const transformDataForChart = (data) => {
        if (!data || data.length === 0) {
            return { labels: [], datasets: [] };
        }
        return {
            labels: data.map(item => item.time),
            datasets: [{
                label: 'Total In',
                data: data.map(item => item.totalIn),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }, {
                label: 'Total Out',
                data: data.map(item => item.totalOut),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            }]
        };
    };

    return (
        <div>
            <h2>Traffic Analysis</h2>
            <Bar data={chartData} />
        </div>
    );
};