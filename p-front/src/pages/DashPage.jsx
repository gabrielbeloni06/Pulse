import React from 'react';
import { Link } from 'react-router-dom';
const DashPage = () => {
  const fakeUserData = {
    username: 'PlayerOne',
    winRate: '58%',
    totalMatches: 152,
    mostPlayedGame: 'Valorant',
  };
  const fakeRecentMatches = [
    { id: 1, game: 'Valorant', character: 'Jett', result: 'Vitória' },
    { id: 2, game: 'League of Legends', character: 'Lux', result: 'Derrota' },
    { id: 3, game: 'Valorant', character: 'Sova', result: 'Vitória' },
    { id: 4, game: 'CS:GO', character: 'N/A', result: 'Vitória' },
    { id: 5, game: 'Valorant', character: 'Jett', result: 'Derrota' },
  ];
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Bem-vindo de volta, {fakeUserData.username}!</h1>
        <p className="text-slate-400 mt-1">Aqui está um resumo do seu desempenho.</p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">Taxa de Vitória Geral</h2>
          <p className="text-3xl font-bold text-cyan-400 mt-2">{fakeUserData.winRate}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">Total de Partidas</h2>
          <p className="text-3xl font-bold text-slate-100 mt-2">{fakeUserData.totalMatches}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">Jogo Mais Jogado</h2>
          <p className="text-3xl font-bold text-slate-100 mt-2">{fakeUserData.mostPlayedGame}</p>
        </div>
      </section>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Desempenho Recente</h2>
          <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">[Placeholder para o Gráfico]</p>
          </div>
        </section>
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Partidas Recentes</h2>
          <ul className="space-y-4">
            {fakeRecentMatches.map((match) => (
              <li key={match.id} className="flex items-center justify-between bg-slate-700 p-3 rounded-md">
                <div>
                  <p className="font-bold text-slate-100">{match.game}</p>
                  <p className="text-sm text-slate-400">{match.character}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${match.result === 'Vitória' ? 'text-green-400' : 'text-red-400'}`}>
                    {match.result}
                  </p>
                  <Link to={`/dashboard/game/${match.game.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-cyan-400 hover:underline">
                    Ver Detalhes
                  </Link>
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