import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const DashPage = ({ matches, onAddMatch, onDeleteMatch }) => {
  const fakeUserData = {
    username: 'PlayerOne',
  };

  const [newGame, setNewGame] = useState('');
  const [newCharacter, setNewCharacter] = useState('');
  const [newResult, setNewResult] = useState('Vitória');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!newGame || !newCharacter) {
      alert("Por favor, preencha o nome do jogo e do personagem.");
      return;
    }
    onAddMatch({ game: newGame, character: newCharacter, result: newResult });
    setNewGame('');
    setNewCharacter('');
  };
  const totalMatches = matches.length;
  const totalWins = matches.filter(m => m.result === 'Vitória').length;
  const totalLosses = totalMatches - totalWins;
  const winRate = totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0;
  const chartData = {
    labels: ['Vitórias', 'Derrotas'],
    datasets: [
      {
        label: 'Nº de Partidas',
        data: [totalWins, totalLosses],
        backgroundColor: [
          'rgba(22, 163, 74, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(248, 113, 113, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Bem-vindo de volta, {fakeUserData.username}!</h1>
        <p className="text-slate-400 mt-1">Aqui está um resumo do seu desempenho.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">Taxa de Vitória Geral</h2>
          <p className="text-3xl font-bold text-cyan-400 mt-2">{winRate}%</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">Total de Partidas</h2>
          <p className="text-3xl font-bold text-slate-100 mt-2">{totalMatches}</p>
        </div>
      </section>

      <section className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold text-slate-100 mb-4">Registar Nova Partida</h2>
        <form onSubmit={handleFormSubmit} className="grid sm:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Nome do Jogo" 
            value={newGame}
            onChange={(e) => setNewGame(e.target.value)}
            className="w-full bg-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input 
            type="text" 
            placeholder="Personagem"
            value={newCharacter}
            onChange={(e) => setNewCharacter(e.target.value)}
            className="w-full bg-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="flex gap-4">
            <select 
              value={newResult}
              onChange={(e) => setNewResult(e.target.value)}
              className="w-full bg-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>Vitória</option>
              <option>Derrota</option>
            </select>
            <button type="submit" className="flex-shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Adicionar
            </button>
          </div>
        </form>
      </section>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Desempenho Geral</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={chartData} />
          </div>
        </section>
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Histórico de Partidas</h2>
          <ul className="space-y-4">
            {matches.map((match) => (
              <li key={match.id} className="flex items-center justify-between bg-slate-700 p-3 rounded-md">
                <div>
                  <p className="font-bold text-slate-100">{match.game}</p>
                  <p className="text-sm text-slate-400">{match.character}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${match.result === 'Vitória' ? 'text-green-400' : 'text-red-400'}`}>
                    {match.result}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <Link to={`/dashboard/game/${match.game.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-cyan-400 hover:underline">
                      Ver Detalhes
                    </Link>
                    <button onClick={() => onDeleteMatch(match.id)} className="text-xs text-red-400 hover:underline">
                      Apagar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      
    </div>
  );
};

export default DashPage;
