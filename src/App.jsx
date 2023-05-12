import { Route, Routes } from 'react-router-dom';
import './App.css';

import Cart from './components/Cart';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='/' element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
