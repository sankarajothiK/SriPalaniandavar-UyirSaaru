import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let bg = 'bg-brand-forest text-brand-cream border-brand-gold/40';
        let Icon = CheckCircle2;
        let iconColor = 'text-brand-gold';

        if (toast.type === 'error') {
          bg = 'bg-brand-ruby text-white border-red-400/40';
          Icon = AlertCircle;
          iconColor = 'text-white';
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-900 text-amber-50 border-amber-500/40';
          Icon = AlertTriangle;
          iconColor = 'text-amber-300';
        } else if (toast.type === 'info') {
          bg = 'bg-slate-900 text-slate-100 border-emerald-500/40';
          Icon = Info;
          iconColor = 'text-emerald-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-premium-lg backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${bg}`}
            role="alert"
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-brand-cream/80 mt-1 leading-snug">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-0.5 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
