import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { STORE_CONFIG } from '../../config/whatsapp';
import { ShoppingBag, MessageCircle, Phone } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { t, isTamil } = useLanguage();
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  return (
    <aside aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 inset-x-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        
        {/* Cart Info Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none flex-shrink-0"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-xs font-bold font-sans">
            ₹{subtotal}
          </span>
        </button>

        {/* WhatsApp Order CTA */}
        <button
          onClick={() => {
            if (totalItems > 0) {
              setIsCartOpen(true);
            } else {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 active:scale-95 transition-all truncate"
        >
          <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
          <span className="truncate">
            {totalItems > 0 ? t.orderViaWhatsApp : t.navOrderNow}
          </span>
        </button>

        {/* Call Icon Button */}
        <a
          href={`tel:${STORE_CONFIG.whatsappNumber}`}
          className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center flex-shrink-0"
          title="Direct Call"
        >
          <Phone className="w-4 h-4 text-emerald-700" />
        </a>

      </div>
    </aside>
  );
};
