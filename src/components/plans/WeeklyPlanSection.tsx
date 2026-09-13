import React, { useState, useRef, useEffect } from 'react';
import { weeklyMorningPlans } from '../../data/packages';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { STORE_CONFIG, DELIVERY_SLOTS } from '../../config/whatsapp';
import { formatWhatsAppMessage, generateWhatsAppUrl } from '../../utils/whatsapp';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ShoppingBag, 
  Truck, 
  Users,
  Sun,
  Leaf,
  Droplets,
  Heart,
  Zap,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Maximize2,
  X,
  ArrowRight,
  Check,
  Flame,
  Info
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  Sun,
  Leaf,
  Heart,
  Sparkles,
  Zap,
  ShieldCheck
};

export const WeeklyPlanSection: React.FC = () => {
  const { t, isTamil, language } = useLanguage();
  const { addPlanToCart, setIsCartOpen, setGeneratedWhatsAppUrl, setIsWhatsAppModalOpen } = useCart();
  const { showToast } = useToast();

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [durationDays, setDurationDays] = useState(7);
  const [bottlesPerDay, setBottlesPerDay] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0].labelTa);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Touch swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activePlan = weeklyMorningPlans[activeIndex] || weeklyMorningPlans[0];

  // Dynamic Pricing Calculation
  const basePricePerDay = activePlan.price / activePlan.durationDays;
  const calculatedPrice = Math.round(basePricePerDay * durationDays * bottlesPerDay);
  const originalPriceCalculated = Math.round((activePlan.originalPrice || activePlan.price * 1.15) / activePlan.durationDays * durationDays * bottlesPerDay);
  const savings = originalPriceCalculated - calculatedPrice;

  // Reset active day index when plan changes
  useEffect(() => {
    setActiveDayIndex(0);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % weeklyMorningPlans.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + weeklyMorningPlans.length) % weeklyMorningPlans.length);
  };

  // Mobile Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    addPlanToCart(activePlan, durationDays, bottlesPerDay, selectedSlot);
    showToast({
      title: isTamil ? `${activePlan.nameTa} கூடையில் சேர்க்கப்பட்டது!` : `${activePlan.nameEn} added to cart!`,
      message: `${durationDays} ${isTamil ? 'நாட்கள்' : 'Days'} • ${bottlesPerDay} ${isTamil ? 'பாட்டில்/நாள்' : 'bottle/day'} • ₹${calculatedPrice}`,
      type: 'success'
    });
    setIsCartOpen(true);
  };

  // Instant WhatsApp Order
  const handleInstantWhatsApp = () => {
    const planCartItem = {
      id: `plan_${activePlan.id}_${Date.now()}`,
      itemType: 'plan' as const,
      nameTa: `${activePlan.nameTa} (${durationDays} நாட்கள்)`,
      nameEn: `${activePlan.nameEn} (${durationDays} Days)`,
      price: calculatedPrice,
      quantity: 1,
      image: activePlan.image,
      planDetails: {
        planId: activePlan.id,
        durationDays: durationDays,
        bottlesPerDay: bottlesPerDay,
        deliverySlot: selectedSlot
      }
    };

    const dummyCustomer = {
      name: '',
      phone: '',
      address: '',
      landmark: '',
      deliverySlot: selectedSlot,
      notes: `Direct Plan Order: ${activePlan.nameEn} (${durationDays} Days, ${bottlesPerDay} bottle/day)`
    };

    const message = formatWhatsAppMessage({
      cart: [planCartItem],
      customer: dummyCustomer,
      subtotal: calculatedPrice,
      deliveryFee: 0,
      total: calculatedPrice,
      language: language
    });

    const url = generateWhatsAppUrl(message);
    setGeneratedWhatsAppUrl(url);
    setIsWhatsAppModalOpen(true);
    window.open(url, '_blank');
  };

  const activeDay = activePlan.schedule[activeDayIndex] || activePlan.schedule[0];
  const ActiveDayIcon = ICON_MAP[activeDay.icon] || Sparkles;

  return (
    <section id="packages" className="py-14 sm:py-20 lg:py-28 bg-[#fbfcfb] border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/40 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold font-tamil shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.weeklyPlanBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-tamil leading-tight">
            {t.weeklyPlanTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-tamil">
            {t.weeklyPlanSubtitle}
          </p>
        </div>

        {/* 1. Interactive Package Selector Carousel Tabs */}
        <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
          
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 shadow-xs flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
            aria-label="Previous package"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Quick Package Selector Pills */}
          <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            {weeklyMorningPlans.map((plan, idx) => {
              const isSelected = activeIndex === idx;
              const name = isTamil ? plan.nameTa : plan.nameEn;
              return (
                <button
                  key={plan.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap font-tamil ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-md scale-102 ring-2 ring-emerald-400/40'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-slate-300'}`}></span>
                  <span className="truncate max-w-[130px] sm:max-w-[200px]">{name}</span>
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 shadow-xs flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
            aria-label="Next package"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* 2. Main Interactive Focused Stage Card */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-clean-lg overflow-hidden transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Rich Visuals & Interactive Schedule */}
            <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-slate-100">
              
              <div className="space-y-4">
                
                {/* Header Tag & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 font-tamil flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isTamil ? activePlan.badgeTa : activePlan.badgeEn}</span>
                  </span>

                  <span className="text-xs font-semibold text-slate-500 font-sans">
                    Package {activeIndex + 1} of {weeklyMorningPlans.length}
                  </span>
                </div>

                {/* Plan Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-tamil leading-tight">
                    {isTamil ? activePlan.nameTa : activePlan.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700 font-tamil">
                    "{isTamil ? activePlan.taglineTa : activePlan.taglineEn}"
                  </p>
                  <p className="text-xs text-slate-600 font-tamil leading-relaxed pt-1">
                    {isTamil ? activePlan.descriptionTa : activePlan.descriptionEn}
                  </p>
                </div>

                {/* Interactive Day-by-Day Juice Preview */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 font-tamil flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>{isTamil ? "7 நாள் சுழற்சி அட்டவணை (கிளிக் செய்யவும்):" : "7-Day Juice Schedule (Click day to preview):"}</span>
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => setIsDetailModalOpen(true)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline font-tamil flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{isTamil ? "அனைத்தையும் பார்க்க" : "View All"}</span>
                    </button>
                  </div>

                  {/* Day Tabs (Monday - Sunday) */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {activePlan.schedule.map((item, dIdx) => {
                      const isDaySelected = activeDayIndex === dIdx;
                      return (
                        <button
                          key={dIdx}
                          type="button"
                          onClick={() => setActiveDayIndex(dIdx)}
                          className={`py-2 px-1 rounded-xl text-center transition-all duration-200 border ${
                            isDaySelected
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs scale-105'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <span className="text-[10px] sm:text-xs font-extrabold block">
                            {item.dayEn.slice(0, 3)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Day Focused Card (Animated Presentation) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50 border border-slate-200 flex items-center justify-between gap-4 transition-all">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold text-emerald-800 font-tamil bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                          {activeDay.dayTa}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-tamil leading-snug truncate">
                        {activeDay.juiceNameTa}
                      </h4>
                      <p className="text-xs text-slate-500 font-sans truncate">
                        {activeDay.juiceNameEn}
                      </p>
                      <p className="text-xs text-emerald-700 font-bold font-tamil pt-0.5">
                        ✓ {isTamil ? activeDay.benefitTa : activeDay.benefitEn}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 shadow-2xs flex items-center justify-center text-emerald-700 flex-shrink-0">
                      <ActiveDayIcon className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Key Inclusions Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-tamil">
                    {isTamil ? "திட்டத்தின் சிறப்பம்சங்கள்:" : "Key Inclusions:"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {(isTamil ? activePlan.featuresTa : activePlan.featuresEn).slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-600 font-tamil">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Interactive Customizer & Direct Action */}
            <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 bg-slate-50/80 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-sm font-extrabold text-slate-900 font-tamil">
                    {isTamil ? "திட்ட விருப்பங்கள்" : "Customize Plan"}
                  </h4>
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {t.freeDeliveryText}
                  </span>
                </div>

                {/* 1. Duration Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 font-tamil">
                    {t.choosePlanDuration}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { days: 7, label: t.duration7Days },
                      { days: 14, label: t.duration14Days },
                      { days: 30, label: t.duration30Days }
                    ].map(d => (
                      <button
                        key={d.days}
                        type="button"
                        onClick={() => setDurationDays(d.days)}
                        className={`py-2 px-1.5 rounded-xl border text-xs font-bold transition-all text-center font-tamil ${
                          durationDays === d.days
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Bottle Count / Persons */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 font-tamil">
                    {t.selectPersons}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[1, 2, 3, 4, 5].map(count => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setBottlesPerDay(count)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 font-tamil ${
                          bottlesPerDay === count
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{count} {t.personCount}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Delivery Slot Selector (3 Clean Slots) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 font-tamil">
                    {t.selectDeliverySlot}
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {DELIVERY_SLOTS.map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot.labelTa)}
                        className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all flex items-center justify-between font-tamil ${
                          selectedSlot === slot.labelTa
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-500 font-extrabold ring-1 ring-emerald-500 shadow-2xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                          <span>{isTamil ? slot.labelTa : slot.labelEn}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">
                          {isTamil ? slot.badgeTa : slot.badgeEn}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Price Calculation Box */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 font-tamil">
                    <span>{isTamil ? "அசல் விலை" : "Original Price"}</span>
                    <span className="line-through">₹{originalPriceCalculated}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold font-tamil">
                    <span>{isTamil ? "சலுகை & இலவச டெலிவரி" : "Discount & Free Delivery"}</span>
                    <span>-₹{savings}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1.5 border-t border-slate-100 font-tamil">
                    <span>{t.grandTotal}</span>
                    <span className="text-xl text-emerald-700 font-sans">₹{calculatedPrice}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                
                {/* Instant WhatsApp Order */}
                <button
                  type="button"
                  onClick={handleInstantWhatsApp}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all font-tamil"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isTamil ? `வாட்ஸ்அப்பில் உடனடியாக ஆர்டர் (₹${calculatedPrice})` : `Order via WhatsApp (₹${calculatedPrice})`}</span>
                </button>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all font-tamil"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>{t.weeklyPlanCta}</span>
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* 3. Interactive Other Packages Preview Carousel Strip */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-tamil">
              {isTamil ? "மற்ற சிறப்பு பேக்கேஜ்களை பார்க்க:" : "Explore Other Curated Packages:"}
            </h3>
            <span className="text-xs text-slate-500 font-tamil">
              {isTamil ? "கிளிக் செய்து மாற்றவும்" : "Click to view package"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {weeklyMorningPlans.map((plan, pIdx) => {
              const isActive = activeIndex === pIdx;
              const name = isTamil ? plan.nameTa : plan.nameEn;
              const badge = isTamil ? plan.badgeTa : plan.badgeEn;
              return (
                <div
                  key={plan.id}
                  onClick={() => setActiveIndex(pIdx)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-400/40 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={plan.image}
                        alt={name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-md bg-black/70 text-white font-tamil">
                        {badge}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-tamil line-clamp-1">
                      {name}
                    </h4>

                    <p className="text-[11px] text-slate-500 font-tamil line-clamp-2 leading-relaxed">
                      {isTamil ? plan.descriptionTa : plan.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-tamil">7 {isTamil ? "நாட்கள்" : "Days"}</span>
                      <span className="text-sm font-extrabold text-emerald-800 font-sans">
                        ₹{plan.price}
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-tamil transition-all ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isActive ? (isTamil ? "தேர்வாகியுள்ளது ✓" : "Active ✓") : (isTamil ? "பார்க்க" : "View")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. Expanded Full Schedule Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-7 max-h-[85vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 font-tamil bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {isTamil ? activePlan.badgeTa : activePlan.badgeEn}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-tamil">
                  {isTamil ? activePlan.nameTa : activePlan.nameEn}
                </h3>
                <p className="text-xs text-slate-500 font-tamil">
                  {isTamil ? activePlan.taglineTa : activePlan.taglineEn}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complete 7-Day Timetable */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-tamil">
                {isTamil ? "முழு 7 நாள் அட்டவணை & சத்து நன்மைகள்:" : "Full 7-Day Schedule & Benefits:"}
              </h4>

              <div className="space-y-2">
                {activePlan.schedule.map((item, idx) => {
                  const DayIcon = ICON_MAP[item.icon] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                          <DayIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase block font-tamil">{item.dayTa}</span>
                          <p className="text-xs font-bold text-slate-900 truncate font-tamil">{item.juiceNameTa}</p>
                          <p className="text-[11px] text-slate-500 truncate font-sans">{item.juiceNameEn}</p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-[11px] font-bold text-emerald-700 block font-tamil">✓ {isTamil ? item.benefitTa : item.benefitEn}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Bottom Order CTA */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[10px] text-slate-400 block font-tamil">7 {isTamil ? "நாட்கள் திட்டம்" : "Days Routine"}</span>
                <span className="text-lg font-extrabold text-slate-900 font-sans">₹{calculatedPrice}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleInstantWhatsApp();
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 font-tamil"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isTamil ? "வாட்ஸ்அப்பில் ஆர்டர்" : "Order via WhatsApp"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  {t.close}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
