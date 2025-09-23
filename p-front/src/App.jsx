import { useState, useEffect } from 'react'; // 1. Importamos o useEffect
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashPage from './pages/DashPage'; 
import DetailsPage from './pages/DetailsPage';

import './App.css';

const initialMatches = [
  { id: 1, game: 'Valorant', character: 'Jett', result: 'Vitória' },
  { id: 2, game: 'League of Legends', character: 'Lux', result: 'Derrota' },
  { id: 3, game: 'Valorant', character: 'Sova', result: 'Vitória' },
];

function App() {
  const [matches, setMatches] = useState(() => {
    const savedMatches = localStorage.getItem('command-center-matches');
    return savedMatches ? JSON.parse(savedMatches) : initialMatches;
  });
  useEffect(() => {
    localStorage.setItem('command-center-matches', JSON.stringify(matches));
  }, [matches]);


  const handleAddMatch = (newMatchData) => {
    const newMatch = {
      id: Date.now(),
      ...newMatchData,
    };
    setMatches([newMatch, ...matches]);
  };

  const handleDeleteMatch = (matchIdToDelete) => {
    const updatedMatches = matches.filter(match => match.id !== matchIdToDelete);
    setMatches(updatedMatches);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      
      <Route 
        path="/dashboard" 
        element={
          <DashPage 
            matches={matches} 
            onAddMatch={handleAddMatch} 
            onDeleteMatch={handleDeleteMatch} 
          />
        } 
      />

      <Route 
        path="/dashboard/game/:gameName" 
        element={<DetailsPage matches={matches} />} 
      />
    </Routes>
  );
}

export default App;

