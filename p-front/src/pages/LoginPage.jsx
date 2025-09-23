import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [checks, setChecks] = useState([]);
    const systemChecks = [
        'KERNEL_INTEGRITY_CHECK...',
        'MEMORY_MAPPING...',
        'LOADING_NEURAL_INTERFACE...',
        'SYNCING_DATA_STREAMS...',
        'AWAITING_USER_INPUT...',
    ];

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 100 : prev + 1));
        }, 30);

        let checkIndex = 0;
        const checkInterval = setInterval(() => {
            if (checkIndex < systemChecks.length) {
                setChecks(prev => [...prev, systemChecks[checkIndex]]);
                checkIndex++;
            } else {
                clearInterval(checkInterval);
            }
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(checkInterval);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 font-mono text-purple-400">
            <div className="w-full max-w-md p-4">
                <div className="text-lg mb-2">[SYSTEM BOOT SEQUENCE]</div>
                <div className="w-full h-4 bg-slate-800 border border-purple-500 rounded-sm p-0.5 mb-4">
                    <div className="h-full bg-purple-500 rounded-sm" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
                </div>
                <div className="h-24 text-sm overflow-hidden">
                    {checks.map((check, index) => (
                        <div key={index} className="animate-fade-in">{`> ${check}`} <span className="text-green-400">OK</span></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const LoginPage = () => {
    const canvasRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('idle');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const loginStatusRef = useRef(loginStatus);
    useEffect(() => {
        loginStatusRef.current = loginStatus;
    }, [loginStatus]);

    useEffect(() => {
        const bootTimer = setTimeout(() => setIsLoading(false), 3500);
        return () => clearTimeout(bootTimer);
    }, []);

    useEffect(() => {
        if (isLoading) return;

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
        const handleMouseMove = e => { mouse.x = e.x; mouse.y = e.y; };
        window.addEventListener('mousemove', handleMouseMove);

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width - canvas.width / 2;
                this.y = Math.random() * canvas.height - canvas.height / 2;
                this.z = Math.random() * canvas.width;
            }
            update(currentStatus) {
                let speed = 2;
                if (currentStatus === 'success') speed = 30;
                if (currentStatus === 'error') speed = 0.5;
                
                this.z -= speed;
                if (this.z < 1) {
                    this.z = canvas.width;
                    this.x = Math.random() * canvas.width - canvas.width / 2;
                    this.y = Math.random() * canvas.height - canvas.height / 2;
                }
            }
            draw(currentStatus) {
                let color = '#f472b6';
                if (currentStatus === 'success') color = '#4ade80';
                if (currentStatus === 'error') color = '#ef4444';
                ctx.fillStyle = color;
                const sx = (this.x / this.z) * canvas.width / 2 + canvas.width / 2;
                const sy = (this.y / this.z) * canvas.height / 2 + canvas.height / 2;
                const r = Math.max(0.1, (1 - this.z / canvas.width) * 2.5);
                ctx.beginPath();
                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const stars = Array.from({ length: 800 }).map(() => new Star());
        
        const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops = Array.from({ length: columns }).map(() => ({
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 1,
        }));

        const animate = () => {
            const currentStatus = loginStatusRef.current;
            ctx.fillStyle = currentStatus === 'error' ? 'rgba(127, 29, 29, 0.3)' : 'rgba(15, 23, 42, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => { star.update(currentStatus); star.draw(currentStatus); });

            ctx.font = `${fontSize}px monospace`;
            drops.forEach(drop => {
                const text = katakana[Math.floor(Math.random() * katakana.length)];
                let color = `rgba(168, 85, 247, 0.4)`; // Roxo default
                if (currentStatus === 'success') color = `rgba(74, 222, 128, 0.8)`;
                if (currentStatus === 'error') color = `rgba(220, 38, 38, 0.8)`;
                
                ctx.fillStyle = color;
                ctx.fillText(text, drops.indexOf(drop) * fontSize, drop.y);
                
                if (currentStatus === 'success') {
                    drop.y -= drop.speed * 2;
                    if(drop.y < 0) drop.y = canvas.height;
                } else if (currentStatus !== 'error') {
                    drop.y += drop.speed;
                    if (drop.y > canvas.height) drop.y = 0;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLoading]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === 'user@test.com' && password === 'password') {
            setLoginStatus('success');
            setTimeout(() => navigate('/dashboard'), 2000);
        } else {
            setLoginStatus('error');
            setTimeout(() => setLoginStatus('idle'), 2000);
        }
    };

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-900 overflow-hidden font-mono">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

            <div className={`absolute z-20 transition-all duration-300 pointer-events-none ${loginStatus === 'error' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-4xl sm:text-6xl text-red-500 font-extrabold animate-glitch" data-text="[アクセスが拒否されました]">[アクセスが拒否されました]</h2>
            </div>

            <div className={`relative z-10 w-full max-w-md transition-all duration-700 ease-in-out ${loginStatus === 'success' ? 'opacity-0 scale-75 blur-xl' : 'opacity-100'}`}>
                <div className={`relative p-0.5 group ${loginStatus === 'error' ? 'animate-shake' : ''}`}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    
                    <div className="relative bg-slate-900/80 backdrop-blur-lg rounded-lg p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-100 tracking-widest uppercase">
                                <span className="text-purple-400">NEXUS</span> LOGIN
                            </h1>
                            <p className="text-pink-400 text-sm mt-1">認証 // Authentication</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="relative mb-8 group">
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" required className="peer w-full bg-transparent border-b-2 border-slate-700 text-slate-100 focus:outline-none focus:border-pink-500 transition placeholder-transparent pt-2" placeholder="ID" />
                                <label htmlFor="email" className="absolute left-0 -top-4 text-purple-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-purple-400 peer-focus:text-sm">IDENTITY</label>
                            </div>

                            <div className="relative mb-8 group">
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" required className="peer w-full bg-transparent border-b-2 border-slate-700 text-slate-100 focus:outline-none focus:border-pink-500 transition placeholder-transparent pt-2" placeholder="Password"/>
                                <label htmlFor="password" className="absolute left-0 -top-4 text-purple-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-purple-400 peer-focus:text-sm">PASSKEY</label>
                            </div>

                            <button type="submit" className="w-full text-lg font-bold text-slate-100 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-3 rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
                                CONNECT
                            </button>
                        </form>
                        
                        <p className="text-center text-slate-500 text-xs mt-6">
                          アカウントがありませんか？
                            <Link to="/cadastro" className="text-pink-400 hover:text-pink-300 transition-colors font-semibold ml-2">
                              登録
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes tilt {
                    0% { transform: rotate(0deg); } 25% { transform: rotate(0.5deg); }
                    50% { transform: rotate(0deg); } 75% { transform: rotate(-0.5deg); }
                    100% { transform: rotate(0deg); }
                }
                .animate-tilt { animation: tilt 10s infinite linear; }
                @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
                .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                .animate-glitch { animation: glitch-anim 1s steps(2, end) infinite; }
                .animate-glitch:after, .animate-glitch:before { content: attr(data-text); position: absolute; left: 0; top: 0; right: 0; background: #0f172a; overflow: hidden; }
                .animate-glitch:after { text-shadow: -3px 0 #ff00ff; animation: glitch-anim 1s steps(2, end) infinite reverse; }
                .animate-glitch:before { text-shadow: 3px 0 #00ffff; animation: glitch-anim 1.5s steps(2, end) infinite; }
            `}</style>
        </div>
    );
};

export default LoginPage;