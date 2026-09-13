import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { MessageCircle, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WhatsAppOrderModal: React.FC = () => {
  const { t } = useLanguage();
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen, generatedWhatsAppUrl } = useCart();

  React.useEffect(() => {
    if (isWhatsAppModalOpen) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [isWhatsAppModalOpen]);

  if (!isWhatsAppModalOpen) return null;

  const handleClose = () => {
    setIsWhatsAppModalOpen(false);
  };

  const handleOpenAgain = () => {
    if (generatedWhatsAppUrl) {
      window.open(generatedWhatsAppUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-6 text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Check Icon */}
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">
            {t.whatsappModalTitle}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.whatsappModalSub}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
          {t.whatsappModalDone}
        </div>

        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleOpenAgain}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{t.whatsappModalAction}</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs transition-colors"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};
