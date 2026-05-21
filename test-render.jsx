import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './src/App.jsx';

// Stub missing DOM elements if needed, though jsdom provides most
console.log('Testing App render...');
try {
  render(
    <HelmetProvider>
      <BrowserRouter initialEntries={['/login']}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
  console.log('App rendered /login without throwing!');
} catch (e) {
  console.error('Render error:', e);
}

try {
  render(
    <HelmetProvider>
      <BrowserRouter initialEntries={['/register']}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
  console.log('App rendered /register without throwing!');
} catch (e) {
  console.error('Render error on register:', e);
}
