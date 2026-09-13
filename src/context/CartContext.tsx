import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, CustomerDetails, Product, JuicePackage } from '../types';
import { STORE_CONFIG, DELIVERY_SLOTS } from '../config/whatsapp';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customNotes?: string) => void;
  addPlanToCart: (plan: JuicePackage, durationDays?: number, bottlesPerDay?: number, deliverySlot?: string) => void;
  addCustomPackageToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Totals
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalItems: number;
  isFreeDelivery: boolean;
  amountNeededForFreeDelivery: number;
  
  // Customer details
  customer: CustomerDetails;
  updateCustomer: (updates: Partial<CustomerDetails>) => void;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  generatedWhatsAppUrl: string;
  setGeneratedWhatsAppUrl: (url: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DEFAULT_CUSTOMER: CustomerDetails = {
  name: '',
  phone: '',
  address: '',
  landmark: '',
  deliverySlot: DELIVERY_SLOTS[1].labelTa, // Default to 6:30 AM - 7:00 AM
  notes: '',
  houseNumber: ''
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart items persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pazhamudir_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Customer details persistence
  const [customer, setCustomer] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem('pazhamudir_customer');
      if (saved) {
        return { ...DEFAULT_CUSTOMER, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_CUSTOMER;
  });

  // Modal / drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pazhamudir_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('pazhamudir_customer', JSON.stringify(customer));
    } catch {
      // ignore
    }
  }, [customer]);

  const addToCart = (product: Product, quantity = 1, customNotes?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.itemType === 'product' && item.productId === product.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `prod_${product.id}_${Date.now()}`,
        itemType: 'product',
        productId: product.id,
        nameTa: product.nameTa,
        nameEn: product.nameEn,
        size: product.size,
        price: product.price,
        quantity,
        image: product.image,
        customDetails: customNotes ? { notes: customNotes } : undefined
      };

      return [...prev, newItem];
    });
  };

  const addPlanToCart = (
    plan: JuicePackage,
    durationDays = plan.durationDays,
    bottlesPerDay = plan.bottlesPerDay,
    deliverySlot?: string
  ) => {
    // Calculate total price based on duration multiplier if changed
    const basePlanPrice = plan.price;
    const pricePerDay = basePlanPrice / plan.durationDays;
    const calculatedPrice = Math.round(pricePerDay * durationDays * bottlesPerDay);

    const newItem: CartItem = {
      id: `plan_${plan.id}_${Date.now()}`,
      itemType: 'plan',
      packageId: plan.id,
      nameTa: plan.nameTa,
      nameEn: plan.nameEn,
      size: `${durationDays} Days (${bottlesPerDay} bottle/day)`,
      price: calculatedPrice,
      quantity: 1,
      image: plan.image,
      customDetails: {
        durationDays,
        bottlesPerDay,
        deliverySlot: deliverySlot || customer.deliverySlot
      }
    };

    setCart(prev => [...prev, newItem]);
  };

  const addCustomPackageToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `custom_box_${Date.now()}`
    };
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCustomer = (updates: Partial<CustomerDetails>) => {
    setCustomer(prev => ({ ...prev, ...updates }));
  };

  // Totals calculation
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Packages always qualify for free delivery, or if subtotal >= ₹150
  const hasPlanOrPackage = useMemo(() => {
    return cart.some(item => item.itemType === 'plan' || item.itemType === 'custom_package');
  }, [cart]);

  const isFreeDelivery = useMemo(() => {
    if (cart.length === 0) return true;
    return hasPlanOrPackage || subtotal >= STORE_CONFIG.freeDeliveryThreshold;
  }, [cart, hasPlanOrPackage, subtotal]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0 || isFreeDelivery) return 0;
    return STORE_CONFIG.deliveryCharge;
  }, [cart, isFreeDelivery]);

  const total = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  const amountNeededForFreeDelivery = useMemo(() => {
    if (isFreeDelivery || cart.length === 0) return 0;
    return Math.max(0, STORE_CONFIG.freeDeliveryThreshold - subtotal);
  }, [isFreeDelivery, cart, subtotal]);

  const value: CartContextType = {
    cart,
    addToCart,
    addPlanToCart,
    addCustomPackageToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    totalItems,
    isFreeDelivery,
    amountNeededForFreeDelivery,
    customer,
    updateCustomer,
    isCartOpen,
    setIsCartOpen,
    selectedProduct,
    setSelectedProduct,
    isWhatsAppModalOpen,
    setIsWhatsAppModalOpen,
    generatedWhatsAppUrl,
    setGeneratedWhatsAppUrl
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
