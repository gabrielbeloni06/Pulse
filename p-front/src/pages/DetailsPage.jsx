import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const DetailsPage = ({ matches }) => {
  const { gameName } = useParams();
  const formattedGameName = gameName.charAt(0).toUpperCase() + gameName.slice(1).replace(/-/g, ' ');
  const gameMatches = matches.filter(match => match.game.toLowerCase().replace(/\s+/g, '-') === gameName);
  const totalMatches = gameMatches.length;
  const totalWins = gameMatches.filter(m => m.result === 'Vitória').length;
  const winRate = totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0;
  const processCharacterData = () => {
    if (gameMatches.length === 0) {
      return { labels: [], datasets: [] };
    }
    const performanceByChar = gameMatches.reduce((acc, match) => {
      if (!acc[match.character]) {
        acc[match.character] = { wins: 0, losses: 0 };
      }
      if (match.result === 'Vitória') {
        acc[match.character].wins += 1;
      } else {
        acc[match.character].losses += 1;
      }
      return acc;
    }, {});

    const labels = Object.keys(performanceByChar);
    const winsData = labels.map(char => performanceByChar[char].wins);
    const lossesData = labels.map(char => performanceByChar[char].losses);

    return {
      labels,
      datasets: [
        {
          label: 'Vitórias',
          data: winsData,
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
        },
        {
          label: 'Derrotas',
          data: lossesData,
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
        },
      ],
    };
  };

  const barChartData = processCharacterData();

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
          <h2 className="text-sm font-medium text-slate-400">Taxa de Vitória ({formattedGameName})</h2>
          <p className="text-3xl font-bold text-cyan-400 mt-2">{winRate}%</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-sm font-medium text-slate-400">Total de Partidas</h2>
          <p className="text-3xl font-bold text-slate-100 mt-2">{totalMatches}</p>
        </div>
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Performance com Personagens</h2>
          <div className="h-64 flex items-center justify-center">
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Histórico de Partidas</h2>
          <ul className="space-y-4">
            {gameMatches.map((match) => (
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

