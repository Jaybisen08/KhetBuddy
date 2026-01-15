
import React, { useState } from 'react';
import { AppSection, Language } from '../types';
import { translations } from '../services/translations';

interface DashboardProps {
  lang: Language;
  onNavigate: (section: AppSection, params?: any) => void;
  isDarkMode?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ lang, onNavigate, isDarkMode = false }) => {
  const t = translations[lang];
  const [advisoryInput, setAdvisoryInput] = useState('');

  const handleAdvisorySubmit = () => {
    if (!advisoryInput.trim()) return;
    onNavigate(AppSection.Chat, { initialMessage: advisoryInput });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Mandi Card */}
      <div 
        onClick={() => onNavigate(AppSection.Prices)}
        className={`p-10 rounded-[3rem] shadow-xl border flex flex-col h-full min-h-[350px] transition-all hover:scale-[1.02] cursor-pointer group ${
          isDarkMode ? 'bg-white/10 border-white/10' : 'bg-white border-stone-200'
        }`}
      >
        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-8 flex items-center gap-3">
          <i className="fas fa-chart-line text-lg"></i> {t.mandi}
        </h3>
        <div className="space-y-4 flex-1">
           {[
             { name: t.crops.Wheat, price: '₹2,350', up: true },
             { name: t.crops.Onion, price: '₹1,800', up: false },
             { name: t.crops.Soyabean, price: '₹4,200', up: true }
           ].map((item, idx) => (
             <div key={idx} className={`flex justify-between items-center p-5 rounded-2xl border transition-colors ${
               isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'
             }`}>
                <span className="font-black text-stone-800 italic">{item.name}</span>
                <span className={`font-black tracking-tighter text-xl ${item.up ? 'text-emerald-500' : 'text-red-500'}`}>{item.price}</span>
             </div>
           ))}
        </div>
        <div 
          className="mt-8 text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] flex items-center gap-3 group-hover:translate-x-2 transition-transform"
        >
          {t.viewAllMarkets} <i className="fas fa-arrow-right"></i>
        </div>
      </div>

      {/* Weather Card */}
      <div 
        onClick={() => onNavigate(AppSection.Weather)}
        className={`p-10 rounded-[3rem] shadow-xl border flex flex-col h-full transition-all hover:scale-[1.02] cursor-pointer group ${
          isDarkMode ? 'bg-white/10 border-white/10' : 'bg-white border-stone-200'
        }`}
      >
        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-8 flex items-center gap-3">
          <i className="fas fa-cloud-sun text-lg"></i> {t.weather}
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 border border-emerald-200 shadow-inner group-hover:scale-110 transition-transform">
            <i className="fas fa-sun text-4xl text-emerald-600 animate-spin-slow"></i>
          </div>
          <p className="text-3xl font-black text-stone-900 mb-3 italic tracking-tighter uppercase leading-none">{t.allClear}</p>
          <p className="text-xs font-bold text-stone-400 leading-relaxed px-4">{t.weatherDetail}</p>
        </div>
        <span className="mt-8 text-[10px] text-emerald-600 font-black uppercase tracking-widest text-center">Analyze Visual Maps</span>
      </div>

      {/* Gemini Advisory Card */}
      <div className={`p-10 rounded-[3rem] shadow-2xl border flex flex-col h-full md:col-span-2 lg:col-span-1 transition-all hover:scale-[1.02] ${
        isDarkMode ? 'bg-stone-900 border-emerald-500/30' : 'bg-stone-900 border-emerald-600 shadow-emerald-900/10'
      }`}>
        <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-3">
          <i className="fas fa-robot text-lg"></i> {t.advisory}
        </h3>
        <div className="flex-1 bg-white/5 rounded-[2rem] p-8 border border-white/5 mb-8 flex items-center justify-center relative overflow-hidden group">
          <p className="text-base text-emerald-50 leading-relaxed italic font-medium relative z-10 text-center">
            "{lang === 'hi' ? 'आज रात नमी बढ़ सकती है, सिंचाई टाल दें।' : 'Humidity rising tonight, postpone irrigation.'}"
          </p>
          <i className="fas fa-quote-right absolute top-4 right-4 text-white/5 text-6xl"></i>
        </div>
        <div className="flex gap-3">
          <input 
            type="text" 
            value={advisoryInput}
            onChange={(e) => setAdvisoryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdvisorySubmit()}
            placeholder={t.ask} 
            className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-xs focus:ring-2 focus:ring-emerald-400 outline-none transition-all text-white placeholder:text-stone-500" 
          />
          <button 
            onClick={handleAdvisorySubmit}
            className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-500 transition-all active:scale-95"
          >
            <i className="fas fa-bolt text-white text-lg"></i>
          </button>
        </div>
      </div>

      {/* Tracking Card */}
      <div 
        onClick={() => onNavigate(AppSection.Tracking)}
        className={`p-10 rounded-[3rem] shadow-xl border flex flex-col h-full cursor-pointer group transition-all hover:scale-[1.02] ${
          isDarkMode ? 'bg-white/10 border-white/10' : 'bg-white border-stone-200'
        }`}
      >
        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-8 flex items-center gap-3">
          <i className="fas fa-truck-fast text-lg"></i> {t.tracking}
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center">
           <div className="bg-white border border-stone-100 p-6 rounded-[2.5rem] shadow-2xl mb-6 group-hover:scale-110 transition-transform flex items-center justify-center">
              <i className="fas fa-qrcode text-8xl text-stone-900 group-hover:text-emerald-600 transition-colors"></i>
           </div>
           <p className="text-[11px] font-black text-stone-400 uppercase tracking-[0.4em]">{t.batchLabel}</p>
        </div>
        <span className="mt-8 text-[10px] text-emerald-600 font-black uppercase tracking-widest text-center">{t.tapView}</span>
      </div>

      {/* Enhanced CTA Banner */}
      <div className="md:col-span-2 lg:col-span-4 bg-emerald-600 rounded-[4rem] p-16 text-white flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden shadow-[0_30px_60px_-12px_rgba(5,150,105,0.4)] transition-transform hover:scale-[1.005]">
        <div className="relative z-10 max-w-2xl text-center lg:text-left">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-100 mb-6 block opacity-80">Crop Lifecycle Intelligence</span>
           <h2 className="text-7xl font-black mb-6 italic uppercase tracking-tighter leading-none">{t.manage}</h2>
           <p className="text-emerald-50 font-bold text-xl leading-relaxed opacity-90">{t.wheatMaturity}</p>
        </div>
        <button 
          onClick={() => onNavigate(AppSection.CropDetail)}
          className="relative z-10 bg-white text-emerald-900 px-16 py-8 rounded-[2.5rem] font-black text-2xl shadow-3xl hover:bg-stone-50 transition-all active:scale-95 flex items-center gap-4 group"
        >
          {t.viewDetails}
          <i className="fas fa-chevron-right transition-transform group-hover:translate-x-2"></i>
        </button>
        {/* Background purely decorative wheat icon */}
        <div className="absolute right-[-5%] top-[-5%] opacity-10 pointer-events-none rotate-[20deg]">
          <i className="fas fa-wheat-awn text-[400px]"></i>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default Dashboard;
