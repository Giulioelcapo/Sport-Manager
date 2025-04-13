import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'react-feather';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TestFisiciPage = () => {
  const [dati, setDati] = useState([]);
  const [giocatore1, setGiocatore1] = useState(null);
  const [giocatore2, setGiocatore2] = useState(null);
  const [mediaSquadra, setMediaSquadra] = useState([10, 15, 4]);
  const [editingData, setEditingData] = useState(null); // Stato per la modifica dei dati
  const navigate = useNavigate();

  const handleAddData = (newData) => {
    setDati([...dati, newData]);
  };

  const handleDeleteData = (index) => {
    setDati(dati.filter((_, i) => i !== index));
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleGiocatore1Select = (event) => {
    setGiocatore1(event.target.value);
  };

  const handleGiocatore2Select = (event) => {
    setGiocatore2(event.target.value);
  };

  const getPlayerData = (giocatore) => {
    if (!giocatore) return [0, 0, 0, 0];
    const player = dati.find((data) => data.nome === giocatore);
    return player ? [parseInt(player.sprint10m), parseInt(player.sprint30m), parseInt(player.SJ), parseInt(player.CMJ)] : [0, 0, 0, 0];
  };

  const grafico1Data = {
    labels: ['Sprint 10m', 'Sprint 30m', 'SJ', 'CMJ'],
    datasets: [
      {
        label: 'Giocatore Selezionato',
        data: getPlayerData(giocatore1),
        backgroundColor: 'rgba(255, 182, 193, 0.6)',
      },
    ],
  };

  const grafico2Data = {
    labels: ['Sprint 10m', 'Sprint 30m', 'SJ', 'CMJ'],
    datasets: [
      {
        label: 'Giocatore 1',
        data: getPlayerData(giocatore1),
        backgroundColor: 'rgba(255, 182, 193, 0.6)',
      },
      {
        label: 'Giocatore 2',
        data: getPlayerData(giocatore2),
        backgroundColor: 'rgba(173, 216, 230, 0.6)',
      },
    ],
  };

  const grafico3Data = {
    labels: ['Sprint 10m', 'Sprint 30m', 'SJ', 'CMJ'],
    datasets: [
      {
        label: 'Giocatore Selezionato',
        data: getPlayerData(giocatore1),
        backgroundColor: 'rgba(255, 182, 193, 0.6)',
      },
      {
        label: 'Media Squadra',
        data: mediaSquadra,
        backgroundColor: 'rgba(144, 238, 144, 0.6)',
      },
    ],
  };

  const handleConfronto = () => {
    if (!giocatore1) {
      alert("Seleziona un giocatore per il confronto!");
      return;
    }
    const dataGiocatore = getPlayerData(giocatore1);
    alert(`Confronto tra il giocatore ${giocatore1} e la media della squadra: \n
      Sprint 10m: Giocatore ${dataGiocatore[0]} - Media ${mediaSquadra[0]} \n
      Sprint 30m: Giocatore ${dataGiocatore[1]} - Media ${mediaSquadra[1]} \n
      SJ: Giocatore ${dataGiocatore[2]} - Media ${mediaSquadra[2]} \n
      CMJ: Giocatore ${dataGiocatore[3]} - Media ${mediaSquadra[3]}`);
  };

  const handleEditData = (data) => {
    setEditingData(data);
  };

  const handleUpdateData = (e) => {
    e.preventDefault();
    const updatedData = {
      nome: e.target.nome.value,
      data: e.target.data.value,
      sprint10m: e.target.sprint10m.value,
      sprint30m: e.target.sprint30m.value,
      SJ: e.target.SJ.value,
      CMJ: e.target.CMJ.value,
    };
    setDati(dati.map((d) => (d.nome === editingData.nome ? updatedData : d)));
    setEditingData(null);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>
      <button onClick={handleHomeClick} style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#007BFF', color: 'white', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Home</button>

      {/* Modulo di inserimento dati */}
      <div style={{ margin: '40px auto', width: '80%', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Inserisci Dati Giocatore</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            const newData = {
              nome: e.target.nome.value,
              data: e.target.data.value,
              sprint10m: e.target.sprint10m.value,
              sprint30m: e.target.sprint30m.value,
              SJ: e.target.SJ.value,
              CMJ: e.target.CMJ.value,
            };
            handleAddData(newData);
          }} 
          style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
          <input type="date" name="data" placeholder="Data Test" required style={inputStyle} />
          <input type="text" name="nome" placeholder="Nome Giocatore" required style={inputStyle} />
          <input type="number" name="sprint10m" placeholder="Sprint 10m" required style={inputStyle} />
          <input type="number" name="sprint30m" placeholder="Sprint 30m" required style={inputStyle} />
          <input type="number" name="SJ" placeholder="SJ" required style={inputStyle} />
          <input type="number" name="CMJ" placeholder="CMJ" required style={inputStyle} />
          <button type="submit" style={buttonStyle}>Aggiungi Dati</button>
        </form>
      </div>

      {/* Selettori per i giocatori */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <select onChange={handleGiocatore1Select} value={giocatore1} style={selectStyle}>
          <option value={null}>Seleziona Giocatore 1</option>
          {dati.map((data, index) => (
            <option key={index} value={data.nome}>{data.nome}</option>
          ))}
        </select>
        <select onChange={handleGiocatore2Select} value={giocatore2} style={selectStyle}>
          <option value={null}>Seleziona Giocatore 2</option>
          {dati.map((data, index) => (
            <option key={index} value={data.nome}>{data.nome}</option>
          ))}
        </select>
        <button onClick={handleConfronto} style={buttonStyle}>Confronta Giocatore con Media Squadra</button>
      </div>

      {/* Grafici */}
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginTop: '50px' }}>
        <div style={{ width: '30%' }}>
          <h3>Grafico 1: Giocatore Selezionato</h3>
          <Bar data={grafico1Data} />
        </div>
        <div style={{ width: '30%' }}>
          <h3>Grafico 2: Confronto tra Giocatori</h3>
          <Bar data={grafico2Data} />
        </div>
        <div style={{ width: '30%' }}>
          <h3>Grafico 3: Confronto Giocatore con Media Squadra</h3>
          <Bar data={grafico3Data} />
        </div>
      </div>

      {/* Lista Dati */}
      <div style={{ marginTop: '50px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' }}>
        <h3>Dati dei Giocatori</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Sprint 10m</th>
              <th>Sprint 30m</th>
              <th>SJ</th>
              <th>CMJ</th>
              <th>Modifica</th>
              <th>Elimina</th>
            </tr>
          </thead>
          <tbody>
            {dati.map((data, index) => (
              <tr key={index}>
                <td>{data.nome}</td>
                <td>{data.data}</td>
                <td>{data.sprint10m}</td>
                <td>{data.sprint30m}</td>
                <td>{data.SJ}</td>
                <td>{data.CMJ}</td>
                <td><button onClick={() => handleEditData(data)} style={buttonStyle}>Modifica</button></td>
                <td><button onClick={() => handleDeleteData(index)} style={trashButtonStyle}><Trash2 /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modifica Dati */}
      {editingData && (
        <div style={{ marginTop: '30px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' }}>
          <h3>Modifica Dati Giocatore</h3>
          <form onSubmit={handleUpdateData} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
            <input type="date" name="data" defaultValue={editingData.data} required style={inputStyle} />
            <input type="text" name="nome" defaultValue={editingData.nome} required style={inputStyle} />
            <input type="number" name="sprint10m" defaultValue={editingData.sprint10m} required style={inputStyle} />
            <input type="number" name="sprint30m" defaultValue={editingData.sprint30m} required style={inputStyle} />
            <input type="number" name="SJ" defaultValue={editingData.SJ} required style={inputStyle} />
            <input type="number" name="CMJ" defaultValue={editingData.CMJ} required style={inputStyle} />
            <button type="submit" style={buttonStyle}>Aggiorna Dati</button>
          </form>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  fontSize: '14px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
};

const selectStyle = {
  padding: '10px',
  fontSize: '14px',
  borderRadius: '8px',
  border: '1px solid #ddd',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  borderRadius: '10px',
};

const trashButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'red',
};

export default TestFisiciPage;
