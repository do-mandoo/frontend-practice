import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import CartForm from './pages/Cart';
import SignupForm from './pages/Signup';
import LoginForm from './pages/Login';
import UserInfo from './pages/UserInfo';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/userInfo/:id' element={<UserInfo />} />
      </Routes>
    </>
  );
}

export default App;
