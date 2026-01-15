
import React, { useState } from 'react';
import { ToolItem, Language } from '../types';
import { translations } from '../services/translations';

interface ToolDetail extends ToolItem {
  specs: { label: string; value: string }[];
  rating: number;
  reviews: number;
}

interface ToolRentalProps {
  lang: Language;
  isDarkMode?: boolean;
}

const mockTools: ToolDetail[] = [
  { 
    id: '1', 
    name: 'Swaraj 855 FE Tractor', 
    owner: 'Shri Gagan Deep', 
    pricePerDay: 1200, 
    available: true, 
    distance: '1.2 km', 
    category: 'Tractor',
    rating: 4.9,
    reviews: 45,
    specs: [{ label: 'Power', value: '52 HP' }, { label: 'Condition', value: 'Excellent' }],
    contactNumber: '+91 98270 12345',
    address: 'Sehore Mandi Road, Opp. Kali Mandir'
  },
  { 
    id: '2', 
    name: 'Mahindra Jivo 225 DI', 
    owner: 'Ramesh Singh', 
    pricePerDay: 900, 
    available: false, 
    distance: '3.5 km', 
    category: 'Tractor',
    rating: 4.7,
    reviews: 32,
    specs: [{ label: 'Power', value: '20 HP' }, { label: 'Type', value: 'Mini' }],
    contactNumber: '+91 94250 54321',
    address: 'Gram Vidisha, Bhopal Bypass'
  },
  { 
    id: '3', 
    name: 'High-Pressure Sprayer 50L', 
    owner: 'Anil Kumar', 
    pricePerDay: 350, 
    available: true, 
    distance: '0.8 km', 
    category: 'Sprayer',
    rating: 4.8,
    reviews: 18,
    specs: [{ label: 'Tank', value: '50 Litres' }, { label: 'Range', value: '15 ft' }],
    contactNumber: '+91 88123 99887',
    address: 'Kisan Ganj Colony, Sehore'
  },
  { 
    id: '4', 
    name: 'Rotavator S-90 Heavy', 
    owner: 'Dilip Patel', 
    pricePerDay: 800, 
    available: true, 
    distance: '2.1 km', 
    category: 'Rotavator',
    rating: 4.6,
    reviews: 21,
    specs: [{ label: 'Width', value: '6 ft' }, { label: 'Blades', value: '42' }],
    contactNumber: '+91 91223 34455',
    address: 'Patel Farmhouse, Vidisha'
  },
  { 
    id: '5', 
    name: 'Seed Drill Machine', 
    owner: 'Sunil Sharma', 
    pricePerDay: 500, 
    available: true, 
    distance: '5.0 km', 
    category: 'Seed Drill',
    rating: 4.8,
    reviews: 14,
    specs: [{ label: 'Tines', value: '9' }, { label: 'Capacity', value: '50kg' }],
    contactNumber: '+91 99887 76655',
    address: 'Sharma Agri Center, Raisen'
  }
];

const ToolRental: React.FC<ToolRentalProps> = ({ lang, isDarkMode = false }) => {
  const t = translations[lang];
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBookingTool, setSelectedBookingTool] = useState<ToolDetail | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookingState, setBookingState] = useState<'idle' | 'processing' | 'success'>('idle');

  const categories = ['All', 'Tractor', 'Plow', 'Sprayer', 'Harvester', 'Rotavator', 'Seed Drill'];
  const statuses = ['All', 'Available', 'In Use'];

  const filteredTools = mockTools.filter(tool => {
    const matchesCategory = categoryFilter === 'All' || tool.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Available' ? tool.available : !tool.available);
    return matchesCategory && matchesStatus;
  });

  const handleBooking = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    
    setBookingState('processing');
    
    // Simulated Secure Transaction
    setTimeout(() => {
      setBookingState('success');
      setTimeout(() => {
        setBookingState('idle');
        setSelectedBookingTool(null);
        setPaymentMethod(null);
      }, 3500);
    }, 2500);
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-stone-200 dark:border-white/10 pb-10">
        <div>
          <h2 className={`text-4xl md:text-5xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>Rental Hub</h2>
          <p className="text-emerald-700 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">Community Resource Sharing Network</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-700 text-white px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-emerald-800 transition shadow-[0_20px_40px_-10px_rgba(5,150,105,0.4)] active:scale-95 flex items-center gap-3"
        >
          <i className="fas fa-plus"></i> {t.listEquipment}
        </button>
      </div>

      <div className="flex flex-wrap gap-8 items-center bg-stone-100/50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-stone-200 dark:border-white/5 shadow-inner">
        <div className="space-y-3">
           <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.4em] ml-2">Filter by Category</label>
           <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-3 rounded-2xl whitespace-nowrap font-black uppercase tracking-widest text-[9px] transition-all border shadow-sm ${
                  categoryFilter === cat 
                    ? 'bg-emerald-700 text-white border-emerald-700' 
                    : `${isDarkMode ? 'bg-stone-900 text-stone-400 border-white/10 hover:bg-white/10' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}`
                }`}
              >
                {cat}
              </button>
            ))}
           </div>
        </div>
        <div className="space-y-3">
           <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.4em] ml-2">Availability Status</label>
           <div className="flex gap-2">
            {statuses.map(stat => (
              <button 
                key={stat}
                onClick={() => setStatusFilter(stat)}
                className={`px-6 py-3 rounded-2xl whitespace-nowrap font-black uppercase tracking-widest text-[9px] transition-all border shadow-sm ${
                  statusFilter === stat 
                    ? 'bg-emerald-700 text-white border-emerald-700' 
                    : `${isDarkMode ? 'bg-stone-900 text-stone-400 border-white/10 hover:bg-white/10' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}`
                }`}
              >
                {stat}
              </button>
            ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTools.map(tool => (
          <div key={tool.id} className={`group p-10 rounded-[3.5rem] border transition-all duration-500 shadow-xl flex flex-col h-full hover:-translate-y-2 ${
            isDarkMode ? 'bg-stone-900 border-white/10' : 'bg-white border-stone-200 hover:border-emerald-500'
          }`}>
            <div className="flex justify-between items-start mb-8">
               <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-3xl flex items-center justify-center shadow-inner group-hover:bg-emerald-700 group-hover:text-white transition-all transform group-hover:rotate-12">
                 <i className={`fas ${tool.category === 'Tractor' ? 'fa-tractor' : 'fa-gear'} text-3xl`}></i>
               </div>
               <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${tool.available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                 {tool.available ? 'Available' : 'Booked'}
               </span>
            </div>

            <h4 className={`font-black text-2xl italic uppercase tracking-tighter mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-stone-900 group-hover:text-emerald-700'}`}>{tool.name}</h4>
            <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest mb-8 border-b border-stone-100 dark:border-white/5 pb-4">Owner: {tool.owner}</p>

            <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
               {tool.specs.map((s, idx) => (
                 <div key={idx} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100 group-hover:bg-white transition-colors'}`}>
                    <p className="text-[8px] font-black uppercase text-stone-400 mb-1">{s.label}</p>
                    <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{s.value}</p>
                 </div>
               ))}
            </div>

            <div className="flex items-center justify-between mb-8 pt-6 border-t border-stone-50 dark:border-white/5">
               <div>
                 <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>₹{tool.pricePerDay}<span className="text-xs font-bold text-stone-400">/day</span></p>
               </div>
               <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-900/30">
                  <i className="fas fa-star text-[10px]"></i>
                  <span className="font-black text-[11px]">{tool.rating} <span className="opacity-40 ml-1">({tool.reviews})</span></span>
               </div>
            </div>

            <button 
              onClick={() => tool.available && setSelectedBookingTool(tool)}
              disabled={!tool.available}
              className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-lg transition-all active:scale-95 ${
                tool.available ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'bg-stone-100 text-stone-400 cursor-not-allowed'
              }`}
            >
              {tool.available ? 'Reserve Now' : 'Currently Unavailable'}
            </button>
          </div>
        ))}
      </div>

      {/* Enhanced Booking Confirmation Modal */}
      {selectedBookingTool && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-md p-10 rounded-[3.5rem] border shadow-3xl overflow-hidden relative ${isDarkMode ? 'bg-stone-900 border-white/10 text-white' : 'bg-white border-stone-200 text-stone-900'}`}>
            
            {/* Success Overlay */}
            {bookingState === 'success' && (
              <div className="absolute inset-0 bg-emerald-600 flex flex-col items-center justify-center text-white z-[60] animate-popIn">
                 <div className="w-28 h-28 bg-white/20 rounded-[2.5rem] flex items-center justify-center mb-8 border-4 border-white/50 animate-bounce">
                    <i className="fas fa-check text-5xl"></i>
                 </div>
                 <h3 className="text-4xl font-black uppercase italic tracking-tighter">Reserved!</h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-3 opacity-80">Booking ID: #KB-{Math.floor(Math.random()*90000 + 10000)}</p>
                 <p className="mt-8 text-[9px] font-bold uppercase opacity-60">Redirecting to Dashboard...</p>
              </div>
            )}

            {/* Processing Overlay */}
            {bookingState === 'processing' && (
              <div className="absolute inset-0 bg-stone-950/95 flex flex-col items-center justify-center text-white z-[60]">
                 <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-10 shadow-[0_0_30px_rgba(16,185,129,0.3)]"></div>
                 <h3 className="text-2xl font-black uppercase tracking-tighter italic">Securing Gateway</h3>
                 <p className="text-[10px] font-bold uppercase tracking-[0.6em] mt-4 opacity-50 text-emerald-400">Authorized by KhetBuddy Pay</p>
              </div>
            )}

            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">Confirmation</h3>
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-2">Authorized Resource Allocation</p>
              </div>
              <button onClick={() => setSelectedBookingTool(null)} className="text-stone-400 hover:text-red-500 transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6 mb-10 bg-stone-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-stone-100 dark:border-white/5">
              <div className="flex justify-between items-end border-b border-stone-200 dark:border-white/10 pb-4">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Asset</span>
                <span className="text-sm font-black uppercase italic">{selectedBookingTool.name}</span>
              </div>
              <div className="flex justify-between items-end border-b border-stone-200 dark:border-white/10 pb-4">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Daily Rent</span>
                <span className="text-2xl font-black text-emerald-700 italic">₹{selectedBookingTool.pricePerDay}</span>
              </div>
              <div className="flex justify-between items-end border-b border-stone-200 dark:border-white/10 pb-4">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Duration</span>
                <span className="text-sm font-black uppercase">1 Day (Initial)</span>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] text-center">Secure Payment Gateway</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'upi', icon: 'fa-qrcode', label: 'UPI QR' },
                  { id: 'gpay', icon: 'fa-google-pay', label: 'G-Pay' }
                ].map(method => (
                  <button 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all ${
                      paymentMethod === method.id 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-inner' 
                        : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-white/5 text-stone-400 hover:border-emerald-200'
                    }`}
                  >
                    <i className={`fas ${method.icon} text-3xl`}></i>
                    <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleBooking}
              className="w-full bg-emerald-700 text-white py-6 rounded-[1.8rem] font-black uppercase tracking-widest text-[12px] shadow-2xl hover:bg-emerald-800 transition-all transform active:scale-95 flex items-center justify-center gap-4"
            >
              <i className="fas fa-shield-check"></i> Authorize & Reserve
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolRental;
