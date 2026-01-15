
import React from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface CropDetailProps {
  lang: Language;
}

const mockSoilData = [
  { time: '06:00', moisture: 28 },
  { time: '09:00', moisture: 26 },
  { time: '12:00', moisture: 24 },
  { time: '15:00', moisture: 25 },
  { time: '18:00', moisture: 27 },
  { time: '21:00', moisture: 29 },
];

const CropDetail: React.FC<CropDetailProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fadeIn pb-24">
      {/* Hero Header */}
      <div className="bg-emerald-600 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-3xl">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/20">
              <i className="fas fa-wheat-awn text-3xl"></i>
            </div>
            <div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">{t.crops.Wheat} Status</h1>
              <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs mt-2">Variety: Sharbati Grade A</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-black uppercase text-emerald-200 tracking-widest mb-1 block">{t.growthStage}</span>
              <p className="text-xl font-black uppercase italic">Maturity</p>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-black uppercase text-emerald-200 tracking-widest mb-1 block">{t.cropStatus}</span>
              <p className="text-xl font-black uppercase italic">Excellent</p>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-black uppercase text-emerald-200 tracking-widest mb-1 block">{t.soilMoisture}</span>
              <p className="text-xl font-black uppercase italic">27%</p>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-black uppercase text-emerald-200 tracking-widest mb-1 block">{t.harvestReady}</span>
              <p className="text-xl font-black uppercase italic">~12 Days</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4 rotate-12">
          <i className="fas fa-wheat-awn text-[350px]"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Soil Moisture Graph */}
        <div className="lg:col-span-2 bg-stone-900/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] shadow-2xl">
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-8 flex items-center gap-3">
            <i className="fas fa-droplet text-blue-400"></i> {t.soilMoisture} Trend (Last 24h)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSoilData}>
                <defs>
                  <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} />
                <YAxis stroke="#ffffff30" fontSize={10} domain={[0, 40]} />
                <Tooltip 
                  contentStyle={{ background: '#0c0a09', border: '1px solid #ffffff10', borderRadius: '16px' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="moisture" stroke="#3b82f6" fillOpacity={1} fill="url(#moistureGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-stone-900/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] shadow-2xl">
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-8 flex items-center gap-3">
            <i className="fas fa-tasks text-amber-400"></i> {t.upcomingTasks}
          </h3>
          <div className="space-y-4">
            {[
              { task: 'Harvest Preparation', date: 'Oct 22', status: 'Pending' },
              { task: 'Equipment Check', date: 'Oct 24', status: 'Pending' },
              { task: 'Mandi Transport Setup', date: 'Oct 25', status: 'Pending' }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-sm font-black text-white italic">{t.task}</p>
                  <p className="text-[10px] text-stone-500 font-bold mt-1">{t.date}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-stone-600 group-hover:text-emerald-400 transition-colors">
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-8 hover:bg-emerald-600 hover:text-white transition-all">
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropDetail;
