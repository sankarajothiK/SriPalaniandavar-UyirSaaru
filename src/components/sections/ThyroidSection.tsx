import React from 'react';
import { products } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCard } from '../catalog/ProductCard';
import { HealthDisclaimer } from './HealthDisclaimer';
import { Product } from '../../types';
import { Leaf } from 'lucide-react';

interface ThyroidSectionProps {
  onOpenDetail: (product: Product) => void;
}

export const ThyroidSection: React.FC<ThyroidSectionProps> = ({ onOpenDetail }) => {
  const { t } = useLanguage();

  const thyroidProducts = products.filter(p => p.category === 'thyroid-support' || p.isThyroidSupport);

  return (
    <section id="thyroid-nutrition" className="py-14 sm:py-20 bg-brand-cream-warm border-b border-brand-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold font-tamil">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>Balanced Nutrition • சமநிலை ஊட்டச்சத்து</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark font-tamil tracking-tight">
            {t.thyroidTitle}
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium font-tamil leading-relaxed">
            {t.thyroidSubtitle}
          </p>
        </div>

        {/* Responsible Health Disclaimer */}
        <HealthDisclaimer type="thyroid" className="max-w-3xl mx-auto" />

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-4">
          {thyroidProducts.map(product => (
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
