import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const GlitchText = ({ text }) => {
  return (
    <div className="relative font-mono" data-text={text}>
      {text}
      <div className="absolute top-0 left-0 w-full h-full glitch-layers">
        <div data-text={text}></div>
        <div data-text={text}></div>
      </div>
    </div>
  );
};
const HomePage = () => {
  const canvasRef = useRef(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .glitch-layers {
        text-shadow: -1px 0 #00ffff, 1px 0 #ff00ff;
        animation: glitch 1.5s infinite;
      }
      .glitch-layers div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .glitch-layers div:before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f172a;
        overflow: hidden;
      }
      .glitch-layers div:first-child:before {
        text-shadow: 2px 0 #00ffff;
        animation: glitch-anim-1 2s infinite reverse;
      }
      .glitch-layers div:last-child:before {
        text-shadow: -2px 0 #ff00ff;
        animation: glitch-anim-2 3s infinite reverse;
      }
      @keyframes glitch { 0%, 100% { transform: translate(0, 0); } 20%, 60% { transform: translate(-2px, 2px); } 40%, 80% { transform: translate(2px, -2px); } }
      @keyframes glitch-anim-1 { 0% { clip-path: inset(10% 0 80% 0); } 20% { clip-path: inset(50% 0 10% 0); } 40% { clip-path: inset(20% 0 65% 0); } 60% { clip-path: inset(70% 0 20% 0); } 80% { clip-path: inset(40% 0 30% 0); } 100% { clip-path: inset(90% 0 5% 0); } }
      @keyframes glitch-anim-2 { 0% { clip-path: inset(80% 0 10% 0); } 20% { clip-path: inset(20% 0 70% 0); } 40% { clip-path: inset(60% 0 30% 0); } 60% { clip-path: inset(30% 0 50% 0); } 80% { clip-path: inset(90% 0 5% 0); } 100% { clip-path: inset(50% 0 40% 0); } }
    `;
    document.head.appendChild(style);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener('mousemove', e => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    const gridSpacing = 30;
    const waveAmp = 10;
    const waveFreq = 0.01;
    let frame = 0;
    const glyphs = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789"
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).map(() => 1);

    function draw() {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(103, 232, 249, 0.3)';
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
            const text = glyphs[Math.floor(Math.random() * glyphs.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        for (let x = 0; x < canvas.width; x += gridSpacing) {
            for (let y = 0; y < canvas.height; y += gridSpacing) {
                const dist = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);
                const warp = Math.sin(dist * waveFreq + frame) * waveAmp * (150 / (dist + 1));
                
                ctx.beginPath();
                ctx.arc(x + warp, y + warp, 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${0.3 * (200 / (dist + 1))})`;
                ctx.fill();
            }
        }
        frame += 0.03;
        animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    setTimeout(() => setIsBooting(false), 500);
    setTimeout(() => setIsContentLoaded(true), 1500);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
      cancelAnimationFrame(animationFrameId);
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`relative w-full max-w-3xl transition-opacity duration-1000 ${isContentLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
            <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" fill="none" stroke="rgba(103, 232, 249, 0.2)" strokeWidth="2" strokeDasharray="20 10"/>
            <path d="M 0 30 V 0 H 30" fill="none" stroke="rgba(103, 232, 249, 0.8)" strokeWidth="4" className={`transition-all duration-500 ease-in-out ${isBooting ? 'stroke-dashoffset-[60] stroke-dasharray-[60]' : 'stroke-dashoffset-[0] stroke-dasharray-[60]'}`}/>
            <path d="M calc(100% - 30) 0 H 100% V 30" fill="none" stroke="rgba(103, 232, 249, 0.8)" strokeWidth="4" className={`transition-all duration-500 ease-in-out ${isBooting ? 'stroke-dashoffset-[60] stroke-dasharray-[60]' : 'stroke-dashoffset-[0] stroke-dasharray-[60]'}`}/>
            <path d="M 0 calc(100% - 30) V 100% H 30" fill="none" stroke="rgba(103, 232, 249, 0.8)" strokeWidth="4" className={`transition-all duration-500 ease-in-out ${isBooting ? 'stroke-dashoffset-[60] stroke-dasharray-[60]' : 'stroke-dashoffset-[0] stroke-dasharray-[60]'}`}/>
            <path d="M calc(100% - 30) 100% H 100% V calc(100% - 30)" fill="none" stroke="rgba(103, 232, 249, 0.8)" strokeWidth="4" className={`transition-all duration-500 ease-in-out ${isBooting ? 'stroke-dashoffset-[60] stroke-dasharray-[60]' : 'stroke-dashoffset-[0] stroke-dasharray-[60]'}`}/>
          </svg>
          <div className="p-10 bg-slate-900/50 backdrop-blur-md">
            <header className="text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-slate-100">
                <GlitchText text="COMMAND CENTER"/>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
                A sua central de estatísticas de jogos. Registe as suas partidas, visualize o seu progresso e descubra insights para elevar o seu nível de jogo.
              </p>
              <Link to="/cadastro" className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-400/50 shadow-lg">
                Iniciar Análise
              </Link>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;