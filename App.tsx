
import React, { useState, useEffect, useRef } from 'react';
import { AppSection, MandiPrice, Language } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MandiPriceChart from './components/MandiPriceChart';
import WeatherAdvisory from './components/WeatherAdvisory';
import ToolRental from './components/ToolRental';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import LandingPage from './components/LandingPage';
import SarkariYojana from './components/SarkariYojana';
import CropDetail from './components/CropDetail';
import Profile from './components/Profile';
import Tracking from './components/Tracking';
import { fetchMandiPrices } from './services/predictionService';
import { getCropDiagnostic } from './services/geminiService';
import { translations } from './services/translations';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Dashboard);
  const [mandiData, setMandiData] = useState<MandiPrice[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognitionRef = useRef<any>(null);

  const t = translations[lang];

  useEffect(() => {
    if (isLoggedIn && activeSection === AppSection.Prices) {
      fetchMandiPrices(selectedCrop).then(setMandiData);
    }
  }, [selectedCrop, isLoggedIn, activeSection]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleVoiceAssistant = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setVoiceInput(transcript);
          setActiveSection(AppSection.Chat);
          setIsListening(false);
        };
      }
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleNavigate = (section: AppSection, params?: any) => {
    setActiveSection(section);
    if (params?.initialMessage) {
      setVoiceInput(params.initialMessage);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setShowLanding(true);
    setActiveSection(AppSection.Dashboard);
  };

  const handleCapture = async () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(videoRef.current, 0, 0, 640, 480);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      const base64 = dataUrl.split(',')[1];
      try {
        const result = await getCropDiagnostic(base64, selectedCrop);
        setDiagnosticResult(result);
        setIsCapturing(false);
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      } catch (err) { console.error(err); }
    }
  };

  const startCamera = async () => {
    setIsCapturing(true);
    setDiagnosticResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) { console.error(err); }
  };

  if (showLanding) {
    return <LandingPage lang={lang} onLangChange={setLang} onStart={() => setShowLanding(false)} />;
  }

  if (!isLoggedIn) {
    return <Auth onLogin={(selectedLang) => { setLang(selectedLang); setIsLoggedIn(true); }} />;
  }

  return (
    <div className={`flex h-screen transition-colors duration-500 font-sans relative overflow-hidden ${isDarkMode ? 'bg-[#0a0a0c] text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      <Sidebar onNavigate={handleNavigate} activeSection={activeSection} lang={lang} onSignOut={handleSignOut} isDarkMode={isDarkMode} />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <Header 
          onNavigate={handleNavigate} 
          activeSection={activeSection} 
          lang={lang} 
          onLangChange={setLang} 
          isAssistantActive={isListening} 
          onThemeToggle={toggleTheme}
          isDarkMode={isDarkMode}
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 bg-transparent">
          <div className="animate-sectionEnter max-w-7xl mx-auto h-full">
            {activeSection === AppSection.Dashboard && <Dashboard lang={lang} onNavigate={handleNavigate} isDarkMode={isDarkMode} />}
            {activeSection === AppSection.Profile && <Profile lang={lang} isDarkMode={isDarkMode} />}
            {activeSection === AppSection.Chat && <ChatAssistant lang={lang} onVoiceToggle={toggleVoiceAssistant} isListening={isListening} externalMessage={voiceInput} isDarkMode={isDarkMode} />}
            {activeSection === AppSection.SarkariYojana && <SarkariYojana lang={lang} onNavigate={handleNavigate} isDarkMode={isDarkMode} />}
            {activeSection === AppSection.Weather && <WeatherAdvisory isDarkMode={isDarkMode} />}
            {activeSection === AppSection.Rental && <ToolRental lang={lang} isDarkMode={isDarkMode} />}
            {activeSection === AppSection.CropDetail && <CropDetail lang={lang} isDarkMode={isDarkMode} />}
            {activeSection === AppSection.Tracking && <Tracking lang={lang} isDarkMode={isDarkMode} />}
            
            {activeSection === AppSection.Prices && (
              <div className="space-y-8 animate-fadeIn">
                <div className={`flex flex-wrap gap-4 items-center justify-between p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-white/5 border-white/5 shadow-xl' : 'bg-white border-stone-200 shadow-md'}`}>
                  <div className="flex flex-wrap gap-3">
                    {Object.keys(t.crops).map(crop => (
                      <button 
                        key={crop} 
                        onClick={() => setSelectedCrop(crop)} 
                        className={`px-6 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${
                          selectedCrop === crop 
                            ? 'bg-emerald-700 text-white shadow-xl scale-105' 
                            : isDarkMode ? 'bg-white/5 text-stone-500 border border-white/5 hover:bg-white/10' : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-emerald-50'
                        }`}
                      >
                        {t.crops[crop as keyof typeof t.crops]}
                      </button>
                    ))}
                  </div>
                </div>
                <MandiPriceChart data={mandiData} cropName={t.crops[selectedCrop as keyof typeof t.crops]} />
              </div>
            )}

            {activeSection === AppSection.Diagnostic && (
               <div className={`max-w-5xl mx-auto backdrop-blur-3xl p-12 rounded-[4rem] border shadow-3xl ${isDarkMode ? 'bg-stone-900/40 border-white/10 text-white' : 'bg-white border-stone-200 text-stone-900'}`}>
                 <div className="flex justify-between items-start mb-12">
                    <div>
                      <h2 className="text-4xl font-black italic uppercase tracking-tighter">AI Diagnostic Vision</h2>
                      <p className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Next-Gen Crop Pathogen Analysis</p>
                    </div>
                 </div>

                 {!isCapturing && !diagnosticResult && (
                   <div className={`border-2 border-dashed rounded-[3rem] p-24 flex flex-col items-center justify-center transition-all cursor-pointer group animate-pulse ${isDarkMode ? 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50' : 'border-stone-200 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-400'}`} onClick={startCamera}>
                     <div className="w-20 h-20 bg-emerald-700 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                      <i className="fas fa-camera text-3xl text-white"></i>
                     </div>
                     <p className="text-sm font-black uppercase tracking-widest text-stone-400">Tap to Scan Infected Crop</p>
                   </div>
                 )}

                 {diagnosticResult && (
                   <div className="animate-slideUp space-y-10">
                      <div className={`p-10 rounded-[3rem] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-emerald-50/50 border-emerald-100'}`}>
                         <div className="flex justify-between items-start mb-8">
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-2 block">Detection Result</span>
                              <h3 className="text-4xl font-black italic uppercase text-emerald-700">{lang === 'hi' ? diagnosticResult.disease_name_hi : diagnosticResult.disease_name_en}</h3>
                              <p className="text-stone-500 font-bold text-xs mt-1">Found in {diagnosticResult.crop_name}</p>
                            </div>
                            <div className="text-right">
                               <span className="text-4xl font-black text-emerald-600">{diagnosticResult.confidence_level}%</span>
                               <p className="text-[9px] font-black text-stone-500 uppercase">AI Confidence</p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <h4 className="text-xs font-black uppercase tracking-widest text-emerald-700 flex items-center gap-2"><i className="fas fa-leaf"></i> Organic Remedy</h4>
                               <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{lang === 'hi' ? diagnosticResult.organic_remedy_hi : diagnosticResult.organic_remedy_en}</p>
                            </div>
                            <div className="space-y-4">
                               <h4 className="text-xs font-black uppercase tracking-widest text-red-600 flex items-center gap-2"><i className="fas fa-flask"></i> Chemical Prescription</h4>
                               <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{diagnosticResult.chemical_prescription}</p>
                            </div>
                         </div>
                      </div>
                      <button onClick={() => setDiagnosticResult(null)} className="w-full bg-emerald-700 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-800 transition-all active:scale-95 shadow-xl">Start New Scan</button>
                   </div>
                 )}

                 {isCapturing && (
                   <div className="relative rounded-[3rem] overflow-hidden bg-black aspect-video border-4 border-emerald-500/30">
                     <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                     <div className="absolute bottom-10 inset-x-0 flex justify-center gap-6">
                       <button onClick={handleCapture} className="w-16 h-16 bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white animate-pulse"><i className="fas fa-camera"></i></button>
                       <button onClick={() => setIsCapturing(false)} className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center"><i className="fas fa-times"></i></button>
                     </div>
                   </div>
                 )}
               </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}; border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sectionEnter { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-sectionEnter { animation: sectionEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
