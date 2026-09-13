import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';
import { 
  Sparkles, 
  Citrus, 
  HeartPulse, 
  Leaf, 
  Zap, 
  Users, 
  CupSoda, 
  CalendarCheck 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Citrus,
  HeartPulse,
  Leaf,
  Zap,
  Users,
  CupSoda,
  CalendarCheck
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const { isTamil } = useLanguage();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const name = isTamil ? cat.nameTa : cat.nameEn;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
