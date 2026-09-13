import React, { useState } from 'react';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Droplets 
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { t, isTamil } = useLanguage();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, notes);
    setIsAdded(true);
    showToast({
      title: isTamil ? `${product.nameTa} கூடையில் சேர்க்கப்பட்டது` : `${product.nameEn} added to cart`,
      message: `${quantity} × ₹${product.price} = ₹${quantity * product.price}`,
      type: 'success'
    });

    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const name = isTamil ? product.nameTa : product.nameEn;
  const secondaryName = isTamil ? product.nameEn : product.nameTa;
  const description = isTamil ? product.descriptionTa : product.descriptionEn;
  const ingredients = isTamil ? product.ingredientsTa : product.ingredientsEn;
  const highlights = isTamil ? (product.nutritionHighlightsTa || []) : (product.nutritionHighlightsEn || []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image */}
          <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-slate-100 overflow-hidden">
            <img
              src={product.image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-3 left-3 text-white">
              <span className="inline-block px-2 py-0.5 text-[11px] font-bold rounded-md bg-white/20 backdrop-blur-xs mb-1">
                {product.size}
              </span>
              <p className="text-lg font-extrabold">
                ₹{product.price}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3.5 max-h-[75vh] overflow-y-auto">
            
            <div className="space-y-2.5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {name}
                </h2>
                <p className="text-xs text-slate-500 font-sans">
                  {secondaryName}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {description}
              </p>

              {/* Ingredients */}
              {ingredients && ingredients.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-emerald-600" />
                    <span>{t.ingredients}:</span>
                  </h4>
                  <ul className="space-y-1">
                    {ingredients.map((ing, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {highlights && highlights.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>{t.highlights}:</span>
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Note */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  {isTamil ? "சிறப்பு குறிப்பு (உதா: சர்க்கரை வேண்டாம், ஐஸ் வேண்டாம்)" : "Special instructions:"}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isTamil ? "உங்கள் விருப்பத்தை குறிப்பிடவும்..." : "Optional instructions..."}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Price & Quantity & Add Button */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">{isTamil ? "மொத்த விலை" : "Total Price"}</span>
                  <p className="text-xl font-extrabold text-slate-900 font-sans">
                    ₹{product.price * quantity}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-white rounded transition-colors font-bold text-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-slate-900 font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => Math.min(20, prev + 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-white rounded transition-colors font-bold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.addToCart} (₹{product.price * quantity})</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
