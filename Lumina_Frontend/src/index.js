import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UsuarioProvider } from './contexto/UsuarioContexto';
import RolarPagina from './componentes/RolarPagina';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsuarioProvider>
      <BrowserRouter>
        <RolarPagina />
        <App />
      </BrowserRouter>
    </UsuarioProvider>
  </React.StrictMode>
);

reportWebVitals();