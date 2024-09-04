import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Header from '@components/header/header';
// import Footer from '@components/footer/footer';

export default function AppRoutes() {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/Caopanha/login';

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/Caopanha" element={<Navigate to="/Caopanha/home" />} />
        <Route path="/Caopanha/home" element={<Home />} />
        <Route path="/Caopanha/login" element={<Login />} />
      </Routes>
      {/* {!hideHeaderFooter && <Footer />} */}
    </>
  );
}
