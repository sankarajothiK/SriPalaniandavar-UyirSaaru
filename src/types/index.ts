export type Language = 'ta' | 'en';

export interface Category {
  id: string;
  nameTa: string;
  nameEn: string;
  icon: string;
  descriptionTa: string;
  descriptionEn: string;
  badgeTa?: string;
  badgeEn?: string;
  color?: string;
}

export interface Product {
  id: string;
  nameTa: string;
  nameEn: string;
  category: string;
  descriptionTa: string;
  descriptionEn: string;
  ingredientsTa: string[];
  ingredientsEn: string[];
  size: string;
  price: number;
  image: string;
  tags?: string[];
  isSugarConscious?: boolean;
  isThyroidSupport?: boolean;
  isFitness?: boolean;
  isBestSeller?: boolean;
  badgeTa?: string;
  badgeEn?: string;
  nutritionHighlightsTa?: string[];
  nutritionHighlightsEn?: string[];
  available: boolean;
}

export interface PlanDaySchedule {
  dayTa: string;
  dayEn: string;
  juiceNameTa: string;
  juiceNameEn: string;
  benefitTa: string;
  benefitEn: string;
  icon: string;
  color: string;
}

export interface JuicePackage {
  id: string;
  nameTa: string;
  nameEn: string;
  taglineTa: string;
  taglineEn: string;
  price: number;
  originalPrice?: number;
  durationDays: number;
  bottlesPerDay: number;
  totalBottles: number;
  schedule: PlanDaySchedule[];
  descriptionTa: string;
  descriptionEn: string;
  badgeTa?: string;
  badgeEn?: string;
  image: string;
  featuresTa: string[];
  featuresEn: string[];
}

export interface CartItem {
  id: string; // unique item id in cart
  itemType: 'product' | 'plan' | 'custom_package';
  productId?: string;
  packageId?: string;
  nameTa: string;
  nameEn: string;
  size?: string;
  price: number;
  quantity: number;
  image: string;
  customDetails?: {
    frequency?: string;
    frequencyTa?: string;
    frequencyEn?: string;
    selectedJuices?: Array<{ nameTa: string; nameEn: string; qty: number }>;
    durationDays?: number;
    bottlesPerDay?: number;
    deliverySlot?: string;
    notes?: string;
  };
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  deliverySlot: string;
  notes: string;
  houseNumber?: string;
}

export interface DeliverySlotOption {
  id: string;
  labelTa: string;
  labelEn: string;
  time: string;
  badgeTa?: string;
  badgeEn?: string;
}
