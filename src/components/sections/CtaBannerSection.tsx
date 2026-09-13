import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { STORE_CONFIG } from '../../config/whatsapp';
import { 
  Sparkles, 
  MessageCircle, 
  Phone, 
  ArrowRight,
  Clock,
  ShieldCheck,
  Leaf
} from 'lucide-react';

export const CtaBannerSection: React.FC = () => {
  const { isTamil } = useLanguage();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-brand-forest via-emerald-900 to-teal-950 text-white relative overflow-hidden">
      
      {/* Background radial glows and floating elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 sm:space-y-8">
        
        {/* Sacred Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-gold-pale text-xs font-bold font-tamil backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-brand-gold-light" />
          <span>{STORE_CONFIG.taglineTa}</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-tamil tracking-tight leading-tight">
          {isTamil ? "சுவையான தூய்மை... நீடித்த நலம்!" : "Freshness You Can Taste. Wellness You Can Feel."}
        </h2>

        {/* Supporting description */}
        <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 font-tamil max-w-2xl mx-auto leading-relaxed">
          {isTamil 
            ? "நாளை அதிகாலை உங்கள் குடும்பத்திற்கான 100% இயற்கை பழச்சாறை இன்றே வாட்ஸ்அப் மூலம் எளிதாக முன்பதிவு செய்யுங்கள். எந்தவொரு ஆன்லைன் கட்டணமும் தேவையில்லை — Cash on Delivery வசதி உண்டு!"
            : "Reserve your 100% pure cold-pressed morning juice routine effortlessly via WhatsApp. 100% pure fruit extraction, and convenient Cash on Delivery."}
        </p>

        {/* Assurance Chips */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-emerald-200/90 font-tamil pt-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>3 நேர டெலிவரி (6-9 AM • 11-12 PM • 4-6 PM)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Cash on Delivery</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% இயற்கை பழங்கள்</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <button
            onClick={scrollToMenu}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center gap-2 font-tamil"
          >
            <span>{isTamil ? "மெனு பார்த்து ஆர்டர் செய்க" : "Explore Menu & Order"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('வணக்கம்! ஸ்ரீ பழனியாண்டவர் பழமுதிர் சோலையில் ஜூஸ் ஆர்டர் செய்ய விரும்புகிறேன்.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all active:scale-95 flex items-center gap-2 font-tamil"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{isTamil ? "நேரடி WhatsApp அரட்டை" : "WhatsApp Inquiry"}</span>
          </a>
        </div>

      </div>

    </section>
  );
};
