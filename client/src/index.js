import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './providers/UserProvider';
import { ToastProvider } from './providers/ToastProvider'
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './providers/MenuProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ToastProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </ToastProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);