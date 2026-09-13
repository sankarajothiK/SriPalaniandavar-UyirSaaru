import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldAlert } from 'lucide-react';

interface HealthDisclaimerProps {
  type?: 'sugar' | 'thyroid' | 'general';
  className?: string;
}

export const HealthDisclaimer: React.FC<HealthDisclaimerProps> = ({ type = 'general', className = '' }) => {
  const { t, isTamil } = useLanguage();

  let disclaimerText = t.sugarConsciousDisclaimer;
  if (type === 'thyroid') {
    disclaimerText = t.thyroidDisclaimer;
  } else if (type === 'general') {
    disclaimerText = isTamil
      ? "பொறுப்புத் துறப்பு: எங்கள் பழச்சாறுகள் 100% இயற்கை முறையில் தயாரிக்கப்படும் ஊட்டச்சத்து பானங்கள். இவை மருத்துவ சிகிச்சைக்கான மாற்றல்ல."
      : "Disclaimer: Our juices are 100% natural nutritional beverages prepared for daily wellness and are not a substitute for clinical medical treatments.";
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs leading-relaxed font-tamil ${className}`}>
      <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-bold block mb-0.5">
          {isTamil ? "ஆரோக்கிய வழிகாட்டுதல் & பொறுப்புத் துறப்பு:" : "Health & Nutrition Disclaimer:"}
        </span>
        <p className="text-amber-800/90 font-medium">
          {disclaimerText}
        </p>
      </div>
    </div>
  );
};
