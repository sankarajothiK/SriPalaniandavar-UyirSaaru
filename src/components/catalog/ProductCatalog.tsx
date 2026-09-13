import React, { useState, useMemo } from 'react';
import { products } from '../../data/products';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { HealthDisclaimer } from '../sections/HealthDisclaimer';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  HeartPulse, 
  Leaf, 
  Zap,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  Droplets,
  ArrowRight,
  Maximize2,
  ChevronRight
} from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { t, isTamil } = useLanguage();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [featuredProductId, setFeaturedProductId] = useState<string>(products[0].id);
  const [featuredQuantity, setFeaturedQuantity] = useState(1);
  const [featuredAdded, setFeaturedAdded] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'sugar-conscious') {
          matchesCategory = product.category === 'sugar-conscious' || !!product.isSugarConscious;
        } else if (selectedCategory === 'thyroid-support') {
          matchesCategory = product.category === 'thyroid-support' || !!product.isThyroidSupport;
        } else if (selectedCategory === 'energy-fitness') {
          matchesCategory = product.category === 'energy-fitness' || !!product.isFitness;
        } else if (selectedCategory === 'smoothies') {
          matchesCategory = product.category === 'smoothies' || product.category === 'energy-fitness';
        } else {
          matchesCategory = product.category === selectedCategory;
        }
      }

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inNameTa = product.nameTa.toLowerCase().includes(query);
        const inNameEn = product.nameEn.toLowerCase().includes(query);
        const inDescTa = product.descriptionTa.toLowerCase().includes(query);
        const inDescEn = product.descriptionEn.toLowerCase().includes(query);
        const inTags = product.tags?.some(tag => tag.toLowerCase().includes(query));
        const inIngredients = [
          ...product.ingredientsTa,
          ...product.ingredientsEn
        ].some(ing => ing.toLowerCase().includes(query));

        matchesSearch = inNameTa || inNameEn || inDescTa || inDescEn || inTags || inIngredients;
      }

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredProduct = products.find(p => p.id === featuredProductId) || filteredProducts[0] || products[0];

  const handleFeaturedAddToCart = () => {
    addToCart(featuredProduct, featuredQuantity);
    setFeaturedAdded(true);
    showToast({
      title: isTamil ? `${featuredProduct.nameTa} கூடையில் சேர்க்கப்பட்டது` : `${featuredProduct.nameEn} added to cart`,
      message: `${featuredQuantity} × ₹${featuredProduct.price} = ₹${featuredQuantity * featuredProduct.price}`,
      type: 'success'
    });

    setTimeout(() => {
      setFeaturedAdded(false);
      setFeaturedQuantity(1);
    }, 1200);
  };

  const featuredName = isTamil ? featuredProduct.nameTa : featuredProduct.nameEn;
  const featuredSecondary = isTamil ? featuredProduct.nameEn : featuredProduct.nameTa;
  const featuredDesc = isTamil ? featuredProduct.descriptionTa : featuredProduct.descriptionEn;
  const featuredIngredients = isTamil ? featuredProduct.ingredientsTa : featuredProduct.ingredientsEn;
  const featuredHighlights = isTamil ? (featuredProduct.nutritionHighlightsTa || []) : (featuredProduct.nutritionHighlightsEn || []);

  return (
    <section id="menu" className="py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-[#fcfdfd] via-[#f8faf9] to-[#fcfdfd] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-tamil">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.catTitle}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-tamil tracking-tight">
            {t.catalogTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-tamil leading-relaxed">
            {t.catalogSubtitle}
          </p>
        </div>

        {/* 1. Interactive Featured Product Spotlight (Large Cinematic Visual Showcase) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-luxury overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual Image Side */}
            <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-[420px] bg-slate-100 overflow-hidden group">
              <img
                src={featuredProduct.image}
                alt={featuredName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Overlay Pills */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-emerald-700 text-white font-tamil shadow-xs">
                  {isTamil ? "சிறப்பு ஜூஸ்" : "Featured Spotlight"}
                </span>
                {featuredProduct.isSugarConscious && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-800 text-white shadow-xs">
                    0% Sugar
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    {featuredProduct.size}
                  </span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-1">
                    ₹{featuredProduct.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalProduct(featuredProduct)}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isTamil ? "முழு விவரம்" : "Quick View"}</span>
                </button>
              </div>
            </div>

            {/* Details & Live Order Side */}
            <div className="lg:col-span-6 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-700 font-sans uppercase tracking-wider">
                    {featuredProduct.category.replace('-', ' ')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-tamil leading-snug">
                    {featuredName}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {featuredSecondary}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-tamil leading-relaxed">
                  {featuredDesc}
                </p>

                {/* Ingredients Pills */}
                {featuredIngredients && featuredIngredients.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-tamil flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-emerald-600" />
                      <span>{t.ingredients} (100% Pure):</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {featuredIngredients.map((ing, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 font-tamil">
                          • {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Health Benefits */}
                {featuredHighlights && featuredHighlights.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {featuredHighlights.map((h, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-tamil">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Live Quantity & Add to Cart Controls */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                
                {/* Quantity Stepper */}
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFeaturedQuantity(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-white rounded-lg transition-colors font-bold text-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-extrabold text-slate-900 font-sans">
                    {featuredQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFeaturedQuantity(prev => Math.min(20, prev + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-white rounded-lg transition-colors font-bold text-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={handleFeaturedAddToCart}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all font-tamil"
                >
                  {featuredAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.addedToCart}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t.addToCart} (₹{featuredProduct.price * featuredQuantity})</span>
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>

          {/* Quick Horizontal Spotlight Switcher Strip */}
          <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans whitespace-nowrap pl-2 hidden sm:inline">
              Spotlight:
            </span>
            {products.slice(0, 8).map(p => {
              const isSelected = p.id === featuredProduct.id;
              const pName = isTamil ? p.nameTa : p.nameEn;
              return (
                <button
                  key={p.id}
                  onClick={() => setFeaturedProductId(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap font-tamil ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs scale-102 ring-1 ring-emerald-500'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <img src={p.image} alt={pName} className="w-4 h-4 rounded-full object-cover" />
                  <span>{pName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Search & Category Filter Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-tamil"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-auto text-xs font-tamil">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 font-medium">{t.sortBy}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Category Disclaimers */}
        {selectedCategory === 'sugar-conscious' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-teal-900 bg-teal-50 px-4 py-2.5 rounded-2xl border border-teal-200 text-xs font-semibold font-tamil">
              <HeartPulse className="w-4 h-4 text-teal-700 flex-shrink-0" />
              <span>{t.sugarConsciousSubtitle}</span>
            </div>
            <HealthDisclaimer type="sugar" />
          </div>
        )}

        {selectedCategory === 'thyroid-support' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-emerald-900 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200 text-xs font-semibold font-tamil">
              <Leaf className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>{t.thyroidSubtitle}</span>
            </div>
            <HealthDisclaimer type="thyroid" />
          </div>
        )}

        {/* 3. Interactive Product Quick-Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-tamil">
            <span>
              {filteredProducts.length} {t.foundResults}
            </span>
            <span className="text-slate-400 hidden sm:inline">
              {isTamil ? "கிளிக் செய்து ஸ்பாட்லைட்டில் பார்க்கவும்" : "Click card to focus in spotlight"}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => setFeaturedProductId(product.id)}
                  className={`transition-all duration-200 ${
                    featuredProductId === product.id ? 'ring-2 ring-emerald-600 rounded-2xl scale-[1.01]' : ''
                  }`}
                >
                  <ProductCard
                    product={product}
                    onOpenDetail={setModalProduct}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-14 px-4 bg-white rounded-3xl border border-slate-200 space-y-3">
              <p className="text-sm font-semibold text-slate-700 font-tamil">{t.noResults}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold text-xs shadow-xs font-tamil"
              >
                {t.catViewAll}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />

    </section>
  );
};
