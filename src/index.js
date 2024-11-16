import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppTailwind from './tailwindcss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <div className='h-90'></div>
    <AppTailwind />
  </React.StrictMode>
);

