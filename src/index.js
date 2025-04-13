import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css'; // Se hai uno stylesheet
import App from './App'; // Importa il componente App
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
