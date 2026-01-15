
import React from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

const Tracking: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn pb-24">
      <div className="bg-indigo-600 p-16 rounded-[4rem] text-white relative overflow-hidden shadow-3xl">
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
               <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-4">BATCH LOGISTICS</h2>
               <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Tracking ID: KB-IND-8820-2025</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-indigo-500/20">
               <i className="fas fa-qrcode text-6xl text-stone-900"></i>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-stone-900/40 backdrop-blur-3xl border border-white/5 p-12 rounded-[3rem] shadow-2xl">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-10 flex items-center gap-3">
                  <i className="fas fa-truck-ramp-box text-indigo-400"></i> Journey Milestones
               </h3>
               <div className="space-y-12 relative pl-4">
                  <div className="absolute left-7 top-4 bottom-4 w-0.5 bg-indigo-500/20"></div>
                  {[
                    { event: 'Departure: Collection Center', date: 'Oct 12, 10:00 AM', icon: 'fa-warehouse', status: 'completed' },
                    { event: 'Quality Gate: NABL Testing', date: 'Oct 12, 02:30 PM', icon: 'fa-vial', status: 'completed' },
                    { event: 'In-Transit: NH-46 Highway', date: 'Live Updates', icon: 'fa-truck-fast', status: 'active' },
                    { event: 'Arrival: Regional Mandi Hub', date: 'Est: Oct 13, 08:00 AM', icon: 'fa-map-pin', status: 'pending' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-10 items-start relative group">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 border-2 transition-all ${
                         step.status === 'completed' ? 'bg-indigo-600 border-indigo-400 shadow-xl' : 
                         step.status === 'active' ? 'bg-white text-indigo-600 border-white animate-pulse scale-110 shadow-2xl' : 'bg-stone-800 border-stone-700 text-stone-600'
                       }`}>
                          <i className={`fas ${step.icon} text-lg`}></i>
                       </div>
                       <div>
                          <p className={`text-sm font-black uppercase tracking-widest ${step.status === 'active' ? 'text-white' : 'text-stone-300'}`}>{step.event}</p>
                          <p className="text-[11px] font-bold text-stone-500 mt-1">{step.date}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-stone-900/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] shadow-2xl">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-6">Real-Time Vitals</h3>
               <div className="space-y-4">
                  {[
                    { label: 'Temp', val: '24°C', status: 'Optimal' },
                    { label: 'Humidity', val: '45%', status: 'Optimal' },
                    { label: 'Shock', val: '0.2G', status: 'Safe' },
                  ].map((vital, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex justify-between items-center">
                       <div>
                          <span className="text-[8px] font-black text-stone-500 uppercase block mb-1">{vital.label}</span>
                          <span className="text-xl font-black text-white">{vital.val}</span>
                       </div>
                       <span className="text-[9px] font-black text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-lg">{vital.status}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-emerald-600/10 border border-emerald-500/20 p-10 rounded-[3rem]">
               <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Quality Certifications</h4>
               <div className="flex gap-4 flex-wrap">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white" title="ISO 22000"><i className="fas fa-certificate"></i></div>
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white" title="Organic Certified"><i className="fas fa-leaf"></i></div>
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white" title="FSSAI Verified"><i className="fas fa-shield-check"></i></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Tracking;