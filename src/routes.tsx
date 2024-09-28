import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@components/header/header';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Dashboard from './app/screens/dashboard/dashboard';

export default function AppRoutes() {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== `/login`;

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
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
