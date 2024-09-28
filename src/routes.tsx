import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@components/header/header';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Dashboard from './app/screens/dashboard/dashboard';
import Pets from './app/screens/pets/pets';
import { useContext } from 'react';
import { AuthContext } from './app/context/auth.context';
import Campaigns from './app/screens/campaigns/campaigns';

export default function AppRoutes() {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== `/login`;
  const {user} = useContext(AuthContext)

  return (
    <>
          {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campanhas" element={<Campaigns />} />
        <>
        {user ?
        <>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pets" element={<Pets />} />
      

        </> : null
      }
        </>
      </Routes>
    </>
  );
}

export  function DashRoutes() {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== `/login`;

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
