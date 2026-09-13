import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DELIVERY_SLOTS } from '../../config/whatsapp';
import { 
  Sun, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake,
  CheckCircle2,
  Sunrise,
  Sunset
} from 'lucide-react';

export const DeliveryModelSection: React.FC = () => {
  const { t, isTamil } = useLanguage();

  const slotCards = [
    {
      time: "6:00 AM - 9:00 AM",
      nameTa: "காலை டெலிவரி",
      nameEn: "Morning Slot",
      icon: Sunrise,
      descTa: "அதிகாலை யோகா, நடைப்பயிற்சி மற்றும் காலை உணவு புத்துணர்ச்சிக்கு உகந்தது.",
      descEn: "Perfect for morning yoga, brisk walks, and fresh breakfast wellness.",
      bg: "bg-emerald-50",
      border: "border-emerald-300",
      accent: "text-emerald-800"
    },
    {
      time: "11:00 AM - 12:00 PM",
      nameTa: "நண்பகல் டெலிவரி",
      nameEn: "Mid-Day Slot",
      icon: Sun,
      descTa: "மதிய உணவுக்கு முந்தைய தாகம் தணிப்பு மற்றும் ஆற்றல் அதிகரிப்பு.",
      descEn: "Hydration boost and quick natural vitality before lunch.",
      bg: "bg-amber-50",
      border: "border-amber-300",
      accent: "text-amber-800"
    },
    {
      time: "4:00 PM - 6:00 PM",
      nameTa: "மாலை டெலிவரி",
      nameEn: "Evening Slot",
      icon: Sunset,
      descTa: "பள்ளி, அலுவலகம் மற்றும் உடற்பயிற்சிக்கு பிறகான மாலை புத்துணர்ச்சி.",
      descEn: "Post-workout, after-school, and evening relaxation nourishment.",
      bg: "bg-orange-50",
      border: "border-orange-300",
      accent: "text-orange-800"
    }
  ];

  const pillars = [
    {
      icon: Sparkles,
      title: t.delPillar1Title,
      desc: t.delPillar1Desc,
      badge: isTamil ? "அப்போதே பிழிந்தது" : "Fresh Squeeze"
    },
    {
      icon: ShieldCheck,
      title: t.delPillar3Title,
      desc: t.delPillar3Desc,
      badge: isTamil ? "100% சுகாதாரம்" : "Hygienic Sealed"
    },
    {
      icon: HeartHandshake,
      title: t.delPillar4Title,
      desc: t.delPillar4Desc,
      badge: isTamil ? "Cash on Delivery" : "COD Guaranteed"
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-brand-cream-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-forest/10 border border-brand-gold/40 text-brand-forest text-xs sm:text-sm font-bold font-tamil">
            <Clock className="w-4 h-4 text-brand-gold-rich" />
            <span>{isTamil ? "தினசரி 3 நேர டெலிவரி அட்டவணை" : "Daily 3-Slot Delivery Schedule"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark font-tamil tracking-tight leading-snug">
            {t.deliveryTitle}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium font-tamil leading-relaxed">
            {t.deliverySubtitle}
          </p>
        </div>

        {/* 3 Dedicated Delivery Slots Cards (Clean & Spacious) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slotCards.map((slot, index) => {
            const IconComponent = slot.icon;
            return (
              <div
                key={index}
                className={`p-6 sm:p-7 rounded-3xl border-2 ${slot.border} ${slot.bg} flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 shadow-2xs font-sans">
                      {slot.time}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center ${slot.accent}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`text-xl font-extrabold font-tamil ${slot.accent}`}>
                    {isTamil ? slot.nameTa : slot.nameEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium font-tamil leading-relaxed">
                    {isTamil ? slot.descTa : slot.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-center gap-1.5 text-xs font-bold text-slate-800 font-tamil">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isTamil ? "நேரடி வீட்டு விநியோகம்" : "Direct Doorstep Drop"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Quality & Delivery Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-brand-cream border border-brand-cream-border flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-forest text-brand-gold flex items-center justify-center flex-shrink-0 font-bold">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-brand-dark font-tamil">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-tamil leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
