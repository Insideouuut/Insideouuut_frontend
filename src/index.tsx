import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//route
import Routes from './routes/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);
