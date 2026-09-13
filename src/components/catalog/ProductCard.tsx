import React, { useState } from 'react';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { 
  Plus, 
  Minus, 
  HeartPulse,
  Leaf
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { t, isTamil } = useLanguage();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);

  // Check if item is already in cart
  const cartItem = cart.find(item => item.itemType === 'product' && item.productId === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddOne = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast({
      title: isTamil ? `${product.nameTa} சேர்க்கப்பட்டது` : `${product.nameEn} added`,
      message: `1 × ₹${product.price}`,
      type: 'success',
      duration: 1800
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
    } else {
      addToCart(product, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity <= 1) {
        removeFromCart(cartItem.id);
      } else {
        updateQuantity(cartItem.id, cartItem.quantity - 1);
      }
    }
  };

  const name = isTamil ? product.nameTa : product.nameEn;
  const secondaryName = isTamil ? product.nameEn : product.nameTa;

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-3 text-center">
            <Leaf className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-xs font-semibold text-slate-700 line-clamp-1">{name}</span>
          </div>
        )}

        {/* Micro Badges */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
          {product.isSugarConscious ? (
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-teal-800 text-white shadow-xs">
              0% Sugar
            </span>
          ) : product.badgeTa ? (
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-800 text-white shadow-xs">
              {isTamil ? product.badgeTa : product.badgeEn}
            </span>
          ) : <span></span>}

          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-black/70 text-white font-sans">
            {product.size}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        
        <div className="space-y-0.5">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-slate-500 font-sans truncate">
            {secondaryName}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 font-sans">
              ₹{product.price}
            </span>
          </div>

          {/* Add / Stepper Button */}
          {currentQuantity === 0 ? (
            <button
              type="button"
              onClick={handleAddOne}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all active:scale-95 flex items-center gap-1"
              aria-label="Add to cart"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isTamil ? "சேர்க்க" : "ADD"}</span>
            </button>
          ) : (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-emerald-50 rounded-lg border border-emerald-300 p-0.5 shadow-2xs"
            >
              <button
                type="button"
                onClick={handleDecrement}
                className="w-6 h-6 flex items-center justify-center text-emerald-800 hover:bg-emerald-100 rounded transition-colors font-bold text-xs"
                aria-label="Decrease"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-5 text-center text-xs font-bold text-emerald-950 font-sans">
                {currentQuantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-6 h-6 flex items-center justify-center text-emerald-800 hover:bg-emerald-100 rounded transition-colors font-bold text-xs"
                aria-label="Increase"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
