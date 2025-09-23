import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-slate-200 mb-6">
          Acessar Command Center
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-slate-400 text-sm font-bold mb-2">
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="seu-email@exemplo.com"
            className="w-full bg-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-slate-400 text-sm font-bold mb-2">
            Senha
          </label>
          <input 
            type="password" 
            id="password" 
            placeholder="********"
            className="w-full bg-slate-700 text-slate-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="mb-6">
          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Entrar
          </button>
        </div>
        <p className="text-center text-slate-400 text-sm">
          Não possui uma conta? 
          <Link to="/cadastro" className="text-cyan-400 hover:underline ml-1">
            Crie agora
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;