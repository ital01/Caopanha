import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@components/header/header';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Dashboard from './app/screens/dashboard/dashboard';
import Pets from './app/screens/pets/pets';
import { useContext } from 'react';
import { AuthContext } from './app/context/auth.context';
import Campaigns from './app/screens/campaigns/campaigns';
import Services from './app/screens/services/services';
import Register from './app/screens/register/register';

export default function AppRoutes() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const showHeader = location.pathname !== '/login';

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
        <>
          {user ?
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/servicos" element={<Services />} />

            </> : null
          }
        </>
      </Routes>
    </>
  );
}

export  function DashRoutes() {
  const location = useLocation();
  const showHeader = location.pathname !== '/login';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='/cadastrar' element={<Register />} />
        <Route path='/campanhas' element={<Campaigns />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}
