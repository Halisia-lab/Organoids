import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // ou 'dark' selon tes besoins
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <ThemeProvider theme={theme}>
  <React.StrictMode>
   
    <App />

  </React.StrictMode>  </ThemeProvider>,
);

reportWebVitals();
