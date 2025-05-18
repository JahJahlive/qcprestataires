import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ContextProvider } from './context/ContextProvider.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
);