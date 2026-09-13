import React from 'react';
import { products } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCard } from '../catalog/ProductCard';
import { HealthDisclaimer } from './HealthDisclaimer';
import { Product } from '../../types';
import { HeartPulse } from 'lucide-react';

interface SugarConsciousSectionProps {
  onOpenDetail: (product: Product) => void;
}

export const SugarConsciousSection: React.FC<SugarConsciousSectionProps> = ({ onOpenDetail }) => {
  const { t } = useLanguage();

  const sugarProducts = products.filter(p => p.category === 'sugar-conscious' || p.isSugarConscious);

  return (
    <section id="sugar-conscious" className="py-14 sm:py-20 bg-brand-cream border-b border-brand-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold font-tamil">
            <HeartPulse className="w-3.5 h-3.5 text-teal-700" />
            <span>0% Added Sugar • இயற்கை காய்கறி சாறுகள்</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark font-tamil tracking-tight">
            {t.sugarConsciousTitle}
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium font-tamil leading-relaxed">
            {t.sugarConsciousSubtitle}
          </p>
        </div>

        {/* Responsible Disclaimer Box */}
        <HealthDisclaimer type="sugar" className="max-w-3xl mx-auto" />

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-4">
          {sugarProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
