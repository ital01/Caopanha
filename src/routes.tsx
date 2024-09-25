import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@components/header/header';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Register from './app/screens/register/register';
import Campaigns from './app/screens/campaigns/campaigns';
import Dashboard from './app/screens/dashboard/dashboard';

export default function AppRoutes() {
  const location = useLocation();
  const showHeader = location.pathname !== '/login';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cadastrar' element={<Register />} />
        <Route path='/campanhas' element={<Campaigns />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}
