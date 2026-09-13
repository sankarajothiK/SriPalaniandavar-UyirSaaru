import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { STORE_CONFIG } from '../../config/whatsapp';
import { formatWhatsAppMessage, generateWhatsAppUrl } from '../../utils/whatsapp';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Heart,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';

export const SpecialOffersSection: React.FC = () => {
  const { isTamil, language } = useLanguage();
  const { addCustomPackageToCart, setIsCartOpen, setGeneratedWhatsAppUrl, setIsWhatsAppModalOpen } = useCart();

  const specialOffer = {
    id: "offer-royal-trio",
    titleTa: "ராயல் இம்யூனிட்டி & குளிர்கால காம்போ (3 பிரீமியம் பாட்டில்கள்)",
    titleEn: "Royal Immunity & Glow Trio Box (3 Pure Cold-Pressed Bottles)",
    taglineTa: "சிவப்பு மாதுளை + ஏபிசி மிராக்கிள் + ஆரஞ்சு வைட்டமின் சி",
    taglineEn: "Ruby Pomegranate + ABC Miracle + Orange Vitamin C",
    originalPrice: 240,
    offerPrice: 199,
    savings: 41,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80",
    badgeTa: "இன்றைய சிறப்பு சலுகை (Limited Time)",
    badgeEn: "Chef's Special Offer",
    featuresTa: [
      "100% தூய பழச்சாறு (100% Pure Cold-Pressed)",
      "3 நேரங்களில் எந்த நேரத்திலும் இலவச டெலிவரி (Free Doorstep Delivery)",
      "உடனடி நோய் எதிர்ப்பு & ரத்த விருத்தி சத்துக்கள்",
      "Cash on Delivery வசதி"
    ],
    featuresEn: [
      "100% pure cold-pressed juice, zero artificial preservatives",
      "Includes 100% Free Doorstep Delivery across all 3 slots",
      "Packed with antioxidants, polyphenols and natural Vitamin C",
      "Cash on Delivery available"
    ]
  };

  const handleInstantWhatsApp = () => {
    const offerItem = {
      id: `special_offer_${Date.now()}`,
      itemType: 'custom_package' as const,
      nameTa: specialOffer.titleTa,
      nameEn: specialOffer.titleEn,
      price: specialOffer.offerPrice,
      quantity: 1,
      image: specialOffer.image,
      customDetails: {
        frequency: 'onetime' as const,
        frequencyTa: 'சிறப்பு சலுகை காம்போ',
        frequencyEn: 'Special Offer Trio',
        selectedJuices: [
          { nameTa: 'மாதுளை சாறு (Pomegranate)', nameEn: 'Pomegranate Juice', qty: 1 },
          { nameTa: 'ஏபிசி ஜூஸ் (ABC Juice)', nameEn: 'ABC Miracle Juice', qty: 1 },
          { nameTa: 'ஆரஞ்சு ஜூஸ் (Orange Juice)', nameEn: 'Orange Fresh Juice', qty: 1 },
        ],
        deliverySlot: 'காலை 6:00 - 9:00 AM'
      }
    };

    const dummyCustomer = {
      name: '',
      phone: '',
      address: '',
      landmark: '',
      deliverySlot: 'காலை 6:00 - 9:00 AM',
      notes: 'Special Offer Trio Box'
    };

    const message = formatWhatsAppMessage({
      cart: [offerItem],
      customer: dummyCustomer,
      subtotal: specialOffer.offerPrice,
      deliveryFee: 0,
      total: specialOffer.offerPrice,
      language
    });

    const url = generateWhatsAppUrl(message);
    setGeneratedWhatsAppUrl(url);
    setIsWhatsAppModalOpen(true);
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    addCustomPackageToCart({
      itemType: 'custom_package',
      nameTa: specialOffer.titleTa,
      nameEn: specialOffer.titleEn,
      price: specialOffer.offerPrice,
      quantity: 1,
      image: specialOffer.image,
      customDetails: {
        frequency: 'onetime',
        frequencyTa: 'சிறப்பு சலுகை காம்போ',
        frequencyEn: 'Special Offer Trio',
        selectedJuices: [
          { nameTa: 'மாதுளை சாறு (Pomegranate)', nameEn: 'Pomegranate Juice', qty: 1 },
          { nameTa: 'ஏபிசி ஜூஸ் (ABC Juice)', nameEn: 'ABC Miracle Juice', qty: 1 },
          { nameTa: 'ஆரஞ்சு ஜூஸ் (Orange Juice)', nameEn: 'Orange Fresh Juice', qty: 1 },
        ],
        deliverySlot: 'காலை 6:00 - 9:00 AM'
      }
    });

    setIsCartOpen(true);
  };

  return (
    <section id="offers" className="py-14 sm:py-20 bg-gradient-to-b from-brand-dark via-[#0d1c15] to-brand-dark text-white relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-brand-gold-light text-xs font-bold font-tamil">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{isTamil ? specialOffer.badgeTa : specialOffer.badgeEn}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-tamil tracking-tight">
            {isTamil ? "சீசன் சிறப்பு காம்போ சலுகை" : "Seasonal Royal Highlight Combo"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-tamil leading-relaxed">
            {isTamil 
              ? "எங்கள் வாடிக்கையாளர்களால் அதிகம் விரும்பப்பட்ட 3 சூப்பர்ஃபுட் ஜூஸ்கள் ஒரே பேக்கேஜில் சிறப்பு தள்ளுபடியில்!"
              : "Our top 3 best-selling superfood juices bundled in a royal trio box with free doorstep delivery."}
          </p>
        </div>

        {/* Large Editorial Feature Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Image Composition */}
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 bg-slate-900 border border-white/10">
                <img
                  src={specialOffer.image}
                  alt={specialOffer.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Savings Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md">
                  SAVE ₹{specialOffer.savings} (LIMITED OFFER)
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-bold text-amber-300 font-tamil">
                    {specialOffer.taglineTa}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Narrative & Direct CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-tamil leading-tight">
                  {isTamil ? specialOffer.titleTa : specialOffer.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-400 font-tamil font-semibold">
                  "{isTamil ? specialOffer.taglineTa : specialOffer.taglineEn}"
                </p>
              </div>

              {/* Inclusions List */}
              <div className="space-y-2">
                {(isTamil ? specialOffer.featuresTa : specialOffer.featuresEn).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 font-tamil">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 line-through block">₹{specialOffer.originalPrice}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-sans">
                      ₹{specialOffer.offerPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 font-tamil">
                      (இலவச டெலிவரி)
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  3 Bottles (250ml ea)
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleInstantWhatsApp}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all font-tamil"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
                  <span>{isTamil ? "வாட்ஸ்அப்பில் உடனடியாக ஆர்டர்" : "Order via WhatsApp"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all font-tamil"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isTamil ? "கூடையில் சேர்க்க" : "Add to Cart"}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
