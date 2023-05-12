import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SignupForm from './pages/Signup.jsx';
import LoginForm from './pages/Login.jsx';
import CartForm from './pages/Cart.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <SignupForm />,
  },
  { path: '/login', element: <LoginForm /> },
  { path: '/cart', element: <CartForm /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
