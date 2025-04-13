import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Wellness = () => {
  const [data, setData] = useState([
    { id: 1, nome: 'Giocatore 1', cognome: 'Cognome 1', soreness: 5, sleep: 8, fatigue: 6, stress: 3, drink: 7, food: 6, malato: false, results: [], data: '2025-04-11' },
    { id: 2, nome: 'Giocatore 2', cognome: 'Cognome 2', soreness: 3, sleep: 7, fatigue: 5, stress: 4, drink: 8, food: 5, malato: false, results: [], data: '2025-04-11' },
    // Aggiungi altri giocatori qui...
  ]);

  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [selectedPlayerForGraph, setSelectedPlayerForGraph] = useState(null);
  const [resultsList, setResultsList] = useState([]);

  const handleInputChange = (event, playerId, field) => {
    const newValue = event.target.value;
    setData(prevData =>
      prevData.map(player =>
        player.id === playerId ? { ...player, [field]: newValue } : player
      )
    );
  };

  const handleMalatoChange = (event, playerId) => {
    const isMalato = event.target.checked;
    setData(prevData =>
      prevData.map(player =>
        player.id === playerId ? { ...player, malato: isMalato } : player
      )
    );
  };

  const handleCheckboxChange = (playerId) => {
    setSelectedPlayers(prev => ({
      ...prev,
      [playerId]: !prev[playerId]
    }));
  };

  const handleGenerateResults = () => {
    const updatedResults = data
      .filter(player => selectedPlayers[player.id])
      .map(player => {
        const results = [
          player.soreness >= 7 ? 'rosso' : player.soreness <= 3 ? 'verde' : 'giallo',
          player.sleep >= 7 ? 'verde' : player.sleep <= 3 ? 'rosso' : 'giallo',
          player.fatigue >= 7 ? 'rosso' : player.fatigue <= 3 ? 'verde' : 'giallo',
          player.stress >= 7 ? 'rosso' : player.stress <= 3 ? 'verde' : 'giallo',
          player.drink >= 7 ? 'verde' : player.drink <= 3 ? 'rosso' : 'giallo',
          player.food >= 7 ? 'verde' : player.food <= 3 ? 'rosso' : 'giallo',
        ];
        return { ...player, results };
      });
    setResultsList(updatedResults);
  };

  const handlePlayerForGraphChange = (event) => {
    const playerId = event.target.value;
    const selectedPlayer = data.find(player => player.id === parseInt(playerId));
    setSelectedPlayerForGraph(selectedPlayer);
  };

  const individualGraphData = selectedPlayerForGraph && {
    labels: ['Soreness', 'Sleep', 'Fatigue', 'Stress', 'Drink', 'Food'],
    datasets: [
      {
        label: `${selectedPlayerForGraph.nome} ${selectedPlayerForGraph.cognome}`,
        data: [
          selectedPlayerForGraph.soreness,
          selectedPlayerForGraph.sleep,
          selectedPlayerForGraph.fatigue,
          selectedPlayerForGraph.stress,
          selectedPlayerForGraph.drink,
          selectedPlayerForGraph.food
        ],
        backgroundColor: Array(6).fill('#FFF9B0'),
      },
    ],
  };

  const selectedData = data.filter(player => selectedPlayers[player.id]);
  const teamGraphData = {
    labels: ['Soreness', 'Sleep', 'Fatigue', 'Stress', 'Drink', 'Food'],
    datasets: [
      {
        label: 'Media della Squadra',
        data: [
          selectedData.reduce((sum, player) => sum + parseInt(player.soreness), 0) / selectedData.length || 0,
          selectedData.reduce((sum, player) => sum + parseInt(player.sleep), 0) / selectedData.length || 0,
          selectedData.reduce((sum, player) => sum + parseInt(player.fatigue), 0) / selectedData.length || 0,
          selectedData.reduce((sum, player) => sum + parseInt(player.stress), 0) / selectedData.length || 0,
          selectedData.reduce((sum, player) => sum + parseInt(player.drink), 0) / selectedData.length || 0,
          selectedData.reduce((sum, player) => sum + parseInt(player.food), 0) / selectedData.length || 0,
        ],
        backgroundColor: Array(6).fill('#C8E6C9'),
      },
    ],
  };

  // Funzione per generare il quadrato colorato
  const getColorBox = (color) => {
    const colorMapping = {
      rosso: 'red',
      giallo: 'yellow',
      verde: 'green',
    };
    return <div style={{ width: '50px', height: '50px', backgroundColor: colorMapping[color], margin: '0 10px' }} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '80%', paddingRight: '20px' }}>
        <h2>Benessere dei Giocatori</h2>
        <table style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Mostra</th>
              <th>Data</th>
              <th>Giocatore</th>
              <th>Soreness</th>
              <th>Sleep</th>
              <th>Fatigue</th>
              <th>Stress</th>
              <th>Drink</th>
              <th>Food</th>
              <th>Malato</th>
            </tr>
          </thead>
          <tbody>
            {data.map(player => (
              <tr key={player.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selectedPlayers[player.id]}
                    onChange={() => handleCheckboxChange(player.id)}
                  />
                </td>
                <td>{player.data}</td>
                <td>{player.nome} {player.cognome}</td>
                <td><input type="number" value={player.soreness} onChange={(e) => handleInputChange(e, player.id, 'soreness')} min="1" max="10" /></td>
                <td><input type="number" value={player.sleep} onChange={(e) => handleInputChange(e, player.id, 'sleep')} min="1" max="10" /></td>
                <td><input type="number" value={player.fatigue} onChange={(e) => handleInputChange(e, player.id, 'fatigue')} min="1" max="10" /></td>
                <td><input type="number" value={player.stress} onChange={(e) => handleInputChange(e, player.id, 'stress')} min="1" max="10" /></td>
                <td><input type="number" value={player.drink} onChange={(e) => handleInputChange(e, player.id, 'drink')} min="1" max="10" /></td>
                <td><input type="number" value={player.food} onChange={(e) => handleInputChange(e, player.id, 'food')} min="1" max="10" /></td>
                <td><input type="checkbox" checked={player.malato} onChange={(e) => handleMalatoChange(e, player.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleGenerateResults}>Genera Risultati</button>

        <h3>Grafico Individuale</h3>
        <select onChange={handlePlayerForGraphChange}>
          <option value="">Seleziona un Giocatore</option>
          {data.map(player => (
            <option key={player.id} value={player.id}>
              {player.nome} {player.cognome}
            </option>
          ))}
        </select>

        {individualGraphData && <Bar data={individualGraphData} />}

        <h3>Grafico della Squadra</h3>
        <Bar data={teamGraphData} />

        {/* Risultati e quadrati colorati */}
        {resultsList.map((player) => (
          <div key={player.id} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h4>{player.nome} {player.cognome} - {player.data}</h4>
              {player.malato && <span style={{ color: 'red', marginLeft: '20px' }}>X</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <label>Soreness</label>
                {getColorBox(player.results[0])}
              </div>
              <div style={{ textAlign: 'center' }}>
                <label>Sleep</label>
                {getColorBox(player.results[1])}
              </div>
              <div style={{ textAlign: 'center' }}>
                <label>Fatigue</label>
                {getColorBox(player.results[2])}
              </div>
              <div style={{ textAlign: 'center' }}>
                <label>Stress</label>
                {getColorBox(player.results[3])}
              </div>
              <div style={{ textAlign: 'center' }}>
                <label>Drink</label>
                {getColorBox(player.results[4])}
              </div>
              <div style={{ textAlign: 'center' }}>
                <label>Food</label>
                {getColorBox(player.results[5])}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wellness;
