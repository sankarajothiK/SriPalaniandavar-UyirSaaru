import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Leaf, 
  HeartPulse, 
  Sparkles, 
  CalendarCheck, 
  MessageCircle, 
  ShieldCheck
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const { t, isTamil } = useLanguage();

  const trustPillars = [
    {
      icon: Leaf,
      title: t.trust1Title,
      desc: t.trust1Desc,
      color: "text-emerald-700 bg-emerald-100"
    },
    {
      icon: HeartPulse,
      title: t.trust2Title,
      desc: t.trust2Desc,
      color: "text-teal-700 bg-teal-100"
    },
    {
      icon: Sparkles,
      title: t.trust3Title,
      desc: t.trust3Desc,
      color: "text-amber-700 bg-amber-100"
    },
    {
      icon: CalendarCheck,
      title: t.trust4Title,
      desc: t.trust4Desc,
      color: "text-brand-forest bg-brand-gold/20"
    },
    {
      icon: MessageCircle,
      title: t.trust5Title,
      desc: t.trust5Desc,
      color: "text-green-700 bg-green-100"
    },
    {
      icon: ShieldCheck,
      title: t.trust6Title,
      desc: t.trust6Desc,
      color: "text-blue-700 bg-blue-100"
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-brand-cream border-b border-brand-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-forest/10 border border-brand-gold/40 text-brand-forest text-xs font-bold font-tamil">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-rich" />
            <span>{isTamil ? "நம்பிக்கையின் அடையாளம்" : "Pillars of Trust"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark font-tamil tracking-tight leading-snug">
            {t.trustTitle}
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium font-tamil leading-relaxed">
            {t.trustSubtitle}
          </p>
        </div>

        {/* 6 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-brand-cream-border hover:border-brand-gold/60 shadow-premium hover:shadow-premium-lg transition-all duration-300 space-y-3 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-extrabold text-brand-dark font-tamil group-hover:text-brand-forest transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-tamil">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
