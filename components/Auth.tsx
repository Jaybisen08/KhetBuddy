
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

const authBgImages = [
  'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920'
];

interface AuthProps {
  onLogin: (lang: Language) => void;
}

type AuthMode = 'login' | 'register' | 'success' | 'face-scanning';

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [lang, setLang] = useState<Language>('en');
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (mode === 'register') {
        setMode('success');
        setTimeout(() => {
          onLogin(lang);
        }, 3500);
      } else {
        onLogin(lang);
      }
    }, 1500);
  };

  const handleFaceID = () => {
    setMode('face-scanning');
    setTimeout(() => {
      setMode('success');
      setTimeout(() => {
        onLogin(lang);
      }, 3500);
    }, 2000);
  };

  if (mode === 'face-scanning') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-stone-950 text-white font-sans">
        <div className="relative w-64 h-64 border-4 border-emerald-500 rounded-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>
          <i className="fas fa-user-astronaut text-8xl text-emerald-500 animate-pulse"></i>
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-scanLine"></div>
        </div>
        <h2 className="mt-12 text-2xl font-black italic uppercase tracking-widest text-emerald-400">Scanning Biometrics...</h2>
        <p className="mt-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Securing access via Krishi-Eye AI</p>
        <style>{`
          @keyframes scanLine { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
          .animate-scanLine { animation: scanLine 2s ease-in-out infinite; }
        `}</style>
      </div>
    );
  }

  if (mode === 'success') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden relative bg-stone-50 font-sans">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(60)].map((_, i) => {
            const colors = ['#10b981', '#34d399', '#059669', '#6ee7b7', '#fcd34d'];
            return (
              <div 
                key={i} 
                className="absolute animate-confetti-paper" 
                style={{ 
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  width: Math.random() * 15 + 10 + 'px', 
                  height: Math.random() * 8 + 4 + 'px',
                  left: Math.random() * 100 + '%',
                  top: '-10%',
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }} 
              />
            );
          })}
        </div>
        
        <div className="relative z-10 animate-popIn-glow">
          <div className="w-48 h-48 bg-emerald-600 rounded-[3rem] flex items-center justify-center shadow-[0_0_120px_rgba(16,185,129,0.5)] rotate-12">
            <i className="fas fa-check text-7xl text-white"></i>
          </div>
        </div>
        
        <div className="relative z-10 mt-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black italic text-stone-900 uppercase tracking-tighter animate-fadeIn-slide">
            Welcome to KhetBuddy!
          </h2>
          <p className="text-emerald-600 font-black uppercase tracking-[0.4em] animate-fadeIn-slide opacity-0 [animation-delay:0.8s]">
            Your digital farming journey begins
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-stone-50 overflow-hidden font-sans">
      <div className="hidden lg:flex w-5/12 relative overflow-hidden items-center justify-center bg-emerald-900 border-r border-stone-200">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale-[0.2] contrast-125 transition-all duration-1000 transform hover:scale-105" style={{ backgroundImage: `url('${authBgImages[mode === 'login' ? 0 : 1]}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
        <div className="relative z-10 p-16">
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl mb-12 flex items-center justify-center shadow-2xl animate-bounce-slow">
            <i className="fas fa-wheat-awn text-white text-4xl"></i>
          </div>
          <h1 className="text-7xl font-black italic tracking-tighter text-white uppercase leading-none mb-6">
            <span className="text-[#FF9933]">KHET</span><br/>BUDDY<br/><span className="text-[#138808]">AGRI</span>
          </h1>
          <p className="text-stone-300 font-bold max-w-sm leading-relaxed text-sm">Empowering every farmer with high-precision digital tools and real-time intelligence.</p>
        </div>
      </div>

      <div className="w-full lg:w-7/12 flex relative overflow-hidden">
        {/* Decorative Floating Text */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex flex-col items-center justify-center overflow-hidden select-none">
            <span className="text-9xl font-black uppercase tracking-tighter rotate-12 whitespace-nowrap">MODERN BHARAT • KHETBUDDY AI</span>
            <span className="text-9xl font-black uppercase tracking-tighter -rotate-12 whitespace-nowrap">SMART FARMING • PRECISION AGRI</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 z-10 relative">
          <div className="w-full max-w-md animate-fadeIn space-y-10">
            <div className="flex justify-between items-end">
               <div>
                  <h2 className="text-4xl md:text-5xl font-black italic text-stone-900 uppercase tracking-tighter leading-none">{mode === 'login' ? t.login : t.createAccount}</h2>
                  <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Ready for a smarter harvest?</p>
               </div>
               <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                 <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value as Language)}
                    className="bg-transparent text-[10px] font-black uppercase py-1 px-2 outline-none cursor-pointer text-stone-600"
                 >
                    <option value="en">EN</option>
                    <option value="hi">हि</option>
                    <option value="pa">ਪੰ</option>
                    <option value="ml">മ</option>
                    <option value="ta">த</option>
                    <option value="te">తె</option>
                 </select>
               </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {mode === 'register' ? (
                <div className="grid grid-cols-1 gap-3">
                  <input type="text" placeholder={t.fullName} required className="w-full bg-white border border-stone-200 rounded-2xl py-4 px-6 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                  <input type="email" placeholder={t.email} required className="w-full bg-white border border-stone-200 rounded-2xl py-4 px-6 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="password" placeholder={t.password} required className="bg-white border border-stone-200 rounded-2xl py-4 px-6 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                    <input type="password" placeholder={t.confirmPassword} required className="bg-white border border-stone-200 rounded-2xl py-4 px-6 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <input type="email" placeholder={t.email} required className="w-full bg-white border border-stone-200 rounded-2xl py-4 px-6 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                  <input type="password" placeholder={t.password} required className="w-full bg-white border border-stone-200 rounded-2xl py-4 px-6 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium" />
                </div>
              )}
              <button type="submit" disabled={loading} className="w-full bg-emerald-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-emerald-800 transition-all active:scale-95 mt-4">
                {loading ? <i className="fas fa-circle-notch animate-spin"></i> : mode === 'login' ? t.login : t.createAccount}
              </button>
            </form>

            <div className="relative py-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-stone-200"></div>
              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Or Continue With</span>
              <div className="flex-1 h-px bg-stone-200"></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
               <button onClick={handleFaceID} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-stone-200 hover:bg-emerald-50 hover:border-emerald-500 transition-all group">
                  <i className="fas fa-face-viewfinder text-xl text-stone-400 group-hover:text-emerald-600"></i>
                  <span className="text-[8px] font-black uppercase mt-2 text-stone-400 group-hover:text-emerald-600">Face ID</span>
               </button>
               <button onClick={() => handleAuth({ preventDefault: () => {} } as any)} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-stone-200 hover:bg-stone-50 transition-all group">
                  <i className="fab fa-google text-xl text-stone-400 group-hover:text-red-500"></i>
                  <span className="text-[8px] font-black uppercase mt-2 text-stone-400 group-hover:text-stone-600">Google</span>
               </button>
               <button onClick={() => handleAuth({ preventDefault: () => {} } as any)} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-stone-200 hover:bg-stone-50 transition-all group">
                  <i className="fab fa-apple text-xl text-stone-400 group-hover:text-black"></i>
                  <span className="text-[8px] font-black uppercase mt-2 text-stone-400 group-hover:text-stone-600">Apple</span>
               </button>
            </div>

            <div className="pt-6 border-t border-stone-100 flex flex-col items-center gap-4">
                <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-stone-500 text-[11px] font-black uppercase tracking-widest hover:text-emerald-700 transition-colors">
                  {mode === 'login' ? "New member? Join KhetBuddy" : "Already have an account? Login"}
                </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        @keyframes confetti-paper { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        .animate-confetti-paper { animation: confetti-paper 4s ease-in infinite; }
        @keyframes popIn-glow { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1) rotate(12deg); opacity: 1; } }
        .animate-popIn-glow { animation: popIn-glow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn-slide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn-slide { animation: fadeIn-slide 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Auth;
