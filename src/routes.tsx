import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './app/screens/home/home';
import Login from './app/screens/login/login';
import Header from '@components/header/header';
// import Footer from '@components/footer/footer';

export default function AppRoutes() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div style={{ marginTop: hideHeaderFooter ? '0' : '10vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {/* {!hideHeaderFooter && <Footer />} */}
    </>
  );
}
