import React, { useState, useMemo } from 'react';
import { products } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { STORE_CONFIG, DELIVERY_SLOTS } from '../../config/whatsapp';
import { formatWhatsAppMessage, generateWhatsAppUrl } from '../../utils/whatsapp';
import { validatePhoneNumber } from '../../utils/formatters';
import { 
  Package, 
  Plus, 
  Minus, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  ShoppingBag
} from 'lucide-react';

export const CustomPackageBuilder: React.FC = () => {
  const { t, isTamil, language } = useLanguage();
  const { addCustomPackageToCart, setIsCartOpen, setGeneratedWhatsAppUrl, setIsWhatsAppModalOpen } = useCart();
  const { showToast } = useToast();

  const [frequency, setFrequency] = useState<'onetime' | 'daily' | '3days' | '7days'>('7days');
  
  const [selectedJuices, setSelectedJuices] = useState<Record<string, number>>({
    'prod-watermelon': 2,
    'prod-orange': 2,
    'prod-pomegranate': 1,
    'prod-cuke-mint': 2
  });

  const [deliverySlot, setDeliverySlot] = useState(DELIVERY_SLOTS[0].labelTa);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const totalBottles = useMemo(() => {
    return Object.values(selectedJuices).reduce((sum, qty) => sum + qty, 0);
  }, [selectedJuices]);

  const baseSubtotal = useMemo(() => {
    return Object.entries(selectedJuices).reduce((sum, [prodId, qty]) => {
      const prod = products.find(p => p.id === prodId);
      return sum + (prod ? prod.price * qty : 0);
    }, 0);
  }, [selectedJuices]);

  const frequencyMultiplier = useMemo(() => {
    if (frequency === '3days') return 3;
    if (frequency === '7days') return 7;
    if (frequency === 'daily') return 30;
    return 1;
  }, [frequency]);

  const subtotal = baseSubtotal * (frequency === 'onetime' ? 1 : (frequency === '3days' ? 2.8 : frequency === '7days' ? 6.2 : 25));
  const roundedSubtotal = Math.round(subtotal);
  
  const deliveryFee = (totalBottles >= 3 || frequency !== 'onetime' || roundedSubtotal >= STORE_CONFIG.freeDeliveryThreshold) ? 0 : STORE_CONFIG.deliveryCharge;
  const grandTotal = roundedSubtotal + deliveryFee;

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setSelectedJuices(prev => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const getFrequencyLabel = () => {
    if (frequency === 'onetime') return { ta: t.freqOneTime, en: 'One-Time Box' };
    if (frequency === '3days') return { ta: t.freq3Days, en: '3-Day Detox' };
    if (frequency === '7days') return { ta: t.freq7Days, en: '7-Day Routine' };
    return { ta: t.freqDaily, en: 'Daily Routine' };
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.name = t.nameRequired;
    if (!validatePhoneNumber(customerPhone)) errors.phone = t.phoneRequired;
    if (!customerAddress.trim()) errors.address = t.addressRequired;
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderViaWhatsApp = () => {
    if (totalBottles < 2) {
      showToast({
        title: isTamil ? "குறைந்தது 2 பாட்டில்களை தேர்வு செய்யவும்" : "Please select at least 2 bottles",
        type: 'warning'
      });
      return;
    }

    if (!validateForm()) {
      showToast({
        title: isTamil ? "விவரங்களை சரியாக நிரப்பவும்" : "Please fill required customer details",
        type: 'error'
      });
      return;
    }

    const selectedList = Object.entries(selectedJuices).map(([prodId, qty]) => {
      const p = products.find(item => item.id === prodId);
      return {
        nameTa: p?.nameTa || '',
        nameEn: p?.nameEn || '',
        qty
      };
    });

    const customCartItem = {
      id: `custom_pkg_${Date.now()}`,
      itemType: 'custom_package' as const,
      nameTa: `தனிப்பயன் ஜூஸ் பேக்கேஜ் (${getFrequencyLabel().ta})`,
      nameEn: `Custom Juice Package (${getFrequencyLabel().en})`,
      price: grandTotal,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
      customDetails: {
        frequency: frequency,
        frequencyTa: getFrequencyLabel().ta,
        frequencyEn: getFrequencyLabel().en,
        selectedJuices: selectedList,
        durationDays: frequencyMultiplier,
        bottlesPerDay: totalBottles,
        deliverySlot: deliverySlot,
        notes: customerNotes
      }
    };

    const customerObj = {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      landmark: '',
      deliverySlot: deliverySlot,
      notes: customerNotes
    };

    const message = formatWhatsAppMessage({
      cart: [customCartItem],
      customer: customerObj,
      subtotal: roundedSubtotal,
      deliveryFee: deliveryFee,
      total: grandTotal,
      language: language
    });

    const url = generateWhatsAppUrl(message);
    setGeneratedWhatsAppUrl(url);
    setIsWhatsAppModalOpen(true);

    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    if (totalBottles < 2) {
      showToast({
        title: isTamil ? "குறைந்தது 2 பாட்டில்களை தேர்வு செய்யவும்" : "Please select at least 2 bottles",
        type: 'warning'
      });
      return;
    }

    const selectedList = Object.entries(selectedJuices).map(([prodId, qty]) => {
      const p = products.find(item => item.id === prodId);
      return {
        nameTa: p?.nameTa || '',
        nameEn: p?.nameEn || '',
        qty
      };
    });

    addCustomPackageToCart({
      itemType: 'custom_package',
      nameTa: `தனிப்பயன் ஜூஸ் பேக்கேஜ் (${getFrequencyLabel().ta})`,
      nameEn: `Custom Juice Package (${getFrequencyLabel().en})`,
      price: grandTotal,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
      customDetails: {
        frequency: frequency,
        frequencyTa: getFrequencyLabel().ta,
        frequencyEn: getFrequencyLabel().en,
        selectedJuices: selectedList,
        deliverySlot: deliverySlot,
        notes: customerNotes
      }
    });

    showToast({
      title: isTamil ? "பேக்கேஜ் கூடையில் சேர்க்கப்பட்டது!" : "Custom package added to cart!",
      message: `${totalBottles} bottles • ₹${grandTotal}`,
      type: 'success'
    });

    setIsCartOpen(true);
  };

  return (
    <section id="custom-builder" className="py-8 sm:py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.builderBadge}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.builderTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            {t.builderSubtitle}
          </p>
        </div>

        {/* Builder Layout */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Steps Form */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Frequency */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">1</span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {t.step1Title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '7days', labelTa: t.freq7Days, labelEn: '7 Days Routine', badge: 'Popular' },
                    { id: '3days', labelTa: t.freq3Days, labelEn: '3 Days Detox', badge: 'Short' },
                    { id: 'daily', labelTa: t.freqDaily, labelEn: 'Daily Routine', badge: 'Monthly' },
                    { id: 'onetime', labelTa: t.freqOneTime, labelEn: 'One-Time Box', badge: 'Single' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFrequency(item.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col justify-between ${
                        frequency === item.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{isTamil ? item.labelTa : item.labelEn}</span>
                      <span className={`text-[9px] mt-1.5 font-bold px-1.5 py-0.5 rounded ${
                        frequency === item.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Pick Juices */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      {t.step2Title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {totalBottles} {isTamil ? "பாட்டில்கள்" : "bottles"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                  {products.map(prod => {
                    const count = selectedJuices[prod.id] || 0;
                    const name = isTamil ? prod.nameTa : prod.nameEn;
                    return (
                      <div
                        key={prod.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                          count > 0
                            ? 'bg-emerald-50/60 border-emerald-400'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={prod.image}
                            alt={name}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {name}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              ₹{prod.price} ({prod.size})
                            </p>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(prod.id, -1)}
                            disabled={count === 0}
                            className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded disabled:opacity-30 text-xs font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-slate-900">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(prod.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded text-xs font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Preferred Delivery Slot (3 Slots) */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">3</span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {t.step3Title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {DELIVERY_SLOTS.map(slot => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setDeliverySlot(slot.labelTa)}
                      className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all flex items-center justify-between ${
                        deliverySlot === slot.labelTa
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold'
                          : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Clock className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                        <span className="truncate">{isTamil ? slot.labelTa : slot.labelEn}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Contact & Address */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">4</span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {t.step4Title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.customerName}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${
                        formErrors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                      } focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.customerPhone}
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9842100000"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${
                        formErrors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                      } focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-sans`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.customerAddress}
                    </label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Door No, Street Name, Area..."
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${
                        formErrors.address ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                      } focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600`}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-4 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Package</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded">
                    {isTamil ? getFrequencyLabel().ta : getFrequencyLabel().en}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  <p className="font-semibold text-white">
                    {totalBottles} {isTamil ? "பாட்டில்கள் தேர்வு செய்யப்பட்டுள்ளன" : "bottles selected"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {deliverySlot}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{t.subtotal}</span>
                    <span className="text-white">₹{roundedSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{t.deliveryFee}</span>
                    <span className="text-emerald-400 font-semibold">{deliveryFee === 0 ? t.freeDeliveryText : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-slate-800">
                    <span>{t.grandTotal}</span>
                    <span className="text-lg text-emerald-400 font-sans">₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleOrderViaWhatsApp}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t.builderOrderNow}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.addToCart}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
