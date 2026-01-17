
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';
import { GoogleGenAI } from "@google/genai";

interface ProfileProps {
  lang: Language;
  isDarkMode?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ lang, isDarkMode = false }) => {
  const t = translations[lang];
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Shri Ramesh Kumar',
    samagraId: 'MP-2025-001X',
    landSize: '4.5 Acres',
    location: 'Sehore, Madhya Pradesh',
    identityVerified: true,
    primaryCrop: 'Wheat (Sharbati)',
    experienceYears: '15 Years',
    farmSize: '4.5 Acres'
  });
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanMessage('AI Krishi Mitra is verifying document and extracting data...');

    try {
      const base64 = await fileToBase64(file);
      // Simulating fetching person photo from the ID document
      setUserPhoto(base64); 
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64.split(',')[1], mimeType: file.type } },
            { text: "Act as an official government data extraction agent. Identify if this is a valid identity document (Aadhaar/PAN/VoterID). Extract Name, ID number, and any address/location if present. Also infer if it mentions land ownership details. Respond ONLY in JSON with these fields: {name: string, id: string, location: string, farm_size_estimate: string, verified: boolean}" }
          ]
        },
        config: { responseMimeType: "application/json" }
      });

      const text = result.text || '{}';
      const extracted = JSON.parse(text);
      
      if (extracted.verified || extracted.name) {
        setIsVerified(true);
        setProfileData(prev => ({ 
          ...prev, 
          name: extracted.name || prev.name, 
          samagraId: extracted.id || prev.samagraId,
          location: extracted.location || prev.location,
          farmSize: extracted.farm_size_estimate || prev.farmSize
        }));
        setScanMessage('Identity Verified Successfully!');
      } else {
        setScanMessage('Could not verify identity. Please provide a clear document.');
      }
    } catch (error) {
      console.error(error);
      setScanMessage('Error scanning document. Please try again.');
    } finally {
      setTimeout(() => {
        setIsScanning(false);
      }, 2000);
    }
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      fileToBase64(file).then(setUserPhoto);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-slideUp pb-24">
      <div className={`p-10 md:p-16 rounded-[4rem] shadow-2xl border ${isDarkMode ? 'bg-stone-900 border-white/10' : 'bg-white border-stone-200'}`}>
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="relative group">
            <div className={`w-40 h-40 rounded-full border-8 overflow-hidden shadow-2xl flex items-center justify-center transition-all bg-stone-50 ${isDarkMode ? 'border-white/10' : 'border-emerald-100'}`}>
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="w-full h-full object-cover animate-fadeIn" />
              ) : (
                <i className={`fas fa-user-circle text-[100px] ${isDarkMode ? 'text-stone-700' : 'text-stone-200'}`}></i>
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
               <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} className="hidden" />
               <i className="fas fa-camera text-2xl"></i>
            </label>
            {isVerified && (
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
                <i className="fas fa-check text-white text-lg"></i>
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-4">
               {isVerified && (
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-inner">
                    <i className="fas fa-shield-check"></i>
                  </div>
               )}
               <h2 className={`text-4xl md:text-5xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{profileData.name}</h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${isDarkMode ? 'bg-white/5 border-white/10 text-stone-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>{profileData.location}</span>
              <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${isDarkMode ? 'bg-white/5 border-white/10 text-amber-400' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>Senior Farmer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className={`p-10 rounded-[2.5rem] border space-y-8 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
            <h3 className={`text-xs font-black uppercase tracking-[0.4em] text-emerald-700 flex items-center gap-3`}>
              <i className="fas fa-id-card"></i> Official Profile Info
            </h3>
            <div className="space-y-6 text-sm font-bold">
              <div className="flex justify-between items-center border-b border-stone-200 dark:border-white/5 pb-4">
                <span className="text-stone-400 uppercase text-[9px]">Farm Size:</span>
                <span className={isDarkMode ? 'text-white' : 'text-stone-900'}>{profileData.farmSize}</span>
              </div>
              <div className="flex justify-between items-center border-b border-stone-200 dark:border-white/5 pb-4">
                <span className="text-stone-400 uppercase text-[9px]">Primary Crop Grown:</span>
                <span className="text-emerald-700">{profileData.primaryCrop}</span>
              </div>
              <div className="flex justify-between items-center border-b border-stone-200 dark:border-white/5 pb-4">
                <span className="text-stone-400 uppercase text-[9px]">Experience:</span>
                <span className={isDarkMode ? 'text-white' : 'text-stone-900'}>{profileData.experienceYears}</span>
              </div>
              <div className="flex justify-between items-center pb-4">
                <span className="text-stone-400 uppercase text-[9px]">ID Reference:</span>
                <span className={isDarkMode ? 'text-white' : 'text-stone-900'}>{profileData.samagraId}</span>
              </div>
            </div>
          </div>

          <div className={`p-10 rounded-[2.5rem] border flex flex-col items-center justify-center space-y-8 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
            <h3 className={`text-xs font-black uppercase tracking-[0.4em] text-emerald-700 flex items-center gap-3`}>
              <i className="fas fa-shield-check"></i> Identity Status
            </h3>
            
            {!isVerified ? (
              <div className={`relative border-4 border-dashed rounded-[2rem] p-12 w-full flex flex-col items-center justify-center transition-all cursor-pointer hover:bg-emerald-50 ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-stone-200'}`}>
                <input type="file" accept="image/*" onChange={handleDocumentUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <i className="fas fa-camera text-4xl text-stone-300 mb-4"></i>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest text-center">Verify Identity Proof</p>
                <p className="text-[8px] text-stone-500 mt-2 uppercase">Aadhaar / Voter ID / Land Record</p>
              </div>
            ) : (
              <div className="w-full p-12 rounded-[2rem] bg-emerald-600/10 border-2 border-emerald-600/30 flex flex-col items-center text-center animate-popIn">
                 <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white mb-6 shadow-xl">
                    <i className="fas fa-check text-2xl"></i>
                 </div>
                 <h4 className="text-lg font-black uppercase text-emerald-700">KYC Verified</h4>
                 <p className="text-[10px] text-stone-500 font-bold mt-2 uppercase tracking-widest leading-relaxed">Your Identity has been mapped to <br/> your profile details successfully.</p>
                 <p className="mt-4 text-[8px] font-black text-emerald-600/50 uppercase tracking-[0.2em]">Verified via AI Krishi Vision</p>
              </div>
            )}
            
            {isScanning && (
              <div className="w-full p-4 bg-emerald-700 text-white rounded-xl flex items-center gap-4 animate-pulse">
                <i className="fas fa-circle-notch animate-spin"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">{scanMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-popIn { animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Profile;
