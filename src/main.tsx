// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import PubliConnectPortal from './components/PubliConnect/PubliConnectPortal'; // Asegúrate de que esta ruta sea correcta
import './index.css'; // Estilos globales (Reset, Body, etc.)

// Asegúrate de usar 'components/PubliConnect/PubliConnectPortal' si ese es el path correcto.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {}
    <PubliConnectPortal /> 
  </React.StrictMode>,
);