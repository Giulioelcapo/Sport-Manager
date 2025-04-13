import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Assicurati che esista e sia configurato

const FormTestFisico = () => {
  const [formData, setFormData] = useState({
    player_id: '',
    tipo_test: '',
    resulto: '',
    unit: '',
    test_date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validazione dei campi
    if (!formData.player_id || !formData.test_type || !formData.result || !formData.unit || !formData.test_date) {
      setError('Tutti i campi sono obbligatori!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const { error } = await supabase
      .from('physical_tests')
      .insert([formData]);

    setLoading(false);

    if (error) {
      console.error('Errore:', error);
      setError('Errore durante il salvataggio.');
    } else {
      setSuccessMessage('Test salvato correttamente!');
      setFormData({
        player_id: '',
        test_type: '',
        result: '',
        unit: '',
        test_date: ''
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Inserisci i dati del test fisico</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="player_id">ID Giocatore:</label>
        <input
          id="player_id"
          name="player_id"
          placeholder="ID giocatore"
          value={formData.player_id}
          onChange={handleChange}
        /><br />

        <label htmlFor="test_type">Tipo di Test:</label>
        <input
          id="test_type"
          name="test_type"
          placeholder="Tipo di test"
          value={formData.test_type}
          onChange={handleChange}
        /><br />

        <label htmlFor="result">Risultato:</label>
        <input
          id="result"
          name="result"
          placeholder="Risultato"
          value={formData.result}
          onChange={handleChange}
        /><br />

        <label htmlFor="unit">Unità (cm, s, punti...):</label>
        <input
          id="unit"
          name="unit"
          placeholder="Unità"
          value={formData.unit}
          onChange={handleChange}
        /><br />

        <label htmlFor="test_date">Data del test:</label>
        <input
          type="date"
          id="test_date"
          name="test_date"
          value={formData.test_date}
          onChange={handleChange}
        /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Caricamento...' : 'Salva Test'}
        </button>
      </form>
    </div>
  );
};

export default FormTestFisico;
