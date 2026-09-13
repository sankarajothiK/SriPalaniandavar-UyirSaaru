import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { STORE_CONFIG } from '../../config/whatsapp';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Leaf, 
  Clock, 
  ShieldCheck, 
  Droplets,
  CheckCircle2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, isTamil } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle Parallax on mouse move for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-b from-[#fbfcfb] via-white to-[#f6f9f7] py-16 sm:py-24 lg:py-32 border-b border-slate-200/80"
    >
      {/* 1. Ambient Luxury Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-emerald-100/40 via-teal-50/20 to-transparent pointer-events-none rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* 2. Floating Fruit & Botanical Particles (3D Layered Parallax) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        
        {/* Floating Orange Slice (Top Left) */}
        <div 
          className="absolute top-14 left-6 sm:left-14 w-14 h-14 sm:w-18 sm:h-18 animate-float-slow opacity-85 transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-300 shadow-md p-1.5 border border-white/80 flex items-center justify-center">
            <span className="text-xl sm:text-2xl">🍊</span>
          </div>
        </div>

        {/* Floating Mint Leaf (Top Right) */}
        <div 
          className="absolute top-16 right-8 sm:right-24 w-12 h-12 sm:w-14 sm:h-14 animate-float-reverse opacity-85 transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 18}px)` }}
        >
          <div className="w-full h-full rounded-2xl bg-emerald-100/90 border border-emerald-300/80 shadow-sm p-2 flex items-center justify-center rotate-12 backdrop-blur-xs">
            <span className="text-lg sm:text-xl">🌿</span>
          </div>
        </div>

        {/* Floating Ruby Jewel (Mid Left) */}
        <div 
          className="absolute top-1/2 left-4 sm:left-12 w-11 h-11 animate-float-delayed opacity-80 transition-transform duration-300 hidden sm:block"
          style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)` }}
        >
          <div className="w-full h-full rounded-2xl bg-rose-100/90 border border-rose-300/80 shadow-sm flex items-center justify-center -rotate-6">
            <span className="text-lg">🍓</span>
          </div>
        </div>

        {/* Floating Watermelon Slice (Bottom Right) */}
        <div 
          className="absolute bottom-16 right-6 sm:right-16 w-14 h-14 sm:w-16 sm:h-16 animate-float-slow opacity-85 transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 22}px)` }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 via-rose-400 to-emerald-500 p-1.5 shadow-md border border-white/80 flex items-center justify-center">
            <span className="text-xl sm:text-2xl">🍉</span>
          </div>
        </div>

        {/* Floating Lemon Droplet */}
        <div className="absolute top-1/4 left-1/3 w-2.5 h-2.5 bg-amber-400/50 rounded-full blur-[1px] animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 bg-emerald-400/50 rounded-full blur-[1px] animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Eyebrow + Headline + Description + CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            
            {/* 1. Refined Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-[11px] sm:text-xs font-bold text-emerald-900 tracking-wider uppercase font-sans">
                FRESH • 100% NATURAL • COLD-PRESSED
              </span>
            </div>

            {/* 2. Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight font-tamil leading-[1.15]">
                {isTamil ? "இயற்கையின் தூய சுவை..." : "Pure Nature,"} <br />
                <span className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  {isTamil ? "உங்கள் இல்லத்தின் வாசலில்!" : "Cold-Pressed Daily."}
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-bold text-slate-400 tracking-widest font-sans uppercase">
                {STORE_CONFIG.brandNameEn}
              </p>
            </div>

            {/* 3. Short Supporting Narrative */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed font-tamil max-w-xl">
              {isTamil 
                ? "தோட்டத்து புதிய பழங்களை அப்போதே பிழிந்து, 100% தூய இயற்கை முறையில் 3 நேரங்களில் உங்கள் வாசல் தேடி தருகிறோம்."
                : "Handpicked orchard fruits freshly cold-pressed at dawn with 100% pure cold-pressed natural goodness. Punctually delivered across 3 daily delivery slots."}
            </p>

            {/* 4. Two Clean CTA Buttons Maximum */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={scrollToMenu}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 font-tamil"
              >
                <span>{t.heroCtaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToPackages}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95 font-tamil"
              >
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>{t.heroCtaSecondary}</span>
              </button>
            </div>

            {/* 5. Minimal Key Assurance Tags */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-5 text-xs text-slate-600 font-tamil font-medium">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>0% Water Dilution</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>3 Delivery Slots (6-9AM • 11-12PM • 4-6PM)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cash on Delivery</span>
              </span>
            </div>

          </div>

          {/* Right Column: Premium Juice Visual Composition */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Back Soft Aura */}
              <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/15 via-teal-400/15 to-amber-400/15 rounded-3xl blur-2xl -z-10"></div>

              {/* Main Visual Card */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-luxury overflow-hidden space-y-4">
                
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-1/1 bg-slate-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80"
                    alt="Fresh Cold Pressed Juice"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-amber-300 bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-md font-tamil">
                        100% தூய பழச்சாறு
                      </span>
                      <p className="text-sm sm:text-base font-extrabold font-tamil leading-snug mt-1">
                        {STORE_CONFIG.brandNameTa}
                      </p>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      ✓
                    </span>
                  </div>
                </div>

                {/* Subtitle Status Bar */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-tamil">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-slate-700 font-bold">
                      {isTamil ? "இன்றைய அதிகாலை முன்பதிவு" : "Today's Delivery Slot"}
                    </span>
                  </div>
                  <span className="text-emerald-800 font-extrabold">
                    {isTamil ? "காலை 6 AM முதல்" : "6:00 AM - 9:00 AM"}
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
