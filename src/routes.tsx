import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@components/header/header';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Dashboard from './app/screens/dashboard/dashboard';
import Pets from './app/screens/pets/pets';
import Campaigns from './app/screens/campaigns/campaigns';
import Services from './app/screens/services/services';
import Register from './app/screens/register/register';
import { useEffect, useState } from 'react';

export default function AppRoutes() {
  const location = useLocation();
  const showHeader = location.pathname !== '/login';
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const loginState = localStorage.getItem('isLogged');
    setIsLogged(loginState === 'true');
  }, []);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campanhas" element={<Campaigns />} />
        <Route path='/cadastrar' element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <>
          {isLogged ?
            <>
              <Route path="/pets" element={<Pets />} />
              <Route path="/servicos" element={<Services />} />
            </> : null
          }
        </>
      </Routes>
    </>
  );
}
