import React from 'react';
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <header className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-sky-500 text-transparent bg-clip-text">
            Analise. Melhore. Domine.
          </span>
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          O Command Center é a sua central de estatísticas de jogos.
          Registe as suas partidas, visualize o seu progresso e descubra insights
          para elevar o seu nível de jogo.
        </p>
        <Link 
          to="/cadastro" 
          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          Crie a sua conta gratuitamente
        </Link>
      </header>

    </div>
  );
};
export default HomePage;