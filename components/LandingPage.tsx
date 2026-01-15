
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface LandingPageProps {
  onStart: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const backgroundImages = [
  'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1622383529984-84687000216b?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=1920'
];

const LandingPage: React.FC<LandingPageProps> = ({ onStart, lang, onLangChange }) => {
  const t = translations[lang];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-emerald-500/30 overflow-x-hidden font-sans scroll-smooth">
      {/* Background Slideshow Layer */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${idx === bgIndex ? 'opacity-40' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-stone-50/60 to-stone-50/90" />
      </div>

      {/* Top Govt Utility Bar */}
      <div className="relative z-[70] bg-emerald-900 text-white py-2 px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-emerald-950">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><i className="fas fa-landmark text-emerald-400"></i> Government of India • Digital Agriculture Mission</span>
          <div className="hidden md:flex gap-4 border-l border-emerald-800 pl-6">
             <button className="hover:text-emerald-300">A-</button>
             <button className="hover:text-emerald-300">A</button>
             <button className="hover:text-emerald-300">A+</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-emerald-400">Select Language:</span>
           <div className="flex gap-3">
             {['en', 'hi', 'ta', 'te', 'pa', 'ml'].map(lCode => (
               <button 
                 key={lCode}
                 onClick={() => onLangChange(lCode as Language)}
                 className={`px-2 py-0.5 rounded transition-colors ${lang === lCode ? 'bg-white text-emerald-900' : 'hover:bg-emerald-800'}`}
               >
                 {lCode.toUpperCase()}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-3xl border-b border-stone-200 px-6 md:px-12 py-5 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4 animate-slideRight">
          <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-all">
            <i className="fas fa-wheat-awn text-white text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase leading-none text-emerald-900 italic">KHETBUDDY</span>
            <span className="text-[9px] font-black text-stone-500 uppercase tracking-[0.4em] mt-1">Smart Agriculture Portal</span>
          </div>
        </div>
        
        <div className="flex items-center gap-10 animate-slideLeft">
          <div className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-widest text-stone-600">
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-emerald-700 hover:scale-105 transition-all">Key Features</a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-emerald-700 hover:scale-105 transition-all">Services</a>
            <a href="#flow" onClick={(e) => handleNavClick(e, 'flow')} className="hover:text-emerald-700 hover:scale-105 transition-all">How it works</a>
            <a href="#mission" onClick={(e) => handleNavClick(e, 'mission')} className="hover:text-emerald-700 hover:scale-105 transition-all">Our Mission</a>
          </div>
          <button onClick={onStart} className="bg-emerald-700 text-white px-12 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-800 transition-all shadow-2xl hover:scale-105 active:scale-95">
            Log In to Portal
          </button>
        </div>
      </nav>

      {/* News Ticker */}
      <div className="relative z-40 bg-emerald-50 border-b border-emerald-100 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker items-center">
          <span className="inline-flex items-center gap-2 mx-8 text-[11px] font-black uppercase text-emerald-800">
            <i className="fas fa-bullhorn text-emerald-600"></i> New Mandi Minimum Support Price (MSP) announced for 2025 Rabi season.
          </span>
          <span className="inline-flex items-center gap-2 mx-8 text-[11px] font-black uppercase text-emerald-800">
            <i className="fas fa-circle-check text-emerald-600"></i> Over 25,000 farmers now integrated into the P2P Resource Grid.
          </span>
          <span className="inline-flex items-center gap-2 mx-8 text-[11px] font-black uppercase text-emerald-800">
            <i className="fas fa-cloud-bolt text-red-600"></i> Weather Alert: Heavy precipitation predicted for Central India in the next 48 hours.
          </span>
          <span className="inline-flex items-center gap-2 mx-8 text-[11px] font-black uppercase text-emerald-800">
            <i className="fas fa-landmark text-emerald-600"></i> Pradhan Mantri Fasal Bima Yojana registration extended until end of month.
          </span>
        </div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-40 md:py-60 min-h-[90vh]">
          <div className="max-w-6xl w-full">
            <div className="animate-slideUp">
              <div className="inline-flex items-center gap-3 bg-emerald-100/80 backdrop-blur-md text-emerald-800 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-12 border border-emerald-200 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                Empowering India's Backbone
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-stone-900 uppercase tracking-tighter mb-10 leading-[0.8] italic drop-shadow-2xl">
                FUTURE OF<br/><span className="text-emerald-700">FARMING</span>
              </h1>
              <p className="text-base md:text-xl text-stone-700 font-bold max-w-3xl mx-auto leading-relaxed mb-20 uppercase tracking-[0.1em] opacity-90">
                A Unified Digital Ecosystem for Indian Farmers. Predictive Pricing, AI Pathology, and Shared Resource Networks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-10 justify-center items-center animate-slideUp [animation-delay:0.4s]">
              <button onClick={onStart} className="w-full sm:w-auto px-20 py-8 bg-emerald-800 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-900 transition-all shadow-[0_30px_60px_-15px_rgba(6,78,59,0.5)] hover:-translate-y-2 group">
                Access Portal <i className="fas fa-arrow-right ml-4 group-hover:translate-x-2 transition-transform"></i>
              </button>
              <button onClick={() => handleNavClick({preventDefault:()=>null} as any, 'features')} className="w-full sm:w-auto px-12 py-8 bg-white text-emerald-900 border-2 border-emerald-900 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-2">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Detailed Key Features Section */}
        <section id="features" className="py-40 px-6 bg-white border-y border-stone-200">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-10">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.8em] text-emerald-700">Advanced Intelligence</h3>
                    <h2 className="text-5xl md:text-7xl font-black text-stone-900 uppercase tracking-tighter italic leading-none">The KhetBuddy Advantage</h2>
                    <p className="text-stone-600 text-lg leading-relaxed font-medium">We deploy state-of-the-art AI and Satellite imagery to provide hyper-local, actionable insights that were previously only available to industrial farming corporations.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0"><i className="fas fa-microchip"></i></div>
                          <div>
                             <h4 className="font-black uppercase text-xs mb-1">Neural Mandi</h4>
                             <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Predictive price modeling.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0"><i className="fas fa-satellite"></i></div>
                          <div>
                             <h4 className="font-black uppercase text-xs mb-1">Satellite Vision</h4>
                             <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Growth monitoring via orbit.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0"><i className="fas fa-shield-virus"></i></div>
                          <div>
                             <h4 className="font-black uppercase text-xs mb-1">Pathogen AI</h4>
                             <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Instant disease diagnosis.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0"><i className="fas fa-handshake"></i></div>
                          <div>
                             <h4 className="font-black uppercase text-xs mb-1">P2P Sharing</h4>
                             <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Community resource rental.</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="relative group">
                    <div className="absolute -inset-4 bg-emerald-700/10 rounded-[4rem] blur-3xl group-hover:bg-emerald-700/20 transition-all"></div>
                    <img src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=1200" alt="Tech Farming" className="relative rounded-[4rem] shadow-3xl border-4 border-white transition-transform group-hover:scale-[1.02]" />
                    <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-white">
                       <span className="text-[10px] font-black uppercase text-emerald-700 tracking-widest mb-2 block">Efficiency Boost</span>
                       <p className="text-2xl font-black text-stone-900 uppercase italic">+35% Crop Yield Potential</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Services Matrix */}
        <section id="services" className="py-40 px-6 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-32">
              <h3 className="text-[11px] font-black uppercase tracking-[0.8em] text-emerald-700 mb-6">Expert Solutions</h3>
              <h2 className="text-5xl md:text-7xl font-black text-stone-900 uppercase tracking-tighter italic leading-none">Services for the Modern Farmer</h2>
              <div className="w-40 h-2 bg-emerald-600 mt-10 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: 'fa-chart-pie', title: 'Mandi Intel', desc: 'Forecast prices for major commodities across 500+ Mandis.', long: 'Utilizing LSTM and Random Forest models to predict price fluctuations with up to 94% accuracy.' },
                { icon: 'fa-cloud-bolt', title: 'Geo-Weather', desc: 'Satellite mapping of precipitation and soil moisture.', long: 'Hyper-localized weather advisories helping farmers decide optimal sowing and harvest windows.' },
                { icon: 'fa-robot', title: 'Diagnostic AI', desc: 'Identify 400+ pests and pathogens instantly.', long: 'Upload a leaf photo and receive immediate organic and chemical remedy prescriptions from Gemini AI.' },
                { icon: 'fa-landmark', title: 'Sarkari Welfare', desc: 'Direct access to Central & State schemes.', long: 'Check eligibility and apply for PM-Kisan, Fasal Bima Yojana, and local subsidy programs seamlessly.' }
              ].map((service, i) => (
                <div key={i} className={`bg-white p-14 rounded-[4rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 group animate-slideUp cursor-pointer`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-700 rounded-3xl flex items-center justify-center mb-12 shadow-inner group-hover:bg-emerald-700 group-hover:text-white transition-all transform group-hover:rotate-12">
                    <i className={`fas ${service.icon} text-3xl`}></i>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-stone-900 mb-6 group-hover:text-emerald-700 transition-colors">{service.title}</h4>
                  <p className="text-stone-500 text-xs font-bold leading-relaxed mb-6 uppercase tracking-widest">{service.desc}</p>
                  <p className="text-stone-400 text-[10px] leading-relaxed group-hover:text-stone-600 transition-colors">{service.long}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Pipeline - How it Works */}
        <section id="flow" className="py-40 px-6 bg-emerald-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-emerald-700/10 rounded-full blur-[200px] translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-32">
              <h3 className="text-[11px] font-black uppercase tracking-[0.8em] text-emerald-400 mb-6">Operational Flow</h3>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">The Intelligence Pipeline</h2>
              <p className="mt-8 text-emerald-200/60 max-w-2xl mx-auto uppercase tracking-widest font-bold text-xs">Seamless integration of space-tech and ground reality.</p>
            </div>

            <div className="relative">
              {/* Connector line for desktop */}
              <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-1 bg-emerald-800/50 rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                 {[
                  { icon: 'fa-satellite-dish', title: 'Data Ingestion', desc: 'We ingest multispectral satellite data, soil sensors, and daily Mandi arrival statistics.' },
                  { icon: 'fa-brain-circuit', title: 'AI Processing', desc: 'Our neural networks process data to generate crop health scores and price forecasts.' },
                  { icon: 'fa-mobile-retro', title: 'Voice Delivery', desc: 'Actionable insights are pushed in native languages with simple voice-assisted interfaces.' },
                  { icon: 'fa-chart-line-up', title: 'Economic Growth', desc: 'Farmers secure better prices and higher yields, stabilizing the rural economy.' }
                 ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                     <div className="w-36 h-36 bg-emerald-900 border-4 border-emerald-800 rounded-[3.5rem] flex items-center justify-center mb-12 shadow-2xl group-hover:border-emerald-400 transition-all duration-500 relative z-10">
                        <span className="absolute -top-4 -left-4 w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-xl">0{i+1}</span>
                        <i className={`fas ${step.icon} text-4xl text-emerald-600 group-hover:text-emerald-400 transition-all`}></i>
                     </div>
                     <h4 className="font-black text-xl uppercase italic mb-4 tracking-tighter text-emerald-100">{step.title}</h4>
                     <p className="text-emerald-300/60 text-[11px] font-bold leading-relaxed uppercase tracking-widest px-6">{step.desc}</p>
                  </div>
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section id="mission" className="py-40 px-6 bg-white relative overflow-hidden border-b border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
               <div className="order-2 lg:order-1">
                  <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1200" alt="Farmer Vision" className="rounded-[4rem] shadow-3xl border-2 border-stone-100" />
               </div>
               <div className="space-y-12 order-1 lg:order-2">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.8em] text-emerald-700">The Philosophy</h3>
                  <h2 className="text-5xl md:text-7xl font-black text-stone-900 uppercase tracking-tighter italic leading-[0.9]">Digitizing Bharat's Agriculture</h2>
                  <p className="text-stone-600 text-xl leading-relaxed font-medium">
                    Our mission is to bridge the data gap in Indian agriculture. We believe that every farmer, regardless of land size or technical literacy, deserves access to institutional-grade intelligence.
                  </p>
                  <div className="space-y-8">
                     {[
                       { title: 'Democratizing AI', desc: 'Bringing world-class pathology models to every smartphone.' },
                       { title: 'Price Fairness', desc: 'Empowering smallholders with predictive bargaining power.' },
                       { title: 'Resource Efficiency', desc: 'Shared P2P grid to reduce mechanical expenditure by 40%.' }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 items-start group">
                          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                             <i className="fas fa-check"></i>
                          </div>
                          <div>
                             <h5 className="font-black uppercase text-sm mb-1">{item.title}</h5>
                             <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
              <div className="col-span-1 md:col-span-2 space-y-8">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                     <i className="fas fa-wheat-awn text-white"></i>
                   </div>
                   <span className="text-2xl font-black tracking-tighter uppercase text-white italic">KHETBUDDY</span>
                 </div>
                 <p className="text-stone-500 text-xs font-bold leading-relaxed max-w-sm uppercase tracking-widest">
                   KhetBuddy is a flagship initiative designed to provide end-to-end digital solutions for the farming community. Designed and developed by the Agri-Tech Mission Team.
                 </p>
                 <div className="flex gap-4">
                    <i className="fab fa-facebook text-xl text-stone-600 hover:text-white cursor-pointer transition-colors"></i>
                    <i className="fab fa-twitter text-xl text-stone-600 hover:text-white cursor-pointer transition-colors"></i>
                    <i className="fab fa-linkedin text-xl text-stone-600 hover:text-white cursor-pointer transition-colors"></i>
                 </div>
              </div>
              <div className="space-y-6">
                 <h5 className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.4em]">Navigation</h5>
                 <ul className="space-y-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">
                    <li><a href="#" className="hover:text-white">Home</a></li>
                    <li><a href="#features" className="hover:text-white">Features</a></li>
                    <li><a href="#services" className="hover:text-white">Services</a></li>
                    <li><a href="#mission" className="hover:text-white">About Us</a></li>
                 </ul>
              </div>
              <div className="space-y-6">
                 <h5 className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.4em]">Help & Info</h5>
                 <ul className="space-y-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">
                    <li><a href="#" className="hover:text-white">Grievance Portal</a></li>
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                    <li><a href="#" className="hover:text-white">Support Desk</a></li>
                 </ul>
              </div>
           </div>
           <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-stone-600 font-black uppercase tracking-[0.4em]">
              <div className="flex items-center gap-2">
                 <span>© 2025 KhetBuddy Ecosystem • Unified Farmer Portal</span>
              </div>
              <div className="flex items-center gap-6">
                 <span>Hosted by National Informatics Centre (NIC) Simulation</span>
                 <span className="text-emerald-800">|</span>
                 <span>Content Managed by Ministry of Agriculture</span>
              </div>
           </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideRight { animation: slideRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slideLeft { animation: slideLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slideUp { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default LandingPage;
