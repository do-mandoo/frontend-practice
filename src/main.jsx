import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import SignupForm from './components/Signup.jsx';
import LoginForm from './components/Login.jsx';
import MainListForm from './components/MainList.jsx';
import UserInfo from './components/UserInfo.jsx';
import SignupAdminForm from './components/SignupAdmin.jsx';
import ModiItem from './components/ModiItem.jsx';

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
  {
    path: '/signupAdmin',
    element: <SignupAdminForm />,
  },
  { path: '/login', element: <LoginForm /> },
  { path: '/main', element: <MainListForm /> },
  { path: '/userInfo/:id', element: <UserInfo /> },
  { path: '/modiItem/:id', element: <ModiItem /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
