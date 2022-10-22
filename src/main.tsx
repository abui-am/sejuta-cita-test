import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './pages/App';
import Bookmark from './pages/Bookmark';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/bookmark',
    element: <Bookmark />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
