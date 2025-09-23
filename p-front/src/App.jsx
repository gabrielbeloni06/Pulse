import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashPage from './pages/DashPage';
import DetailsPage from './pages/DetailsPage';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashPage />} />
      <Route path="/dashboard/game/:gameName" element={<DetailsPage />} />
    </Routes>
  );
}

export default App;