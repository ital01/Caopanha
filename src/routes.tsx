import { Route, Routes, useLocation } from 'react-router-dom';
import environment from '@environment/environment';
import Header from '@components/header/header';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Register from './app/screens/register/register';
import Campaigns from './app/screens/campaigns/campaigns';
import Appointments from './app/screens/appointments/appointments';
import Pets from './app/screens/pets/pets';
import Dashboard from './app/screens/dashboard/dashboard';

export default function AppRoutes() {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== `${environment.repoName}/login`;

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path={environment.repoName} element={<Home />} />
        <Route path={`${environment.repoName}/login`} element={<Login />} />
        <Route path={`${environment.repoName}/cadastro`} element={<Register />} />
        <Route path={`${environment.repoName}/campanhas`} element={<Campaigns />} />
        <Route path={`${environment.repoName}/agendamentos`} element={<Appointments />} />
        <Route path={`${environment.repoName}/pets`} element={<Pets />} />
        <Route path={`${environment.repoName}/dashboard`} element={<Dashboard />} />
      </Routes>
    </>
  );
}
