
import React from 'react';
import { AppSection, Language } from '../types';
import { translations } from '../services/translations';

interface SidebarProps {
  onNavigate: (section: AppSection) => void;
  activeSection: AppSection;
  lang: Language;
  onSignOut: () => void;
  isDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeSection, lang, onSignOut, isDarkMode = false }) => {
  const t = translations[lang];
  
  const navItems = [
    { id: AppSection.Profile, label: t.myProfile, icon: 'fa-user-circle' },
    { id: AppSection.Dashboard, label: t.kisanDashboard, icon: 'fa-table-columns' },
    { id: AppSection.Prices, label: t.mandi, icon: 'fa-indian-rupee-sign' },
    { id: AppSection.Weather, label: t.weatherIntelligence, icon: 'fa-cloud-sun' },
    { id: AppSection.Chat, label: t.chat, icon: 'fa-robot' },
    { id: AppSection.Diagnostic, label: t.diagnostic, icon: 'fa-leaf' },
    { id: AppSection.Rental, label: t.rentals, icon: 'fa-tractor' },
    { id: AppSection.Tracking, label: t.tracking, icon: 'fa-qrcode' },
    { id: AppSection.SarkariYojana, label: t.yojanaTitle, icon: 'fa-landmark' },
  ];

  return (
    <aside className={`hidden lg:flex flex-col w-72 h-screen sticky top-0 z-50 py-10 px-6 flex-shrink-0 border-r shadow-2xl transition-all duration-300 ${
      isDarkMode ? 'bg-[#0a0a0c] border-white/10' : 'bg-white border-stone-200'
    }`}>
      <div className="mb-14 px-2 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-lg mb-4">
          <i className="fas fa-wheat-awn text-white text-3xl"></i>
        </div>
        <div className="flex flex-col">
          <span className={`text-2xl font-black italic tracking-tighter uppercase leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            <span className="text-emerald-600">KHET</span>BUDDY
          </span>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mt-2">AGRI COMPANION</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar pr-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20' 
                  : `${isDarkMode ? 'text-stone-400 hover:bg-white/5 hover:text-white' : 'text-stone-700 hover:bg-emerald-50 hover:text-emerald-900'}`
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isActive ? 'bg-white/20 text-white shadow-inner' : `${isDarkMode ? 'bg-white/5 text-stone-500' : 'bg-stone-50 text-stone-400'} group-hover:scale-110 group-hover:text-emerald-600`
              }`}>
                <i className={`fas ${item.icon} text-lg`}></i>
              </div>
              <span className={`text-[11px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis transition-colors ${
                isActive ? 'opacity-100 text-white' : `opacity-100 ${isDarkMode ? 'text-stone-400' : 'text-stone-900'}`
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-stone-100'}`}>
        <button 
          onClick={onSignOut}
          className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${isDarkMode ? 'text-stone-500 hover:text-red-400 hover:bg-red-400/5' : 'text-stone-600 hover:text-red-600 hover:bg-red-50'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 text-stone-500' : 'bg-stone-50 text-stone-400'} group-hover:bg-red-100 group-hover:text-red-600`}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-stone-400' : 'text-stone-900'}`}>Sign Out</span>
        </button>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </aside>
  );
};

export default Sidebar;