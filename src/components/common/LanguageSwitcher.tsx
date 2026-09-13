import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
      <button
        type="button"
        onClick={() => setLanguage('ta')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
          language === 'ta'
            ? 'bg-white text-emerald-700 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-label="Switch to Tamil"
      >
        தமிழ்
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
          language === 'en'
            ? 'bg-white text-emerald-700 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};
