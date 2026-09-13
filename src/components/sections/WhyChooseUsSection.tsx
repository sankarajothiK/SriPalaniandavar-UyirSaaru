import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  HeartHandshake,
  CheckCircle2,
  Truck,
  Award
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const { isTamil } = useLanguage();

  const reasons = [
    {
      icon: Droplets,
      titleTa: "100% தூய பழச்சாறு",
      titleEn: "100% Pure Natural Fruit",
      descTa: "எந்தவொரு கலப்படமும் இன்றி இயற்கையான அடர்ந்த பழங்களின் சத்து.",
      descEn: "100% natural, undiluted cold-pressed fruit extract without syrups or added sugars.",
      badge: "Pure Squeeze"
    },
    {
      icon: Clock,
      titleTa: "3 நேர பிரத்யேக டெலிவரி",
      titleEn: "3 Daily Delivery Slots",
      descTa: "அதிகாலை 6:00 - 9:00 AM, நண்பகல் 11:00 - 12:00 PM, மாலை 4:00 - 6:00 PM நேரங்களில் நேரடி வீட்டு டெலிவரி.",
      descEn: "Delivered fresh across 3 punctual windows to fit your daily work & fitness routine.",
      badge: "Dawn to Dusk"
    },
    {
      icon: ShieldCheck,
      titleTa: "சுகாதாரமான உணவு தர பாட்டில்கள்",
      titleEn: "Sanitized & Sealed Bottling",
      descTa: "காற்றுப்புகா, உணவு தர முத்திரையிடப்பட்ட பாட்டில்களில் சுகாதாரமான முறையில் அடைக்கப்பட்டு வழங்கப்படுகிறது.",
      descEn: "Food-grade, tamper-evident sealed packaging maintaining freshness and safety.",
      badge: "Hygienic"
    },
    {
      icon: Leaf,
      titleTa: "தோட்டத்து புதிய பழங்கள்",
      titleEn: "Orchard Direct Sourcing",
      descTa: "விவசாயத் தோட்டங்களிலிருந்து தினமும் நேரடியாகத் தேர்வு செய்யப்படும் உயர் ரக நற்பழங்கள்.",
      descEn: "Handpicked premium farm-fresh fruits harvested daily for maximum nutrient potency.",
      badge: "Farm Direct"
    },
    {
      icon: Award,
      titleTa: "7 நாள் தனிப்பயன் வழக்கங்கள்",
      titleEn: "Curated 7-Day Routines",
      descTa: "சர்க்கரை விழிப்புணர்வு, ஜிம் உடற்பயிற்சி, மற்றும் தோல் பொலிவுக்கான பிரத்யேக 7 நாள் அட்டவணைகள்.",
      descEn: "Personalized rotations for morning energy, sugar consciousness, and workout recovery.",
      badge: "Personalized"
    },
    {
      icon: HeartHandshake,
      titleTa: "WhatsApp & Cash on Delivery",
      titleEn: "Effortless WhatsApp Ordering",
      descTa: "எந்தவொரு ஆன்லைன் கட்டண சிரமமும் இன்றி வாட்ஸ்அப் மூலம் எளிதாக ஆர்டர் செய்து பொருளைப் பெற்று பணம் செலுத்தலாம்.",
      descEn: "No complex checkouts. Order directly on WhatsApp with convenient Cash on Delivery.",
      badge: "COD Available"
    }
  ];

  return (
    <section id="why-us" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-tamil">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTamil ? "ஏன் எங்களைத் தேர்வு செய்ய வேண்டும்?" : "Why Choose Us"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-tamil tracking-tight">
            {isTamil ? "சோலையின் 6 ராயல் தூண்கள்" : "The 6 Royal Quality Pillars"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-tamil leading-relaxed">
            {isTamil 
              ? "உங்கள் குடும்பத்தின் ஆரோக்கியத்திற்கு நாங்கள் தரும் அசைக்க முடியாத தர உறுதிமொழிகள்."
              : "Our uncompromising commitments to pure hygiene, timely delivery, and authentic taste."}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-500/60 shadow-xs hover:shadow-luxury transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-sans bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-tamil leading-snug group-hover:text-emerald-800 transition-colors">
                    {isTamil ? item.titleTa : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 font-tamil leading-relaxed">
                    {isTamil ? item.descTa : item.descEn}
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
