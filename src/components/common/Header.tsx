import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { STORE_CONFIG } from '../../config/whatsapp';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const { isTamil } = useLanguage();
  const { totalItems, setIsCartOpen, subtotal } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'menu', 'packages', 'gallery', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'hero', labelTa: "முகப்பு", labelEn: "Home" },
    { id: 'about', labelTa: "எங்களைப் பற்றி", labelEn: "About" },
    { id: 'menu', labelTa: "மெனு", labelEn: "Menu" },
    { id: 'packages', labelTa: "பேக்கேஜ்கள்", labelEn: "Packages" },
    { id: 'gallery', labelTa: "கேலரி", labelEn: "Gallery" },
    { id: 'contact', labelTa: "தொடர்பு", labelEn: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* 1. Subtle Luxury Top Notice Bar */}
      <div className="bg-brand-dark text-slate-300 py-1.5 px-4 sm:px-8 text-xs border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-tamil font-medium text-[11px] sm:text-xs text-slate-200 tracking-wide">
              {isTamil 
                ? "3 நேர டெலிவரி: காலை 6-9 AM • நண்பகல் 11-12 PM • மாலை 4-6 PM • 100% தூய பழச்சாறு" 
                : "3 Daily Slots: 6-9 AM • 11-12 PM • 4-6 PM • 100% Pure Cold-Pressed"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${STORE_CONFIG.whatsappNumber}`} 
              className="flex items-center gap-1.5 text-slate-300 hover:text-brand-gold-light transition-colors font-medium"
              title="Click to Call"
            >
              <Phone className="w-3 h-3 text-brand-gold" />
              <span className="font-sans font-bold text-[11px] sm:text-xs">{STORE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Navbar (Brand on Left, Nav in Center, CTA on Right) */}
      <div
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-glass border-b border-slate-200/80 py-3' 
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand / Logo on Left */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group flex-shrink-0"
            aria-label="Home"
          >
            {/* Logo Frame (Modular slot for final logo) */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border border-brand-gold/30 shadow-xs bg-brand-forest flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/logo.jpg"
                alt="Brand Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Clean Brand Typography */}
            <div className="flex flex-col">
              <span className="font-tamil font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                {STORE_CONFIG.brandNameTa}
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider font-sans uppercase mt-1">
                {STORE_CONFIG.brandNameEn}
              </span>
            </div>
          </button>

          {/* Navigation in Center */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              const label = isTamil ? link.labelTa : link.labelEn;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-bold rounded-xl transition-all duration-200 font-tamil ${
                    isActive 
                      ? 'text-emerald-800 bg-emerald-50/80 shadow-2xs font-extrabold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA on Right */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold transition-all active:scale-95 border border-slate-200/70 shadow-2xs"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span className="font-sans hidden sm:inline">
                {totalItems > 0 ? `₹${subtotal}` : (isTamil ? 'கூடை' : 'Cart')}
              </span>
              {totalItems > 0 && (
                <span className="w-4 h-4 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Primary Order Now CTA */}
            <button
              onClick={() => scrollToSection('menu')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-xs hover:shadow-md transition-all active:scale-95 font-tamil"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-pale" />
              <span>{isTamil ? "ஆர்டர் செய்க" : "Order Now"}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-5 py-4 space-y-2 max-w-md mx-auto">
            {navLinks.map(link => {
              const label = isTamil ? link.labelTa : link.labelEn;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold text-left transition-colors font-tamil ${
                    isActive ? 'bg-emerald-100/60 text-emerald-900 font-extrabold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('menu');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-extrabold text-xs shadow flex items-center justify-center gap-2 font-tamil"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isTamil ? "இப்போதே ஆர்டர் செய்க" : "Order Now"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
