import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GiocatoriPage.css';
import { Trash2 } from 'lucide-react';

const GiocatoriPage = () => {
  const [giocatori, setGiocatori] = useState([]);
  const [formData, setFormData] = useState({
    nomeGiocatore: '',
    cognomeGiocatore: '',
    posizione: '',
    nazionalita: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddGiocatore = () => {
    const { nomeGiocatore, cognomeGiocatore, posizione, nazionalita } = formData;
    if (nomeGiocatore && cognomeGiocatore && posizione && nazionalita) {
      setGiocatori([...giocatori, formData]);
      setFormData({
        nomeGiocatore: '',
        cognomeGiocatore: '',
        posizione: '',
        nazionalita: '',
      });
    }
  };

  const handleDelete = (index) => {
    const updated = [...giocatori];
    updated.splice(index, 1);
    setGiocatori(updated);
  };

  return (
    <div className="giocatori-page">
      {/* Header con bottone Home */}
      <div className="header">
        <h2>Inserisci Giocatori</h2>
        <Link to="/" className="home-button">Home</Link>
      </div>

      <div className="giocatori-container">
        <div className="form-container">
          <input
            name="nomeGiocatore"
            placeholder="Nome"
            value={formData.nomeGiocatore}
            onChange={handleChange}
          />
          <input
            name="cognomeGiocatore"
            placeholder="Cognome"
            value={formData.cognomeGiocatore}
            onChange={handleChange}
          />
          <input
            name="posizione"
            placeholder="Posizione"
            value={formData.posizione}
            onChange={handleChange}
          />
          <input
            name="nazionalita"
            placeholder="Nazionalità"
            value={formData.nazionalita}
            onChange={handleChange}
          />
          <button className="add-button" onClick={handleAddGiocatore}>Aggiungi</button>
        </div>

        <div className="lista-giocatori">
          {giocatori.map((giocatore, index) => (
            <div className="giocatore-row" key={index}>
              <span>{giocatore.nomeGiocatore}</span>
              <span>{giocatore.cognomeGiocatore}</span>
              <span>{giocatore.posizione}</span>
              <span>{giocatore.nazionalita}</span>
              <button className="delete-button" onClick={() => handleDelete(index)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiocatoriPage;
