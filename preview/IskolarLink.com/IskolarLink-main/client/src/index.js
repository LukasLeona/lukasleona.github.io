import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './helpers/AuthContent';
import { AccreditationStatusProvider } from './helpers/AccreditationStatusContext';
import { ApplicationPeriodProvider } from './helpers/ApplicationPeriodContext';


const script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/f7a18fe102.js';
script.crossOrigin = 'anonymous';
script.async = true;
document.head.appendChild(script);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AccreditationStatusProvider>
    <AuthProvider>
    <ApplicationPeriodProvider>
    <App />
    </ApplicationPeriodProvider>
    </AuthProvider>
    </AccreditationStatusProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
