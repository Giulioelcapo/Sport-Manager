import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const calculateTL = (rpe, volume) => rpe * volume;

const calculateACWR = (tlArray, acuteWindow = 1, chronicWindow = 3) => {
  return tlArray.map((_, i) => {
    const acute = tlArray.slice(Math.max(0, i - acuteWindow + 1), i + 1);
    const chronic = tlArray.slice(Math.max(0, i - chronicWindow + 1), i + 1);
    const acuteAvg = acute.reduce((a, b) => a + b, 0) / acute.length || 1;
    const chronicAvg = chronic.reduce((a, b) => a + b, 0) / chronic.length || 1;
    return parseFloat((acuteAvg / chronicAvg).toFixed(2));
  });
};

const RPE = () => {
  const [data, setData] = useState([
    { player: 'Player 1', rpe: '', volume: '', date: '', present: false },
    { player: 'Player 2', rpe: '', volume: '', date: '', present: false },
    { player: 'Player 3', rpe: '', volume: '', date: '', present: false },
    { player: 'Player 4', rpe: '', volume: '', date: '', present: false },
    { player: 'Player 5', rpe: '', volume: '', date: '', present: false },
  ]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('Player 1');
  const [date, setDate] = useState('');
  const [sameDateForAll, setSameDateForAll] = useState(false);
  const [graphSelection, setGraphSelection] = useState('single'); // 'single' or 'weekly'

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    if (sameDateForAll) {
      setData(data.map((session) => ({ ...session, date: e.target.value })));
    }
  };

  const handleSameDateForAllChange = (e) => {
    setSameDateForAll(e.target.checked);
    if (e.target.checked) {
      setData(data.map((session) => ({ ...session, date })));
    }
  };

  const handleGraphSelectionChange = (e) => {
    setGraphSelection(e.target.value);
  };

  const handlePresenceChange = (index) => {
    const newData = [...data];
    newData[index].present = !newData[index].present;
    setData(newData);
  };

  const playerData = data.map(session => {
    const rpe = parseFloat(session.rpe) || 0;
    const volume = parseFloat(session.volume) || 0;
    return {
      player: session.player,
      rpe,
      volume,
      TL: calculateTL(rpe, volume),
    };
  });

  const tlValues = playerData.map(p => p.TL);
  const acwrValues = calculateACWR(tlValues);

  const chartData = {
    labels: playerData.map((s) => s.player),
    datasets: [
      {
        label: 'Training Load (TL)',
        data: tlValues,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'ACWR',
        data: acwrValues,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const calculateTeamAverage = () => {
    const avgTL = tlValues.reduce((sum, tl) => sum + tl, 0) / tlValues.length;
    const avgACWR = acwrValues.reduce((sum, acwr) => sum + acwr, 0) / acwrValues.length;
    return { avgTL, avgACWR };
  };

  const teamAverage = calculateTeamAverage();

  const trainingDates = ['2025-04-01', '2025-04-03', '2025-04-06', '2025-04-09', '2025-04-12']; // Example dates for training sessions

  return (
    <div style={{ padding: '20px' }}>
      <h2>Monitoraggio Allenamento Giocatori</h2>

      {/* Selettore giocatore sopra il grafico allenamento */}
      <div style={{ marginBottom: '20px' }}>
        <label>Seleziona Giocatore: </label>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {data.map((session, index) => (
            <option key={index} value={session.player}>
              {session.player}
            </option>
          ))}
        </select>
      </div>

      {/* Selezione data */}
      <div style={{ marginBottom: '20px' }}>
        <label>Data: </label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <label>
          <input
            type="checkbox"
            checked={sameDateForAll}
            onChange={handleSameDateForAllChange}
          />
          Stessa data per tutti
        </label>
      </div>

      {/* Elenco giocatori con input RPE, Volume e Presenza */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Inserisci Dati Allenamento</h3>
        {data.map((session, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div>{session.player}</div>
            <input
              type="number"
              placeholder="RPE"
              value={session.rpe}
              onChange={(e) => handleInputChange(index, 'rpe', e.target.value)}
              style={{
                marginRight: '10px',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <input
              type="number"
              placeholder="Volume"
              value={session.volume}
              onChange={(e) => handleInputChange(index, 'volume', e.target.value)}
              style={{
                marginRight: '10px',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <label>
              <input
                type="checkbox"
                checked={session.present}
                onChange={() => handlePresenceChange(index)}
              />
              Presente
            </label>
          </div>
        ))}
      </div>

      {/* Conferma */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleConfirm}>
          {isConfirmed ? 'Confermato' : 'Conferma'}
        </button>
      </div>

      {/* Risultati: mostra solo per giocatori presenti */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Risultati Giocatori</h3>
        {data
          .filter(session => session.present) // Solo giocatori presenti
          .map((session, index) => {
            const rpe = parseFloat(session.rpe) || 0;
            const volume = parseFloat(session.volume) || 0;
            const TL = calculateTL(rpe, volume);
            const ACWR = calculateACWR([TL])[0]; // Calcolo ACWR per il singolo giocatore
            return (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div>{session.player}</div>
                <div>RPE: {rpe}</div>
                <div>Volume: {volume}</div>
                <div>TL: {TL}</div>
                <div>ACWR: {ACWR}</div>
              </div>
            );
          })}
      </div>

      {/* Grafico Allenamento Giocatore */}
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <h3>Grafico Allenamento Giocatore</h3>
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      {/* Grafico Media Squadra */}
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <h3>Grafico Media Squadra</h3>
        <div style={{ width: '300px', height: '450px' }}>
          <Line
            data={{
              labels: trainingDates,
              datasets: [
                {
                  label: 'Media TL Squadra',
                  data: Array(trainingDates.length).fill(teamAverage.avgTL),
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                  tension: 0.3,
                },
                {
                  label: 'Media ACWR Squadra',
                  data: Array(trainingDates.length).fill(teamAverage.avgACWR),
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default RPE;
