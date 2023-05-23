import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.js';
import ErroePage from './error-page.js'

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErroePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
