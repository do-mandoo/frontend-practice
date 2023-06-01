import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MainListForm from './components/MainList';
import LoginForm from './components/Login';
import ErrorPage from './components/ErrorPage';
import UserInfo from './components/UserInfo';
import SignupAdminForm from './components/SignupAdmin';
import SignupForm from './components/Signup';
import ModiItem from './components/ModiItem';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/main' element={<MainListForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signupAdmin' element={<SignupAdminForm />} />
        <Route path='/userInfo/:id' element={<UserInfo />} />
        <Route path='/modiItem/:id' element={<ModiItem />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
