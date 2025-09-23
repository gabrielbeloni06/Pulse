import React from 'react';
import { Link, useParams } from 'react-router-dom';
const DetailsPage = () => {
  const { gameName } = useParams();
  const fakeGameData = {
    winRateWithJett: '62%',
    averageKDA: '1.8',
  };
  const fakeGameMatches = [
    { id: 1, character: 'Jett', result: 'Vitória' },
    { id: 3, character: 'Sova', result: 'Vitória' },
    { id: 5, character: 'Jett', result: 'Derrota' },
  ];
  const formattedGameName = gameName.charAt(0).toUpperCase() + gameName.slice(1).replace(/-/g, ' ');
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Estatísticas de {formattedGameName}</h1>
        <Link to="/dashboard" className="text-cyan-400 hover:underline mt-1 inline-block">
          ← Voltar para a Dashboard
        </Link>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">Taxa de Vitória (Jett)</h2>
          <p className="text-3xl font-bold text-cyan-400 mt-2">{fakeGameData.winRateWithJett}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">K/D/A Médio</h2>
          <p className="text-3xl font-bold text-slate-100 mt-2">{fakeGameData.averageKDA}</p>
        </div>
      </section>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Performance com Personagens</h2>
          <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">[Placeholder para Gráfico de Barras]</p>
          </div>
        </section>
        <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Histórico de Partidas</h2>
          <ul className="space-y-4">
            {fakeGameMatches.map((match) => (
              <li key={match.id} className="flex items-center justify-between bg-slate-700 p-3 rounded-md">
                <div>
                  <p className="font-bold text-slate-100">Personagem: {match.character}</p>
                </div>
                <p className={`font-bold ${match.result === 'Vitória' ? 'text-green-400' : 'text-red-400'}`}>
                  {match.result}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>

    </div>
  );
};
export default DetailsPage;