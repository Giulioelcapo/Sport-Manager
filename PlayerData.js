import React, { useState } from 'react';

const PlayerData = ({ onSelectPlayer }) => {
  const [data, setData] = useState([
    { date: '2025-01-01', player1RPE: 7, player1Volume: 60, player2RPE: 8, player2Volume: 55 },
    { date: '2025-01-02', player1RPE: 6, player1Volume: 65, player2RPE: 7, player2Volume: 50 },
    // Aggiungi altre sessioni di allenamento
  ]);

  // Funzione per calcolare il Training Load (TL)
  const calculateTL = (rpe, volume) => {
    return rpe * volume;
  };

  // Funzione per calcolare ACWR
  const calculateACWR = (playerTLs, lastWeekTL) => {
    const totalLast3Weeks = playerTLs.slice(-3).reduce((acc, val) => acc + val, 0);
    const totalLastWeek = playerTLs.slice(-1).reduce((acc, val) => acc + val, 0);
    return totalLast3Weeks / totalLastWeek;
  };

  // Passiamo i dati ai genitori quando un giocatore viene selezionato
  const handleSelectPlayer = (player) => {
    onSelectPlayer(data.filter((session) => session.player1RPE === player));
  };

  return (
    <div>
      <h2>Sessioni di Allenamento</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Giocatore 1 RPE</th>
            <th>Giocatore 1 Volume</th>
            <th>Giocatore 1 TL</th>
            <th>Giocatore 2 RPE</th>
            <th>Giocatore 2 Volume</th>
            <th>Giocatore 2 TL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((session, index) => (
            <tr key={index}>
              <td>{session.date}</td>
              <td>{session.player1RPE}</td>
              <td>{session.player1Volume}</td>
              <td>{calculateTL(session.player1RPE, session.player1Volume)}</td>
              <td>{session.player2RPE}</td>
              <td>{session.player2Volume}</td>
              <td>{calculateTL(session.player2RPE, session.player2Volume)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleSelectPlayer(1)}>Seleziona Giocatore 1</button>
      <button onClick={() => handleSelectPlayer(2)}>Seleziona Giocatore 2</button>
    </div>
  );
};

export default PlayerData;
