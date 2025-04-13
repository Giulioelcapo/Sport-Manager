import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dati per i programmi di allenamento divisi in categorie
const programmi = [
  {
    nome: 'Mobilità',
    esercizi: [
      {
        nome: 'Stretching del Collo',
        video: 'https://www.youtube.com/watch?v=Tk0zzQhYb44',
        reps: '30 sec per lato',
        set: '3',
      },
      {
        nome: 'Rotazioni delle Spalle',
        video: 'https://www.youtube.com/watch?v=xl3nqdt6jUo',
        reps: '10-12',
        set: '3',
      },
      {
        nome: 'Allungamento dei Flessori dell’Anca',
        video: 'https://www.youtube.com/watch?v=7P0hmd5K2QI',
        reps: '30 sec per lato',
        set: '3',
      },
    ],
  },
  {
    nome: 'Prehab',
    esercizi: [
      {
        nome: 'Sollevamento Laterale con Band',
        video: 'https://www.youtube.com/watch?v=fg5QOFA_4cQ',
        reps: '12-15',
        set: '3',
      },
      {
        nome: 'Bridge Gluteo',
        video: 'https://www.youtube.com/watch?v=OytgY3jXzmI',
        reps: '12-15',
        set: '3',
      },
      {
        nome: 'Rotazioni del Tronco con Band',
        video: 'https://www.youtube.com/watch?v=9J24Cq1rEyE',
        reps: '12-15',
        set: '3',
      },
    ],
  },
  {
    nome: 'Speed',
    esercizi: [
      {
        nome: 'Sprint a Massima Velocità',
        video: 'https://www.youtube.com/watch?v=HP0fnsJ2VhY',
        reps: '6 x 20m',
        set: '4',
      },
      {
        nome: 'High Knees Sprint',
        video: 'https://www.youtube.com/watch?v=dl0X7p1OxCk',
        reps: '30 sec',
        set: '4',
      },
      {
        nome: 'Sprint con Partenza da Fermo',
        video: 'https://www.youtube.com/watch?v=wJ3DkE6j5bc',
        reps: '4 x 20m',
        set: '4',
      },
    ],
  },
  {
    nome: 'Speed Endurance',
    esercizi: [
      {
        nome: 'Interval Sprint (30 sec sprint, 1 min riposo)',
        video: 'https://www.youtube.com/watch?v=XaWjq_2Kf9A',
        reps: '10',
        set: '4',
      },
      {
        nome: 'Sprint a Velocità Costante',
        video: 'https://www.youtube.com/watch?v=9k2zAfkFwqY',
        reps: '4 x 60m',
        set: '3',
      },
      {
        nome: 'Sprint con Recupero Ridotto',
        video: 'https://www.youtube.com/watch?v=vmB-KhT6TwE',
        reps: '6 x 40m',
        set: '4',
      },
    ],
  },
  {
    nome: 'Endurance Strength',
    esercizi: [
      {
        nome: 'Squat con Pesi',
        video: 'https://www.youtube.com/watch?v=aclHkVaku9U',
        reps: '15-20',
        set: '4',
      },
      {
        nome: 'Push-Up con Rallentamento',
        video: 'https://www.youtube.com/watch?v=J0DnG1hFAsI',
        reps: '15-20',
        set: '4',
      },
      {
        nome: 'Affondi con Pesi',
        video: 'https://www.youtube.com/watch?v=4bGyz5Kqudg',
        reps: '12-15 per gamba',
        set: '4',
      },
    ],
  },
];

const Workout = () => {
  const [programmaSelezionato, setProgrammaSelezionato] = useState(null);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleProgrammaSelect = (event) => {
    const programmaNome = event.target.value;
    const programma = programmi.find((prog) => prog.nome === programmaNome);
    setProgrammaSelezionato(programma);
  };

  const getYouTubeId = (url) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : '';
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>
      {/* Tasto Home */}
      <button
        onClick={handleHomeClick}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: '#007BFF',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Home
      </button>

      <div style={{ padding: '40px 20px' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Seleziona un Programma di Allenamento</h1>

        {/* Selettore Programma */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <select
            defaultValue=""
            onChange={handleProgrammaSelect}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px',
            }}
          >
            <option value="">Seleziona Programma</option>
            {programmi.map((programma, index) => (
              <option key={index} value={programma.nome}>
                {programma.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Visualizzazione Esercizi */}
        {programmaSelezionato && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
            {programmaSelezionato.esercizi.map((esercizio, index) => (
              <div key={index} style={esercizioCardStyle}>
                <h3 style={{ textAlign: 'center', color: '#333' }}>{esercizio.nome}</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <iframe
                    width="280"
                    height="180"
                    src={`https://www.youtube.com/embed/${getYouTubeId(esercizio.video)}`}
                    title={esercizio.nome}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p><strong>Reps:</strong> {esercizio.reps}</p>
                <p><strong>Set:</strong> {esercizio.set}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Stili per i singoli esercizi
const esercizioCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  width: '300px',
  textAlign: 'center',
};

export default Workout;
