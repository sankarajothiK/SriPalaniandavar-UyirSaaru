import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { STORE_CONFIG } from '../../config/whatsapp';
import { 
  Sparkles, 
  Leaf, 
  Award, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Heart,
  Droplets
} from 'lucide-react';

export const AboutBrandSection: React.FC = () => {
  const { isTamil } = useLanguage();

  const metrics = [
    {
      value: "100%",
      labelTa: "தூய இயற்கை பழச்சாறு",
      labelEn: "Pure Cold-Pressed Extraction",
      descTa: "100% தூய இயற்கை சாறு",
      descEn: "100% Pure Natural Extraction",
      icon: Droplets
    },
    {
      value: "3 Slots",
      labelTa: "தினசரி டெலிவரி நேரங்கள்",
      labelEn: "Daily Delivery Windows",
      descTa: "காலை 6-9 AM • மதியம் • மாலை",
      descEn: "6-9 AM • 11-12 PM • 4-6 PM",
      icon: Clock
    },
    {
      value: "30+",
      labelTa: "இயற்கை பழ & ஸ்மூத்தி வகைகள்",
      labelEn: "Fresh Juices & Smoothies",
      descTa: "சர்க்கரை இல்லாத வகைகள் உட்பட",
      descEn: "Including sugar-conscious options",
      icon: Leaf
    },
    {
      value: "0%",
      labelTa: "செயற்கை பதப்படுத்திகள்",
      labelEn: "Chemicals & Preservatives",
      descTa: "அன்றாட புதிய தயாரிப்பு மட்டுமே",
      descEn: "Only freshly prepared daily",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Top Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-luxury group">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80"
                alt="Farm Fresh Harvest"
                className="w-full h-96 sm:h-[450px] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* In-Picture Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-md">
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-tamil leading-snug">
                  "{STORE_CONFIG.taglineTa}"
                </p>
                <p className="text-[11px] font-bold text-emerald-700 mt-1 font-sans">
                  {STORE_CONFIG.brandNameEn}
                </p>
              </div>
            </div>

            {/* Small Floating Pill */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-white border border-brand-gold/40 shadow-md">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-bold text-slate-900 font-tamil">பாரம்பரிய தூய்மை</span>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-tamil">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isTamil ? "எங்கள் பாரம்பரியம் & நோக்கம்" : "Our Heritage & Purpose"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-tamil tracking-tight leading-tight">
                {STORE_CONFIG.brandNameTa}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-tamil">
              {isTamil 
                ? "ஸ்ரீ பழனியாண்டவர் பழமுதிர் சோலை — இது சாதாரண ஜூஸ் கடை அல்ல. பழனியின் ஆன்மீக மண்ணில், உடலுக்கும் ஆன்மாவிற்கும் புத்துணர்ச்சி அளிக்கும் 100% இயற்கை பழச்சாறுகளை மக்களிடம் கொண்டு சேர்க்கும் ஆரோக்கிய இயக்கம்."
                : "Sri Palani Andavar Pazhamudir Solai is dedicated to delivering pure, unadulterated nature in its richest form. We source hand-selected orchard fruits and press them cold with 100% pure natural ingredients and no artificial syrups."}
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-tamil">
              {isTamil 
                ? "அதிகாலை யோகா செய்பவர்கள், முதியவர்கள், உடற்பயிற்சியாளர்கள், சர்க்கரை அளவை கவனிப்பவர்கள் மற்றும் குழந்தைகள் என ஒவ்வொருவரின் நலம் கருதி பிரத்யேக சாறுகளை அன்றாடம் தயாரித்து 3 நேரங்களில் உங்கள் வாசல் தேடி வழங்குகிறோம்."
                : "From fitness enthusiasts and morning walkers to sugar-conscious individuals and growing kids, we craft personalized juice plans that fit seamlessly into your day."}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 font-tamil">{isTamil ? "உணவு தர பாட்டில்கள்" : "Food-Grade Sanitized"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800 font-tamil">{isTamil ? "Cash on Delivery" : "Cash on Delivery"}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {metrics.map((m, idx) => {
            const IconComponent = m.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white hover:shadow-luxury transition-all duration-300 space-y-2 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-sans tracking-tight pt-1">
                  {m.value}
                </p>

                <p className="text-xs font-bold text-slate-900 font-tamil leading-snug">
                  {isTamil ? m.labelTa : m.labelEn}
                </p>

                <p className="text-[11px] text-slate-500 font-tamil leading-tight">
                  {isTamil ? m.descTa : m.descEn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
