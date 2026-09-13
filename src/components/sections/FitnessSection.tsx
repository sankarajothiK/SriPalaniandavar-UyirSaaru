import React from 'react';
import { products } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCard } from '../catalog/ProductCard';
import { Product } from '../../types';
import { Zap } from 'lucide-react';

interface FitnessSectionProps {
  onOpenDetail: (product: Product) => void;
}

export const FitnessSection: React.FC<FitnessSectionProps> = ({ onOpenDetail }) => {
  const { t } = useLanguage();

  const fitnessProducts = products.filter(
    p => p.category === 'energy-fitness' || p.category === 'smoothies' || p.isFitness
  );

  return (
    <section id="fitness-smoothies" className="py-14 sm:py-20 bg-brand-cream border-b border-brand-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold font-tamil">
            <Zap className="w-3.5 h-3.5 text-amber-700" />
            <span>Energy & Fitness • இயற்கை புரோட்டீன் ஸ்மூத்திகள்</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark font-tamil tracking-tight">
            {t.fitnessTitle}
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium font-tamil leading-relaxed">
            {t.fitnessSubtitle}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-4">
          {fitnessProducts.map(product => (
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
