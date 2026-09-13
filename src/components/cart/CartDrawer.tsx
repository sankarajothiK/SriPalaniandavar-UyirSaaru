import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { formatWhatsAppMessage, generateWhatsAppUrl } from '../../utils/whatsapp';
import { validatePhoneNumber } from '../../utils/formatters';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  MessageCircle, 
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { t, isTamil, language } = useLanguage();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    deliveryFee, 
    total, 
    totalItems,
    isFreeDelivery,
    amountNeededForFreeDelivery,
    customer,
    isCartOpen,
    setIsCartOpen,
    setGeneratedWhatsAppUrl,
    setIsWhatsAppModalOpen
  } = useCart();

  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCartOpen) return null;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customer.name.trim()) errors.name = t.nameRequired;
    if (!validatePhoneNumber(customer.phone)) errors.phone = t.phoneRequired;
    if (!customer.address.trim()) errors.address = t.addressRequired;
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    if (!validateForm()) {
      showToast({
        title: isTamil ? "விவரங்களை சரியாக நிரப்பவும்" : "Please complete required delivery details",
        type: 'error'
      });
      return;
    }

    const message = formatWhatsAppMessage({
      cart,
      customer,
      subtotal,
      deliveryFee,
      total,
      language
    });

    const url = generateWhatsAppUrl(message);
    setGeneratedWhatsAppUrl(url);
    setIsCartOpen(false);
    setIsWhatsAppModalOpen(true);

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-sm sm:text-base font-bold leading-tight">
                  {t.cartTitle}
                </h2>
                <p className="text-xs text-slate-400">
                  {totalItems} {t.itemsCount}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-6 h-6 text-slate-400" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-800">{t.emptyCart}</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">{t.emptyCartSub}</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow hover:bg-emerald-700 transition-colors"
                >
                  {t.browseMenu}
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Status */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  {isFreeDelivery ? (
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{t.freeDeliveryQualified}</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-slate-700 font-semibold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t.freeDeliveryHint.replace('{amount}', amountNeededForFreeDelivery.toString())}</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  {cart.map(item => {
                    const itemName = isTamil ? item.nameTa : item.nameEn;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                      >
                        <img
                          src={item.image}
                          alt={itemName}
                          className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {itemName}
                          </h4>
                          <p className="text-xs font-extrabold text-slate-800">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5">
                          {item.itemType === 'product' && (
                            <div className="flex items-center bg-white rounded-lg border border-slate-300 p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded text-xs font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-bold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded text-xs font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Customer Details Form */}
                <CustomerDetailsForm errors={formErrors} />
              </>
            )}

          </div>

          {/* Footer & WhatsApp Order CTA */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2.5">
              
              {/* Totals */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{t.subtotal}</span>
                  <span className="font-bold text-slate-800">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>{t.deliveryFee}</span>
                  <span className={deliveryFee === 0 ? "text-emerald-700 font-bold" : "font-bold text-slate-800"}>
                    {deliveryFee === 0 ? t.freeDeliveryText : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>{t.grandTotal}</span>
                  <span className="text-base text-emerald-700 font-sans">₹{total}</span>
                </div>
              </div>

              {/* Order on WhatsApp */}
              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.orderViaWhatsApp} (₹{total})</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
