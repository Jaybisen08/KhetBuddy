
import React, { useState } from 'react';
import { Language, AppSection } from '../types';
import { translations } from '../services/translations';

interface Scheme {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  eligibilityEn: string;
  eligibilityHi: string;
  benefitsEn: string;
  benefitsHi: string;
  documentsEn: string[];
  documentsHi: string[];
  applyLink: string;
  color: string;
}

const schemeData: Scheme[] = [
  {
    id: '1',
    nameEn: 'Mukhya Mantri Kisan Kalyan Yojana',
    nameHi: 'मुख्यमंत्री किसान कल्याण योजना',
    icon: 'fa-hand-holding-heart',
    eligibilityEn: 'Small and marginal farmers of MP who are beneficiaries of PM-Kisan.',
    eligibilityHi: 'मध्य प्रदेश के छोटे और सीमांत किसान जो पीएम-किसान के लाभार्थी हैं।',
    benefitsEn: '₹6,000 annual supplement provided in two installments by the State Government.',
    benefitsHi: 'राज्य सरकार द्वारा दो किस्तों में प्रदान की जाने वाली ₹6,000 की वार्षिक सहायता।',
    documentsEn: ['Aadhaar Card', 'Samagra ID', 'Land Records', 'Bank Passbook'],
    documentsHi: ['आधार कार्ड', 'समग्र आईडी', 'भू-अभिलेख', 'बैंक पासबुक'],
    applyLink: 'https://saara.mp.gov.in/',
    color: 'emerald'
  },
  {
    id: '2',
    nameEn: 'PM-Kisan Samman Nidhi',
    nameHi: 'पीएम-किसान सम्मान निधि',
    icon: 'fa-indian-rupee-sign',
    eligibilityEn: 'All landholding farmer families in India.',
    eligibilityHi: 'भारत के सभी भूमिधारक किसान परिवार।',
    benefitsEn: '₹6,000 annual direct income support in three equal installments.',
    benefitsHi: '₹2,000 की तीन समान किस्तों में ₹6,000 की वार्षिक सहायता।',
    documentsEn: ['Aadhaar Card', 'Land Documents', 'Bank Account'],
    documentsHi: ['आधार कार्ड', 'भूमि दस्तावेज', 'बैंक खाता'],
    applyLink: 'https://pmkisan.gov.in/',
    color: 'orange'
  },
  {
    id: '3',
    nameEn: 'PM Fasal Bima Yojana',
    nameHi: 'प्रधानमंत्री फसल बीमा योजना',
    icon: 'fa-shield-halved',
    eligibilityEn: 'Farmers suffering crop loss due to natural calamities.',
    eligibilityHi: 'प्राकृतिक आपदाओं के कारण फसल नुकसान झेलने वाले किसान।',
    benefitsEn: 'Insurance cover for all food crops, oilseeds, and commercial/horticultural crops.',
    benefitsHi: 'सभी खाद्य फसलों, तिलहन और वाणिज्यिक फसलों के लिए बीमा कवर।',
    documentsEn: ['Land Record', 'Sowing Certificate', 'Aadhaar', 'Passbook'],
    documentsHi: ['भू-अभिलेख', 'बुआई प्रमाण पत्र', 'आधार', 'बैंक पासबुक'],
    applyLink: 'https://pmfby.gov.in/',
    color: 'blue'
  },
  {
    id: '4',
    nameEn: 'Soil Health Card Scheme',
    nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
    icon: 'fa-vial',
    eligibilityEn: 'Every farmer owning land.',
    eligibilityHi: 'भूमि का स्वामित्व रखने वाला प्रत्येक किसान।',
    benefitsEn: 'Provides information to farmers on nutrient status of their soil.',
    benefitsHi: 'किसानों को उनकी मिट्टी की पोषक स्थिति के बारे में जानकारी प्रदान करता है।',
    documentsEn: ['Soil Sample', 'Aadhaar'],
    documentsHi: ['मिट्टी का नमूना', 'आधार'],
    applyLink: 'https://soilhealth.dac.gov.in/',
    color: 'stone'
  },
  {
    id: '5',
    nameEn: 'Kisan Credit Card (KCC)',
    nameHi: 'किसान क्रेडिट कार्ड',
    icon: 'fa-credit-card',
    eligibilityEn: 'Individual/joint borrowers who are owner cultivators.',
    eligibilityHi: 'व्यक्तिगत/संयुक्त उधारकर्ता जो स्वयं खेती करने वाले मालिक हैं।',
    benefitsEn: 'Low interest loans for agricultural purposes with simplified procedure.',
    benefitsHi: 'सरलीकृत प्रक्रिया के साथ कृषि उद्देश्यों के लिए कम ब्याज वाला ऋण।',
    documentsEn: ['Aadhaar', 'Land Records', 'Passport Photo'],
    documentsHi: ['आधार', 'भू-अभिलेख', 'पासपोर्ट फोटो'],
    applyLink: 'https://www.onlinesbi.sbi/sbijava/kcc_index.html',
    color: 'purple'
  }
];

const SarkariYojana: React.FC<{ lang: Language; onNavigate: any; isDarkMode?: boolean }> = ({ lang, onNavigate, isDarkMode = false }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const filteredSchemes = schemeData.filter(s => 
    s.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || s.nameHi.includes(searchTerm)
  );

  return (
    <div className="space-y-12 animate-fadeIn pb-24 max-w-7xl mx-auto">
      <div className="border-b border-stone-200 dark:border-white/10 pb-10">
        <h2 className={`text-4xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>Official Welfare Grid</h2>
        <p className="text-emerald-700 font-bold uppercase tracking-widest text-[10px] mt-1">Government Schemes & Direct Benefit Services</p>
      </div>

      <div className="max-w-xl">
        <div className="relative group">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-stone-400"></i>
          <input 
            type="text" 
            placeholder="Search schemes by name or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full rounded-xl py-5 pl-16 pr-8 text-sm outline-none transition-all border ${
              isDarkMode ? 'bg-white/5 border-white/10 text-white focus:ring-emerald-500' : 'bg-white border-stone-200 text-stone-900 focus:ring-emerald-700 shadow-sm'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSchemes.map(scheme => (
          <div 
            key={scheme.id}
            onClick={() => setSelectedScheme(scheme)}
            className={`p-10 rounded-2xl border flex items-start gap-8 transition-all hover:shadow-lg cursor-pointer group ${
              isDarkMode ? 'bg-stone-900 border-white/5' : 'bg-white border-stone-200 hover:border-emerald-500'
            }`}
          >
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 bg-stone-50 dark:bg-white/5 text-stone-400 group-hover:text-emerald-700 transition-colors`}>
              <i className={`fas ${scheme.icon} text-3xl`}></i>
            </div>
            <div className="space-y-3">
              <h3 className={`text-xl font-black uppercase tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                {lang === 'hi' ? scheme.nameHi : scheme.nameEn}
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed font-medium">
                {lang === 'hi' ? scheme.benefitsHi : scheme.benefitsEn}
              </p>
              <div className="pt-4 flex items-center gap-2 text-emerald-700 font-black uppercase tracking-widest text-[9px]">
                Click to View Details <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedScheme && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-3xl rounded-3xl border shadow-3xl overflow-hidden flex flex-col max-h-[90vh] ${
            isDarkMode ? 'bg-stone-900 border-white/10' : 'bg-white border-stone-200'
          }`}>
            <div className="p-8 border-b border-stone-100 dark:border-white/5 flex justify-between items-center bg-stone-50 dark:bg-white/5">
              <div className="flex items-center gap-6">
                <i className={`fas ${selectedScheme.icon} text-3xl text-emerald-700`}></i>
                <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                  {lang === 'hi' ? selectedScheme.nameHi : selectedScheme.nameEn}
                </h2>
              </div>
              <button onClick={() => setSelectedScheme(null)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest border-b-2 border-emerald-700 inline-block pb-1">Eligibility</h4>
                     <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>{lang === 'hi' ? selectedScheme.eligibilityHi : selectedScheme.eligibilityEn}</p>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest border-b-2 border-emerald-700 inline-block pb-1">Scheme Benefits</h4>
                     <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>{lang === 'hi' ? selectedScheme.benefitsHi : selectedScheme.benefitsEn}</p>
                  </div>
               </div>
               <div className="pt-6 border-t border-stone-100 dark:border-white/5">
                 <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Required Official Documents</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(lang === 'hi' ? selectedScheme.documentsHi : selectedScheme.documentsEn).map((doc, i) => (
                      <div key={i} className={`p-4 rounded-xl flex items-center gap-4 border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                        <i className="fas fa-circle-check text-emerald-600"></i>
                        <span className={`text-[11px] font-bold ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{doc}</span>
                      </div>
                    ))}
                 </div>
               </div>

               <div className="pt-10 flex flex-col gap-4">
                  <a 
                    href={selectedScheme.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-700 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-center shadow-xl hover:bg-emerald-800 transition-all flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-external-link-alt"></i> Visit Official Website
                  </a>
                  <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest text-center">Note: You will be redirected to the official government portal.</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SarkariYojana;
