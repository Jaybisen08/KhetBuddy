
import React, { useState, useEffect, useRef } from 'react';
import { Message, Language } from '../types';
import { translations } from '../services/translations';
import { getKrishiAdvice } from '../services/geminiService';

interface ChatAssistantProps {
  lang: Language;
  onVoiceToggle: () => void;
  isListening: boolean;
  externalMessage?: string;
  isDarkMode?: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ lang, onVoiceToggle, isListening, externalMessage, isDarkMode = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: translations[lang].tagline, sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Fix: User can mute/unmute AI
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    if (externalMessage && externalMessage !== messages[messages.length - 1]?.text) {
      handleSend(externalMessage);
    }
  }, [externalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotThinking]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakResponse = (text: string) => {
    if (isMuted) return; // Respect user mute preference
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const langCodes: any = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN' };
    utter.lang = langCodes[lang];
    utter.pitch = 1.0; 
    utter.rate = 1.0;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsBotThinking(false);
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsBotThinking(true);
    try {
      const botResponseText = await getKrishiAdvice(text, lang);
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: botResponseText, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      speakResponse(botResponseText); // Fix: Trigger speech only after explicit user query
    } catch (error) {
      console.error(error);
    } finally {
      setIsBotThinking(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto h-[75vh] flex flex-col backdrop-blur-3xl rounded-[3rem] border shadow-3xl overflow-hidden relative transition-all ${isDarkMode ? 'bg-stone-900/40 border-white/10' : 'bg-white border-stone-200'}`}>
      <div className={`p-8 border-b flex justify-between items-center shrink-0 ${isDarkMode ? 'border-white/5 bg-indigo-600/10' : 'border-stone-100 bg-stone-50'}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-700 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform"><i className="fas fa-robot text-white text-xl"></i></div>
          <div>
            <h2 className={`text-xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>Krishi Mitra AI</h2>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Scientific Agri-Intelligence</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setIsMuted(!isMuted);
            if (!isMuted) window.speechSynthesis.cancel();
          }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isMuted ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}
          title={isMuted ? 'Unmute AI' : 'Mute AI'}
        >
          <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
            <div className={`max-w-[85%] p-6 rounded-[2.5rem] shadow-sm transition-all hover:shadow-md ${msg.sender === 'user' ? 'bg-indigo-700 text-white rounded-tr-none' : `${isDarkMode ? 'bg-white/5 border border-white/5 text-stone-100' : 'bg-stone-50 border border-stone-200 text-stone-900'} rounded-tl-none`}`}>
              <p className="text-[13px] leading-relaxed font-bold whitespace-pre-wrap">{msg.text}</p>
              <p className="text-[8px] opacity-40 mt-3 uppercase tracking-widest font-black">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        ))}
        {isBotThinking && (
          <div className="flex justify-start animate-pulse">
            <div className={`p-5 rounded-[2rem] flex gap-2 ${isDarkMode ? 'bg-white/5' : 'bg-stone-50'}`}>
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className={`p-8 border-t shrink-0 flex gap-4 ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white border-stone-100'}`}>
        <div className="flex gap-2">
           <button onClick={onVoiceToggle} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isListening ? 'bg-red-600 animate-pulse text-white shadow-lg' : `${isDarkMode ? 'bg-white/5 text-indigo-400' : 'bg-stone-100 text-indigo-700'}`}`}>
              <i className="fas fa-microphone-alt"></i>
           </button>
           {(isBotThinking || isSpeaking) && (
             <button onClick={stopSpeaking} className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-red-600/80 hover:bg-red-600 text-white animate-fadeIn shadow-lg">
                <i className="fas fa-stop"></i>
             </button>
           )}
        </div>
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder={t.ask} className={`flex-1 rounded-2xl px-8 text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500' : 'bg-stone-50 border border-stone-200 text-stone-900 focus:ring-2 focus:ring-indigo-700'}`} />
        <button onClick={() => handleSend()} className="w-14 h-14 bg-indigo-700 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg hover:bg-indigo-800 transition-all transform active:scale-90"><i className="fas fa-paper-plane"></i></button>
      </div>
      
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ChatAssistant;
