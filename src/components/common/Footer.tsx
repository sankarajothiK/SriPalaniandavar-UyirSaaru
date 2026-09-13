import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { STORE_CONFIG } from '../../config/whatsapp';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, isTamil } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-brand-dark text-slate-300 pt-14 pb-24 md:pb-12 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden border border-brand-gold/30 bg-brand-forest flex-shrink-0 flex items-center justify-center">
                <img
                  src="/assets/logo.jpg"
                  alt={STORE_CONFIG.brandNameTa}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white font-tamil">
                  {STORE_CONFIG.brandNameTa}
                </h3>
                <p className="text-[10px] text-slate-400 font-sans tracking-wider uppercase">
                  {STORE_CONFIG.brandNameEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-tamil">
              {isTamil 
                ? "தோட்டத்தில் பறிக்கப்பட்ட இயற்கை பழங்களின் சத்தை எந்தவொரு கலப்படமும் இன்றி 3 நேரங்களில் உங்கள் வாசல் சேர்க்கும் உன்னத சேவை."
                : "Pure cold-pressed juices crafted with hand-selected orchard fruits and 100% pure extraction. Delivered across 3 daily delivery slots."}
            </p>

            <div className="pt-1">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-sans">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-tamil">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">
                  {isTamil ? "முகப்பு" : "Home"}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
                  {isTamil ? "எங்களைப் பற்றி" : "About"}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('menu')} className="hover:text-white transition-colors">
                  {isTamil ? "மெனு / ஜூஸ்கள்" : "Menu"}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('packages')} className="hover:text-white transition-colors">
                  {isTamil ? "7 நாள் பேக்கேஜ்கள்" : "Packages"}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-white transition-colors">
                  {isTamil ? "புகைப்படங்கள்" : "Gallery"}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-sans">
              Contact & Store
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="font-tamil">{isTamil ? STORE_CONFIG.addressTa : STORE_CONFIG.addressEn}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="font-sans text-white font-bold">{STORE_CONFIG.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="font-tamil">{isTamil ? STORE_CONFIG.operatingHoursTa : STORE_CONFIG.operatingHoursEn}</span>
              </li>
            </ul>
          </div>

          {/* Delivery Windows Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider font-sans">
              Delivery Windows
            </h4>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-300 font-medium space-y-1 font-tamil">
              <p className="font-bold text-white">🌅 3 நேர டெலிவரி:</p>
              <p>• அதிகாலை 6:00 AM - 9:00 AM</p>
              <p>• நண்பகல் 11:00 AM - 12:00 PM</p>
              <p>• மாலை 4:00 PM - 6:00 PM</p>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-500 max-w-3xl mx-auto leading-relaxed font-tamil">
          {t.footerDisclaimer}
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.brandNameEn}. All rights reserved.</p>
          <p className="font-tamil text-slate-400">{STORE_CONFIG.sloganTa}</p>
        </div>

      </div>
    </footer>
  );
};
