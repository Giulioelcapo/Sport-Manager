import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registriamo i componenti necessari per il grafico
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PlayerChart = ({ playerData }) => {
  // Dati per il grafico
  const chartData = {
    labels: playerData.map((session) => session.date),
    datasets: [
      {
        label: 'Training Load (TL)',
        data: playerData.map((session) => session.player1RPE * session.player1Volume),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'ACWR',
        data: playerData.map((session) => session.player1RPE * session.player1Volume), // Placeholder per ACWR
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Grafico del Giocatore</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PlayerChart;
