
import React, { useState } from 'react';
import { AppSection, Language, Notification } from '../types';
import { translations } from '../services/translations';

interface Props {
  onNavigate: (section: AppSection) => void;
  activeSection: AppSection;
  lang: Language;
  onLangChange: (lang: Language) => void;
  isAssistantActive: boolean;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<Props> = ({ onNavigate, activeSection, lang, onLangChange, isAssistantActive, onThemeToggle, isDarkMode }) => {
  const t = translations[lang];
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications: Notification[] = [
    { id: '1', title: t.notifs?.weatherTitle || 'Weather Update', description: t.notifs?.weatherDesc || 'Incoming rain detected.', type: 'weather', timestamp: '2h ago' },
    { id: '2', title: t.notifs?.priceTitle || 'Mandi Alert', description: t.notifs?.priceDesc || 'Wheat prices increased.', type: 'price', timestamp: '5h ago' },
    { id: '3', title: 'Crop Protection', description: 'Optimal time for pesticide application in your region.', type: 'system', timestamp: '10h ago' }
  ];

  return (
    <header className={`backdrop-blur-3xl border-b h-24 flex items-center sticky top-0 z-40 transition-all ${isDarkMode ? 'bg-[#0a0a0c]/90 border-white/10' : 'bg-white/90 border-stone-200 shadow-sm'}`}>
      <div className="max-w-full w-full mx-auto px-6 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="md:hidden cursor-pointer" onClick={() => onNavigate(AppSection.Dashboard)}>
            <span className="text-xl font-black italic tracking-tighter uppercase text-emerald-600">KB</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t.realTimeWeather}</span>
            <span className={`text-sm font-black transition-colors ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>28°C • {t.weatherStatus}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onThemeToggle}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm border ${isDarkMode ? 'bg-white/5 text-amber-400 border-white/10' : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'}`}
            title="Toggle Theme"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          {/* Integrated Language Pill */}
          <div className={`flex items-center gap-2 border rounded-2xl px-4 py-3 transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-stone-200 shadow-sm'}`}>
             <i className="fas fa-globe text-[10px] text-emerald-600"></i>
             <select 
                value={lang}
                onChange={(e) => onLangChange(e.target.value as Language)}
                className={`text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer bg-transparent ${isDarkMode ? 'text-white' : 'text-stone-900'}`}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
                <option value="ml">മലയാളം</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
              </select>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative w-12 h-12 rounded-2xl border transition shadow-sm flex items-center justify-center ${
                showNotifications 
                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                  : `${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-stone-200 text-stone-900 hover:border-emerald-500'}`
              }`}
            >
              <i className="fas fa-bell text-sm"></i>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full animate-pulse border border-white"></span>
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                <div className={`absolute top-16 right-0 w-80 p-5 rounded-[2.5rem] shadow-3xl border animate-slideUp z-50 overflow-hidden ${isDarkMode ? 'bg-stone-900 border-white/10' : 'bg-white border-stone-200'}`}>
                  <div className="flex justify-between items-center mb-4 px-2">
                    <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Recent Alerts</h4>
                    <button onClick={() => setShowNotifications(false)} className="text-stone-400 hover:text-red-500"><i className="fas fa-times"></i></button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-4 rounded-2xl transition-colors border border-transparent ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-stone-50 hover:bg-emerald-50 hover:border-emerald-100'}`}>
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'weather' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            <i className={`fas ${n.type === 'weather' ? 'fa-cloud-rain' : 'fa-circle-exclamation'}`}></i>
                          </div>
                          <div>
                            <p className={`text-[11px] font-black transition-colors ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{n.title}</p>
                            <p className="text-[10px] text-stone-500 leading-tight mt-1">{n.description}</p>
                            <p className="text-[8px] text-stone-400 mt-2 font-bold uppercase">{n.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </header>
  );
};

export default Header;
