import React, { useState, useEffect } from 'react';
import './App.css';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  FileText,
  X
} from 'lucide-react';

interface PackageJuiceItem {
  id: string;
  juiceTa: string;
  juiceEn: string;
  ingredientsTa: string;
  ingredientsEn: string;
  price: number;
  emoji: string;
  image: string;
  isVegTrio?: boolean;
}

interface PackageItem {
  id: string;
  ta: string;
  en: string;
  price: number;
  old: number;
  priceRangeTa?: string;
  priceRangeEn?: string;
  isRoutinePackage?: boolean;
  icon: string;
  color: string;
  listTa: string;
  listEn: string;
  image: string;
  juices: PackageJuiceItem[];
}

interface CartItem {
  id: string;
  ta: string;
  en: string;
  price: number;
  qty: number;
  type: string;
  emoji?: string;
  image?: string;
  benefit?: string;
}

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  slot: string;
  date: string;
  sugarOption?: string;
  iceOption?: string;
}

const WHATSAPP_NUMBER = "919342969285";
const DISPLAY_PHONE = "+91 9342969285";

const images = {
  logo: "/assets/logo.jpg",
  hero: "https://images.unsplash.com/photo-1581252926832-61fd89c80c9e?auto=format&fit=crop&w=1200&q=85",
  bottles: "https://images.pexels.com/photos/34460655/pexels-photo-34460655.jpeg?auto=compress&cs=tinysrgb&w=940"
};

// Exact 6 Clean Health Packages with High-Visibility Included Items & Ingredients
const packages: PackageItem[] = [
  {
    id: "diabetes-prevention",
    ta: "சர்க்கரை நோய் தடுப்பு திட்டம்",
    en: "Diabetes Disease Prevention",
    price: 50,
    old: 60,
    priceRangeTa: "₹50 – ₹120",
    priceRangeEn: "₹50 – ₹120",
    isRoutinePackage: false,
    icon: "🌿",
    color: "sage",
    listTa: "வெள்ளரி+புதினா · பாகற்காய் · அவகேடோ · கேரட் · கற்றாழை · வெண்பூசணி · மாதுளை · நெல்லிக்காய் சாறு · கறிவேப்பிலை ஜூஸ்",
    listEn: "Cucumber+Mint · Bitter Gourd · Avocado · Carrot · Aloe Vera · White Pumpkin · Pomegranate · Pure Amla Juice · Karuveppilai Juice",
    image: "/images/package1/1.png",
    juices: [
      {
        id: "dp-cuc-lem-min",
        juiceTa: "வெள்ளரி + எலுமிச்சை + புதினா",
        juiceEn: "Cucumber + Lemon + Mint",
        ingredientsTa: "வெள்ளரி + எலுமிச்சை + புதினா",
        ingredientsEn: "Cucumber + Lemon + Mint",
        price: 50,
        emoji: "🥒",
        image: "/images/package1/1.png"
      },
      {
        id: "dp-bit-cuc-lem-min",
        juiceTa: "பாகற்காய் + வெள்ளரி + எலுமிச்சை + புதினா",
        juiceEn: "Bitter Gourd + Cucumber + Lemon + Mint",
        ingredientsTa: "பாகற்காய் + வெள்ளரி + எலுமிச்சை + புதினா",
        ingredientsEn: "Bitter Gourd + Cucumber + Lemon + Mint",
        price: 60,
        emoji: "🥒",
        image: "/images/package1/3.png"
      },
      {
        id: "dp-avocado",
        juiceTa: "அவகேடோ / வெண்ணெய் பழம்",
        juiceEn: "Avocado Juice / Shake",
        ingredientsTa: "அவகேடோ (100% இயற்கை)",
        ingredientsEn: "Fresh Avocado",
        price: 120,
        emoji: "🥑",
        image: "/images/special/avocado.jpg"
      },
      {
        id: "dp-carrot",
        juiceTa: "கேரட் ஜூஸ்",
        juiceEn: "Carrot Juice",
        ingredientsTa: "புதிய கேரட்",
        ingredientsEn: "Fresh Carrots",
        price: 50,
        emoji: "🥕",
        image: "/images/special/carrot.jpg"
      },
      {
        id: "dp-aloe-vera",
        juiceTa: "கற்றாழை ஜூஸ்",
        juiceEn: "Aloe Vera Juice",
        ingredientsTa: "தூய கற்றாழை சாறு + எலுமிச்சை",
        ingredientsEn: "Pure Aloe Vera Gel + Lemon",
        price: 50,
        emoji: "🌿",
        image: "/images/special/aloe-vera.jpg"
      },
      {
        id: "dp-apple",
        juiceTa: "ஆப்பிள் ஜூஸ்",
        juiceEn: "Apple Juice",
        ingredientsTa: "ஆப்பிள்",
        ingredientsEn: "Fresh Apple",
        price: 80,
        emoji: "🍎",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dp-blueberry",
        juiceTa: "புளூபெர்ரி ஜூஸ்",
        juiceEn: "Blueberry Juice",
        ingredientsTa: "புதிய புளூபெர்ரி பழங்கள்",
        ingredientsEn: "Fresh Blueberries",
        price: 120,
        emoji: "🫐",
        image: "/images/special/blueberry.jpg"
      },
      {
        id: "dp-wht-pmp-lem-gin",
        juiceTa: "வெண்பூசணி + எலுமிச்சை + இஞ்சி",
        juiceEn: "White Pumpkin + Lemon + Ginger",
        ingredientsTa: "வெண்பூசணி + எலுமிச்சை + இஞ்சி",
        ingredientsEn: "White Pumpkin + Lemon + Ginger",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "dp-wht-pmp-lem-min",
        juiceTa: "வெண்பூசணி + எலுமிச்சை + புதினா",
        juiceEn: "White Pumpkin + Lemon + Mint",
        ingredientsTa: "வெண்பூசணி + எலுமிச்சை + புதினா",
        ingredientsEn: "White Pumpkin + Lemon + Mint",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "dp-plain-wht-pmp",
        juiceTa: "சுத்தமான வெண்பூசணி சாறு",
        juiceEn: "Plain White Pumpkin Juice",
        ingredientsTa: "100% தூய வெண்பூசணி சாறு",
        ingredientsEn: "100% Pure White Pumpkin (Ash Gourd)",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "dp-bitter-gourd",
        juiceTa: "பாகற்காய் சாறு",
        juiceEn: "Bitter Gourd Juice",
        ingredientsTa: "பாகற்காய் + எலுமிச்சை",
        ingredientsEn: "Bitter Gourd + Lemon",
        price: 50,
        emoji: "🥒",
        image: "/images/special/bitter-gourd.jpg"
      },
      {
        id: "dp-cuc-min",
        juiceTa: "வெள்ளரி + புதினா",
        juiceEn: "Cucumber + Mint",
        ingredientsTa: "வெள்ளரி + புதினா",
        ingredientsEn: "Cucumber + Mint",
        price: 50,
        emoji: "🥒",
        image: "/images/special/cucumber-mint.jpg"
      },
      {
        id: "dp-naatu-pom",
        juiceTa: "நாட்டு மாதுளை",
        juiceEn: "Naatu Pomegranate Juice",
        ingredientsTa: "நாட்டு மாதுளை",
        ingredientsEn: "Country Naatu Pomegranate",
        price: 80,
        emoji: "❤️",
        image: "/images/special/white-pomegranate.jpg"
      },
      {
        id: "dp-red-pom",
        juiceTa: "சிவப்பு மாதுளை",
        juiceEn: "Red Pomegranate Juice",
        ingredientsTa: "சிவப்பு மாதுளை",
        ingredientsEn: "Red Ruby Pomegranate",
        price: 80,
        emoji: "💎",
        image: "/images/fresh/pomegranate.jpg"
      },
      {
        id: "dp-orange",
        juiceTa: "ஆரஞ்சு ஜூஸ்",
        juiceEn: "Orange Juice",
        ingredientsTa: "ஆரஞ்சு",
        ingredientsEn: "Fresh Orange",
        price: 80,
        emoji: "🍊",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "dp-car-ora",
        juiceTa: "கேரட் + ஆரஞ்சு",
        juiceEn: "Carrot + Orange",
        ingredientsTa: "கேரட் + ஆரஞ்சு",
        ingredientsEn: "Carrot + Orange",
        price: 90,
        emoji: "🥕",
        image: "/images/package2/2.png"
      },
      {
        id: "dp-kar-lem-slt-jce",
        juiceTa: "கறிவேப்பிலை + எலுமிச்சை + உப்பு ஜூஸ்",
        juiceEn: "Karuveppilai + Lemon + Salt Juice",
        ingredientsTa: "கறிவேப்பிலை + எலுமிச்சை + இந்துப்பு",
        ingredientsEn: "Curry Leaves + Lemon + Pink Salt",
        price: 50,
        emoji: "🌿",
        image: "/images/special/karuveppilai.jpg"
      },
      {
        id: "dp-kar-gin-slt-jce",
        juiceTa: "கறிவேப்பிலை + இஞ்சி + உப்பு ஜூஸ்",
        juiceEn: "Karuveppilai + Ginger + Salt Juice",
        ingredientsTa: "கறிவேப்பிலை + இஞ்சி + இந்துப்பு",
        ingredientsEn: "Curry Leaves + Ginger + Pink Salt",
        price: 50,
        emoji: "🌿",
        image: "/images/special/karuveppilai.jpg"
      },
      {
        id: "dp-amla",
        juiceTa: "நெல்லிக்காய் சாறு",
        juiceEn: "Pure Amla Juice",
        ingredientsTa: "100% தூய நெல்லிக்காய் சாறு",
        ingredientsEn: "100% Pure Amla Extract",
        price: 50,
        emoji: "🌿",
        image: "/images/fresh/amla.jpg"
      }
    ]
  },
  {
    id: "thyroid-prevention",
    ta: "தைராய்டு நோய் தடுப்பு திட்டம்",
    en: "Thyroid Disease Prevention",
    price: 50,
    old: 60,
    priceRangeTa: "₹50 – ₹120",
    priceRangeEn: "₹50 – ₹120",
    isRoutinePackage: false,
    icon: "🦋",
    color: "teal",
    listTa: "நெல்லிக்காய்+வெள்ளரி · கேரட்+ஆரஞ்சு · ஆப்பிள்+புதினா · கொய்யா · மாதுளை · இளநீர் (சிறியது & பெரியது) · கேரட்+ஆப்பிள் · அன்னாசி+இஞ்சி · கறிவேப்பிலை+தேன்+எலுமிச்சை · மிக்ஸட் நட்ஸ் ஷேக்",
    listEn: "Amla+Cucumber · Carrot+Orange · Apple+Mint · Guava · Pomegranate · Coconut Water (Small & Large) · Carrot+Apple · Pineapple+Ginger · Karuveppilai+Honey+Lemon · Mixed Nuts Shake",
    image: "/images/package2/1.png",
    juices: [
      {
        id: "tp-aml-cuc-min",
        juiceTa: "நெல்லிக்காய் + வெள்ளரி + புதினா",
        juiceEn: "Amla + Cucumber + Mint",
        ingredientsTa: "நெல்லிக்காய் + வெள்ளரி + புதினா",
        ingredientsEn: "Amla + Cucumber + Mint",
        price: 60,
        emoji: "🌿",
        image: "/images/special/amla-cucumber-mint.jpg"
      },
      {
        id: "tp-car-ora",
        juiceTa: "கேரட் + ஆரஞ்சு",
        juiceEn: "Carrot + Orange",
        ingredientsTa: "கேரட் + ஆரஞ்சு",
        ingredientsEn: "Carrot + Orange",
        price: 90,
        emoji: "🍊",
        image: "/images/package2/2.png"
      },
      {
        id: "tp-app-cuc-min",
        juiceTa: "ஆப்பிள் + வெள்ளரி + புதினா",
        juiceEn: "Apple + Cucumber + Mint",
        ingredientsTa: "ஆப்பிள் + வெள்ளரி + புதினா",
        ingredientsEn: "Apple + Cucumber + Mint",
        price: 100,
        emoji: "🍏",
        image: "/images/package2/3.png"
      },
      {
        id: "tp-gua-lem",
        juiceTa: "கொய்யா + எலுமிச்சை",
        juiceEn: "Guava + Lemon",
        ingredientsTa: "கொய்யா + எலுமிச்சை",
        ingredientsEn: "Guava + Lemon",
        price: 60,
        emoji: "🍐",
        image: "/images/package2/4.png"
      },
      {
        id: "tp-pom-cuc",
        juiceTa: "மாதுளை + வெள்ளரி",
        juiceEn: "Pomegranate + Cucumber",
        ingredientsTa: "மாதுளை + வெள்ளரி",
        ingredientsEn: "Pomegranate + Cucumber",
        price: 80,
        emoji: "❤️",
        image: "/images/package2/5.png"
      },
      {
        id: "tp-coc-wat-small",
        juiceTa: "இளநீர் (சிறியது)",
        juiceEn: "Coconut Water (Small)",
        ingredientsTa: "இயற்கை இளநீர் (சிறியது)",
        ingredientsEn: "Fresh Tender Coconut Water (Small)",
        price: 60,
        emoji: "🥥",
        image: "/images/package2/6.png"
      },
      {
        id: "tp-coc-wat-large",
        juiceTa: "இளநீர் (பெரியது)",
        juiceEn: "Coconut Water (Large)",
        ingredientsTa: "இயற்கை இளநீர் (பெரியது)",
        ingredientsEn: "Fresh Tender Coconut Water (Large)",
        price: 100,
        emoji: "🥥",
        image: "/images/package2/6.png"
      },
      {
        id: "tp-car-app",
        juiceTa: "கேரட் + ஆப்பிள்",
        juiceEn: "Carrot + Apple",
        ingredientsTa: "கேரட் + ஆப்பிள்",
        ingredientsEn: "Carrot + Apple",
        price: 90,
        emoji: "🥕",
        image: "/images/special/carrot-apple.jpg"
      },
      {
        id: "tp-app-aml",
        juiceTa: "ஆப்பிள் + நெல்லிக்காய்",
        juiceEn: "Apple + Amla",
        ingredientsTa: "ஆப்பிள் + நெல்லிக்காய்",
        ingredientsEn: "Apple + Amla",
        price: 110,
        emoji: "🍎",
        image: "/images/special/apple-amla.jpg"
      },
      {
        id: "tp-pin-gin",
        juiceTa: "அன்னாசி + இஞ்சி",
        juiceEn: "Pineapple + Ginger",
        ingredientsTa: "அன்னாசி + இஞ்சி",
        ingredientsEn: "Pineapple + Ginger",
        price: 90,
        emoji: "🍍",
        image: "/images/special/pineapple-ginger.jpg"
      },
      {
        id: "tp-cuc-min-gin",
        juiceTa: "வெள்ளரி + புதினா + இஞ்சி",
        juiceEn: "Cucumber + Mint + Ginger",
        ingredientsTa: "வெள்ளரி + புதினா + இஞ்சி",
        ingredientsEn: "Cucumber + Mint + Ginger",
        price: 60,
        emoji: "🥒",
        image: "/images/special/cucumber-mint-ginger.jpg"
      },
      {
        id: "tp-cuc-min-lem",
        juiceTa: "வெள்ளரி + புதினா + எலுமிச்சை",
        juiceEn: "Cucumber + Mint + Lemon",
        ingredientsTa: "வெள்ளரி + புதினா + எலுமிச்சை",
        ingredientsEn: "Cucumber + Mint + Lemon",
        price: 60,
        emoji: "🥒",
        image: "/images/special/cucumber-mint.jpg"
      },
      {
        id: "tp-naatu-pom",
        juiceTa: "நாட்டு மாதுளை",
        juiceEn: "Naatu Pomegranate",
        ingredientsTa: "நாட்டு மாதுளை",
        ingredientsEn: "Country Naatu Pomegranate",
        price: 80,
        emoji: "❤️",
        image: "/images/special/white-pomegranate.jpg"
      },
      {
        id: "tp-red-pom",
        juiceTa: "சிவப்பு மாதுளை",
        juiceEn: "Red Pomegranate",
        ingredientsTa: "சிவப்பு மாதுளை",
        ingredientsEn: "Ruby Red Pomegranate",
        price: 80,
        emoji: "💎",
        image: "/images/fresh/pomegranate.jpg"
      },
      {
        id: "tp-amla",
        juiceTa: "நெல்லிக்காய் சாறு",
        juiceEn: "Pure Amla Juice",
        ingredientsTa: "100% தூய நெல்லிக்காய் சாறு",
        ingredientsEn: "100% Pure Amla Extract",
        price: 50,
        emoji: "🌿",
        image: "/images/special/pure-amla.jpg"
      },
      {
        id: "tp-car-coc-mlk",
        juiceTa: "கேரட் + தேங்காய்ப்பால்",
        juiceEn: "Carrot + Coconut Milk",
        ingredientsTa: "கேரட் + புதிய தேங்காய்ப்பால்",
        ingredientsEn: "Carrot + Fresh Coconut Milk",
        price: 60,
        emoji: "🥥",
        image: "/images/special/carrot-coconut-milk.jpg"
      },
      {
        id: "tp-bee-coc-mlk",
        juiceTa: "பீட்ரூட் + தேங்காய்ப்பால்",
        juiceEn: "Beetroot + Coconut Milk",
        ingredientsTa: "பீட்ரூட் + புதிய தேங்காய்ப்பால்",
        ingredientsEn: "Beetroot + Fresh Coconut Milk",
        price: 60,
        emoji: "🥥",
        image: "/images/special/beetroot-coconut-milk.jpg"
      },
      {
        id: "tp-mix-nut-shk",
        juiceTa: "மிக்ஸட் நட்ஸ் ஷேக்",
        juiceEn: "Mixed Nuts Shake",
        ingredientsTa: "பாதாம் + முந்திரி + பிஸ்தா + அத்திப்பழம் + கருப்பு திராட்சை + பேரீச்சை + விதைகள்",
        ingredientsEn: "Badam + Munthiri + Pista + Athipalam + Blackgrapes + Dates + Seeds",
        price: 120,
        emoji: "🥜",
        image: "/images/package3/1.png"
      },
      {
        id: "tp-lem-jce",
        juiceTa: "எலுமிச்சை ஜூஸ்",
        juiceEn: "Lemon Juice",
        ingredientsTa: "புதிய எலுமிச்சை சாறு",
        ingredientsEn: "Fresh Lemon Juice",
        price: 50,
        emoji: "🍋",
        image: "/images/package1/1.png"
      },
      {
        id: "tp-ora-jce",
        juiceTa: "ஆரஞ்சு ஜூஸ்",
        juiceEn: "Orange Juice",
        ingredientsTa: "ஆரஞ்சு",
        ingredientsEn: "Fresh Orange",
        price: 80,
        emoji: "🍊",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "tp-kar-jce",
        juiceTa: "கறிவேப்பிலை ஜூஸ்",
        juiceEn: "Karuveppilai Juice",
        ingredientsTa: "புதிய கறிவேப்பிலை சாறு",
        ingredientsEn: "Fresh Curry Leaves Extract",
        price: 50,
        emoji: "🌿",
        image: "/images/special/karuveppilai.jpg"
      },
      {
        id: "tp-kar-hon-lem-jce",
        juiceTa: "கறிவேப்பிலை + தேன் + எலுமிச்சை ஜூஸ்",
        juiceEn: "Karuveppilai + Honey + Lemon Juice",
        ingredientsTa: "கறிவேப்பிலை + சுத்தமான தேன் + எலுமிச்சை",
        ingredientsEn: "Curry Leaves + Pure Honey + Lemon",
        price: 60,
        emoji: "🌿",
        image: "/images/special/karuveppilai.jpg"
      },
      {
        id: "tp-kar-lem-slt-jce",
        juiceTa: "கறிவேப்பிலை + எலுமிச்சை + உப்பு ஜூஸ்",
        juiceEn: "Karuveppilai + Lemon + Salt Juice",
        ingredientsTa: "கறிவேப்பிலை + எலுமிச்சை + இந்துப்பு",
        ingredientsEn: "Curry Leaves + Lemon + Pink Salt",
        price: 60,
        emoji: "🌿",
        image: "/images/special/karuveppilai.jpg"
      }
    ]
  },
  {
    id: "weight-loss",
    ta: "உடல் எடை குறைப்பு திட்டம்",
    en: "Weight Loss Package",
    price: 50,
    old: 65,
    priceRangeTa: "₹50 – ₹130",
    priceRangeEn: "₹50 – ₹130",
    isRoutinePackage: false,
    icon: "🏃",
    color: "amber",
    listTa: "இஞ்சி+எலுமிச்சை+இலவங்கம் · வெண்பூசணி+எலுமிச்சை+புதினா+உப்பு · தர்பூசணி · வெள்ளரி+இஞ்சி+புதினா+எலுமிச்சை · வெண்பூசணி+கறிவேப்பிலை+இஞ்சி · எலுமிச்சை+சியா+பாதாம் பிசின் · ஆரஞ்சு+இளநீர் · ABC ஜூஸ் · மிக்ஸட் நட்ஸ் ஷேக்",
    listEn: "Ginger+Lemon+Cinnamon · White Pumpkin+Lemon+Mint+Salt · Watermelon · Cucumber+Ginger+Mint+Lemon · White Pumpkin+Curry Leaves+Ginger · Lemon+Chia+Badam Pisin · Orange+Coconut Water · ABC Juice · Mixed Nuts Shake",
    image: "/images/special/ginger-lemon-cinnamon.jpg",
    juices: [
      {
        id: "wl-gin-lem-cin",
        juiceTa: "இஞ்சி + எலுமிச்சை + இலவங்கப்பட்டை",
        juiceEn: "Ginger + Lemon + Cinnamon",
        ingredientsTa: "இஞ்சி + எலுமிச்சை + இலவங்கப்பட்டை",
        ingredientsEn: "Ginger + Lemon + Cinnamon",
        price: 50,
        emoji: "🍋",
        image: "/images/special/ginger-lemon-cinnamon.jpg"
      },
      {
        id: "wl-wht-pmp-lem-min-slt",
        juiceTa: "வெண்பூசணி + எலுமிச்சை + புதினா + உப்பு",
        juiceEn: "White Pumpkin + Lemon + Mint + Salt",
        ingredientsTa: "வெண்பூசணி + எலுமிச்சை + புதினா + இந்துப்பு",
        ingredientsEn: "White Pumpkin + Lemon + Mint + Pink Salt",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "wl-wht-pmp-gin-min-slt",
        juiceTa: "வெண்பூசணி + இஞ்சி + புதினா + உப்பு",
        juiceEn: "White Pumpkin + Ginger + Mint + Salt",
        ingredientsTa: "வெண்பூசணி + இஞ்சி + புதினா + இந்துப்பு",
        ingredientsEn: "White Pumpkin + Ginger + Mint + Pink Salt",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "wl-wat-mel",
        juiceTa: "தர்பூசணி ஜூஸ்",
        juiceEn: "Watermelon Juice",
        ingredientsTa: "100% தூய புதிய தர்பூசணி சாறு",
        ingredientsEn: "100% Pure Fresh Watermelon Extract",
        price: 60,
        emoji: "🍉",
        image: "/images/package4/6.png"
      },
      {
        id: "wl-cuc-gin-min-lem",
        juiceTa: "வெள்ளரி + இஞ்சி + புதினா + எலுமிச்சை ஜூஸ்",
        juiceEn: "Cucumber + Ginger + Mint + Lemon Juice",
        ingredientsTa: "வெள்ளரி + இஞ்சி + புதினா + எலுமிச்சை",
        ingredientsEn: "Cucumber + Ginger + Mint + Lemon",
        price: 50,
        emoji: "🥒",
        image: "/images/special/cucumber-mint-ginger.jpg"
      },
      {
        id: "wl-orange",
        juiceTa: "ஆரஞ்சு ஜூஸ்",
        juiceEn: "Orange Juice",
        ingredientsTa: "ஆரஞ்சு",
        ingredientsEn: "Fresh Orange",
        price: 80,
        emoji: "🍊",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "wl-wht-pmp-kar",
        juiceTa: "வெண்பூசணி + கறிவேப்பிலை ஜூஸ்",
        juiceEn: "White Pumpkin + Curry Leaves Juice",
        ingredientsTa: "வெண்பூசணி + கறிவேப்பிலை சாறு",
        ingredientsEn: "White Pumpkin + Curry Leaves Extract",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "wl-wht-pmp-kar-gin",
        juiceTa: "வெண்பூசணி + கறிவேப்பிலை + இஞ்சி ஜூஸ்",
        juiceEn: "White Pumpkin + Curry Leaves + Ginger Juice",
        ingredientsTa: "வெண்பூசணி + கறிவேப்பிலை + இஞ்சி சாறு",
        ingredientsEn: "White Pumpkin + Curry Leaves + Ginger Extract",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "wl-wht-pmp-kar-lem",
        juiceTa: "வெண்பூசணி + கறிவேப்பிலை + எலுமிச்சை ஜூஸ்",
        juiceEn: "White Pumpkin + Curry Leaves + Lemon Juice",
        ingredientsTa: "வெண்பூசணி + கறிவேப்பிலை + எலுமிச்சை சாறு",
        ingredientsEn: "White Pumpkin + Curry Leaves + Lemon Extract",
        price: 50,
        emoji: "🥣",
        image: "/images/special/white-pumpkin.jpg"
      },
      {
        id: "wl-mix-nut-shk",
        juiceTa: "மிக்ஸட் நட்ஸ் ஷேக்",
        juiceEn: "Mixed Nuts Shake",
        ingredientsTa: "பாதாம் + முந்திரி + பிஸ்தா + அத்திப்பழம் + பேரீச்சை + விதைகள்",
        ingredientsEn: "Badam + Munthiri + Pista + Athipalam + Dates + Seeds",
        price: 120,
        emoji: "🥜",
        image: "/images/package3/1.png"
      },
      {
        id: "wl-lem-chia-pisin",
        juiceTa: "எலுமிச்சை + சியா விதை + பாதாம் பிசின்",
        juiceEn: "Lemon + Chia Seeds + Badam Pisin",
        ingredientsTa: "எலுமிச்சை சாறு + ஊறவைத்த சியா விதைகள் + தூய பாதாம் பிசின்",
        ingredientsEn: "Lemon Juice + Soaked Chia Seeds + Pure Badam Pisin",
        price: 70,
        emoji: "🍋",
        image: "/images/special/lemon-chia-badam-pisin.jpg"
      },
      {
        id: "wl-ora-chia-pisin",
        juiceTa: "ஆரஞ்சு + சியா விதை + பாதாம் பிசின்",
        juiceEn: "Orange + Chia Seeds + Badam Pisin",
        ingredientsTa: "புதிய ஆரஞ்சு + ஊறவைத்த சியா விதைகள் + தூய பாதாம் பிசின்",
        ingredientsEn: "Fresh Orange + Soaked Chia Seeds + Pure Badam Pisin",
        price: 80,
        emoji: "🍊",
        image: "/images/special/orange-chia-badam-pisin.jpg"
      },
      {
        id: "wl-ora-coc-wat",
        juiceTa: "ஆரஞ்சு + இயற்கை இளநீர்",
        juiceEn: "Orange + Coconut Water",
        ingredientsTa: "புதிய ஆரஞ்சு + இயற்கை இளநீர்",
        ingredientsEn: "Fresh Orange + Pure Tender Coconut Water",
        price: 130,
        emoji: "🥥",
        image: "/images/special/orange-coconut-water.jpg"
      },
      {
        id: "wl-car-bee",
        juiceTa: "கேரட் + பீட்ரூட் ஜூஸ்",
        juiceEn: "Carrot + Beetroot Juice",
        ingredientsTa: "கேரட் + பீட்ரூட்",
        ingredientsEn: "Fresh Carrot + Beetroot",
        price: 80,
        emoji: "🥕",
        image: "/images/package3/6.png"
      },
      {
        id: "wl-abc",
        juiceTa: "ABC ஜூஸ் (ஆப்பிள் + பீட்ரூட் + கேரட்)",
        juiceEn: "ABC Juice (Apple + Beetroot + Carrot)",
        ingredientsTa: "ஆப்பிள் + பீட்ரூட் + கேரட்",
        ingredientsEn: "Apple + Beetroot + Carrot",
        price: 100,
        emoji: "🍎",
        image: "/images/package3/7.png"
      }
    ]
  },
  {
    id: "nuts-energy-fitness",
    ta: "நட்ஸ் / உடற்பயிற்சி & ஆற்றல் திட்டம்",
    en: "Nuts / Energy & Fitness",
    price: 70,
    old: 85,
    priceRangeTa: "₹70 – ₹120",
    priceRangeEn: "₹70 – ₹120",
    isRoutinePackage: false,
    icon: "⚡",
    color: "orange",
    listTa: "மிக்ஸட் நட்ஸ் ஷேக் · பாதாம் பவர் · பிஸ்தா & பேரீச்சை + பால் · வால்நட்+பேரீச்சை · பாதாம்+பிஸ்தா+பேரீச்சை · செவ்வாழை மில்க் ஷேக் · BC ஜூஸ் · ABC ஜூஸ்",
    listEn: "Mixed Nuts Shake · Almond Power · Pista & Dates + Milk · Walnut & Dates Power · Almond+Pista+Dates · Red Banana Shake · BC Juice · ABC Juice",
    image: "/images/package3/1.png",
    juices: [
      {
        id: "nf-mix-nut",
        juiceTa: "மிக்ஸட் நட்ஸ் ஷேக்",
        juiceEn: "Mixed Nuts Shake",
        ingredientsTa: "பாதாம் + முந்திரி + பிஸ்தா + அத்திப்பழம் + கருப்பு திராட்சை + பேரீச்சை + வெள்ளரி விதை + பூசணி விதை + சூரியகாந்தி விதை + தர்பூசணி விதை",
        ingredientsEn: "Badam + Munthiri + Pista + Athipalam + Blackgrapes + Dates + Cucumber seed + Pumpkin seeds + Sunflower seed + Watermelon seeds",
        price: 120,
        emoji: "🥜",
        image: "/images/package3/1.png"
      },
      {
        id: "nf-alm-pow",
        juiceTa: "பாதாம் பவர்",
        juiceEn: "Almond Power",
        ingredientsTa: "பாதாம் + பேரீச்சை + பால்",
        ingredientsEn: "Badam + Dates + Milk",
        price: 80,
        emoji: "🌰",
        image: "/images/package3/2.png"
      },
      {
        id: "nf-pis-mlk",
        juiceTa: "பிஸ்தா & பேரீச்சை + பால்",
        juiceEn: "Pista & Dates + Milk",
        ingredientsTa: "பிஸ்தா + பேரீச்சை + பால் + ஏலக்காய்",
        ingredientsEn: "Pista + Medjool Dates + Milk + Elaichi",
        price: 80,
        emoji: "🥛",
        image: "/images/special/pista-milk-dates.jpg"
      },
      {
        id: "nf-wal-pow",
        juiceTa: "வால்நட் + பேரீச்சை பவர்",
        juiceEn: "Walnut & Dates Power",
        ingredientsTa: "வால்நட் + பேரீச்சை + பாதாம் + பால்",
        ingredientsEn: "Walnut + Dates + Badam + Milk",
        price: 100,
        emoji: "🧠",
        image: "/images/special/walnut-power-dates.jpg"
      },
      {
        id: "nf-alm-pis",
        juiceTa: "பாதாம் + பிஸ்தா + பேரீச்சை",
        juiceEn: "Almond + Pista + Dates",
        ingredientsTa: "பாதாம் + பிஸ்தா + பேரீச்சை + பால்",
        ingredientsEn: "Badam + Pista + Dates + Milk",
        price: 100,
        emoji: "🥜",
        image: "/images/special/almond-pista-dates.jpg"
      },
      {
        id: "nf-bc-jce",
        juiceTa: "BC ஜூஸ் (பீட்ரூட் + கேரட் + எலுமிச்சை)",
        juiceEn: "BC Juice (Beetroot + Carrot + Lemon)",
        ingredientsTa: "பீட்ரூட் + கேரட் + எலுமிச்சை",
        ingredientsEn: "Beetroot + Carrot + Lemon",
        price: 70,
        emoji: "🥕",
        image: "/images/package3/6.png"
      },
      {
        id: "nf-abc-jce",
        juiceTa: "ABC ஜூஸ் (ஆப்பிள் + பீட்ரூட் + கேரட்)",
        juiceEn: "ABC Juice (Apple + Beetroot + Carrot)",
        ingredientsTa: "ஆப்பிள் + பீட்ரூட் + கேரட்",
        ingredientsEn: "Apple + Beetroot + Carrot",
        price: 100,
        emoji: "🍎",
        image: "/images/package3/7.png"
      },
      {
        id: "nf-red-ban-shk",
        juiceTa: "செவ்வாழை மில்க் ஷேக்",
        juiceEn: "Red Banana Milkshake",
        ingredientsTa: "இயற்கை செவ்வாழை பழம் + புதிய பால் + தேன் + நட்ஸ்",
        ingredientsEn: "Fresh Red Bananas (Sevvazhai) + Milk + Honey + Nuts",
        price: 70,
        emoji: "🍌",
        image: "/images/special/red-banana-shake.jpg"
      }
    ]
  },
  {
    id: "fresh-juices",
    ta: "புதிய பழச்சாறுகள்",
    en: "Fresh Fruit Juices",
    price: 50,
    old: 60,
    priceRangeTa: "₹50 – ₹120",
    priceRangeEn: "₹50 – ₹120",
    isRoutinePackage: false,
    icon: "🍉",
    color: "rose",
    listTa: "ஆப்பிள் · நாட்டு மாதுளை · சிவப்பு மாதுளை · கிர்ணி · கருப்பு திராட்சை · கொய்யா · ஸ்ட்ராபெரி · பப்பாளி · கிவி · தர்பூசணி · ஆரஞ்சு · அன்னாசி · இளநீர் (சிறியது & பெரியது) · மாம்பழம் · நெல்லிக்காய் · சாத்துக்குடி",
    listEn: "Apple · Naatu Pomegranate · Ruby Pomegranate · Kirni · Black Grapes · Guava · Strawberry · Papaya · Kiwi · Watermelon · Orange · Pineapple · Coconut Water (Small & Large) · Mango · Amla · Sathukudi",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80",
    juices: [
      {
        id: "apple",
        juiceTa: "ஆப்பிள் ஜூஸ்",
        juiceEn: "Apple Juice",
        ingredientsTa: "ஆப்பிள்",
        ingredientsEn: "Apple",
        price: 80,
        emoji: "🍎",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "naatu-pomegranate",
        juiceTa: "நாட்டு மாதுளை ஜூஸ்",
        juiceEn: "Naatu Pomegranate Juice",
        ingredientsTa: "நாட்டு மாதுளை (வெள்ளை மாதுளை)",
        ingredientsEn: "Country Naatu Pomegranate (White Pomegranate)",
        price: 80,
        emoji: "❤️",
        image: "/images/special/white-pomegranate.jpg"
      },
      {
        id: "red-pomegranate",
        juiceTa: "சிவப்பு மாதுளை ஜூஸ்",
        juiceEn: "Red Pomegranate Juice",
        ingredientsTa: "சிவப்பு மாதுளை",
        ingredientsEn: "Red Ruby Pomegranate",
        price: 80,
        emoji: "💎",
        image: "/images/fresh/pomegranate.jpg"
      },
      {
        id: "kirni",
        juiceTa: "கிர்ணி பழச்சாறு",
        juiceEn: "Kirni / Muskmelon Juice",
        ingredientsTa: "கிர்ணி பழம்",
        ingredientsEn: "Kirni / Muskmelon",
        price: 60,
        emoji: "🍈",
        image: "https://images.unsplash.com/photo-1598025362874-49480e049c76?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "black-grapes",
        juiceTa: "கருப்பு திராட்சை ஜூஸ்",
        juiceEn: "Black Grapes Juice",
        ingredientsTa: "கருப்பு திராட்சை",
        ingredientsEn: "Black Grapes",
        price: 60,
        emoji: "🍇",
        image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "guava",
        juiceTa: "கொய்யா ஜூஸ்",
        juiceEn: "Guava Juice",
        ingredientsTa: "கொய்யா",
        ingredientsEn: "Guava",
        price: 60,
        emoji: "🍐",
        image: "/images/fresh/guava.jpg"
      },
      {
        id: "strawberry",
        juiceTa: "ஸ்ட்ராபெரி ஜூஸ்",
        juiceEn: "Strawberry Juice",
        ingredientsTa: "ஸ்ட்ராபெரி",
        ingredientsEn: "Strawberry",
        price: 80,
        emoji: "🍓",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "papaya",
        juiceTa: "பப்பாளி ஜூஸ்",
        juiceEn: "Papaya Juice",
        ingredientsTa: "பப்பாளி",
        ingredientsEn: "Papaya",
        price: 80,
        emoji: "🥭",
        image: "/images/special/fresh-papaya.jpg"
      },
      {
        id: "kiwi",
        juiceTa: "கிவி ஜூஸ்",
        juiceEn: "Kiwi Juice",
        ingredientsTa: "கிவி",
        ingredientsEn: "Kiwi",
        price: 120,
        emoji: "🥝",
        image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "watermelon",
        juiceTa: "தர்பூசணி ஜூஸ்",
        juiceEn: "Watermelon Juice",
        ingredientsTa: "தர்பூசணி",
        ingredientsEn: "Watermelon",
        price: 60,
        emoji: "🍉",
        image: "/images/special/fresh-watermelon.jpg"
      },
      {
        id: "orange",
        juiceTa: "ஆரஞ்சு ஜூஸ்",
        juiceEn: "Orange Juice",
        ingredientsTa: "ஆரஞ்சு",
        ingredientsEn: "Orange",
        price: 80,
        emoji: "🍊",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "pineapple",
        juiceTa: "அன்னாசி ஜூஸ்",
        juiceEn: "Pineapple Juice",
        ingredientsTa: "அன்னாசி",
        ingredientsEn: "Pineapple",
        price: 80,
        emoji: "🍍",
        image: "/images/special/fresh-pineapple.jpg"
      },
      {
        id: "coconut-water-small",
        juiceTa: "இயற்கை இளநீர் (சிறியது)",
        juiceEn: "Coconut Water (Small)",
        ingredientsTa: "இயற்கை இளநீர் (சிறியது)",
        ingredientsEn: "Fresh Tender Coconut Water (Small)",
        price: 60,
        emoji: "🥥",
        image: "/images/fresh/coconut-water.jpg"
      },
      {
        id: "coconut-water-large",
        juiceTa: "இயற்கை இளநீர் (பெரியது)",
        juiceEn: "Coconut Water (Large)",
        ingredientsTa: "இயற்கை இளநீர் (பெரியது)",
        ingredientsEn: "Fresh Tender Coconut Water (Large)",
        price: 100,
        emoji: "🥥",
        image: "/images/fresh/coconut-water.jpg"
      },
      {
        id: "mango",
        juiceTa: "மாம்பழ ஜூஸ்",
        juiceEn: "Mango Juice",
        ingredientsTa: "மாம்பழம்",
        ingredientsEn: "Mango",
        price: 80,
        emoji: "🥭",
        image: "/images/special/fresh-mango.jpg"
      },
      {
        id: "amla",
        juiceTa: "நெல்லிக்காய் ஜூஸ்",
        juiceEn: "Amla Juice",
        ingredientsTa: "100% தூய நெல்லிக்காய் சாறு",
        ingredientsEn: "100% Pure Amla Extract",
        price: 50,
        emoji: "🌿",
        image: "/images/special/pure-amla.jpg"
      },
      {
        id: "sathukudi",
        juiceTa: "சாத்துக்குடி ஜூஸ்",
        juiceEn: "Sathukudi Juice",
        ingredientsTa: "சாத்துக்குடி",
        ingredientsEn: "Sathukudi / Mosambi",
        price: 80,
        emoji: "🍋",
        image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "morning-wellness-pack",
    ta: "7-நாள் காலை நல்வாழ்வு திட்டம்",
    en: "7-Day Morning Wellness Pack",
    price: 550,
    old: 650,
    priceRangeTa: "₹550 (7 பாட்டில்கள்)",
    priceRangeEn: "₹550 (7 Bottles)",
    isRoutinePackage: true,
    icon: "🌅",
    color: "green",
    listTa: "1. எலுமிச்சை+உப்பு · 2. சுரைக்காய்+மிளகு+சீரகம்+உப்பு · 3. ABC (நெல்லி+கேரட்+பீட்ரூட்) · 4. கொத்தமல்லி+கறிவேப்பிலை+புதினா+தேன் · 5. மஞ்சள்+இலவங்கம்+தேன் · 6. காய்கறி ஜூஸ் (கேரட்/பீட்ரூட்/வெள்ளரி) · 7. கற்றாழை+இஞ்சி+தேங்காய்ப்பால்",
    listEn: "1. Lemon+Salt · 2. Bottle Gourd+Pepper+Cumin+Salt · 3. ABC (Amla+Carrot+Beetroot) · 4. Coriander+Curry+Mint+Honey · 5. Turmeric+Cinnamon+Honey · 6. Veg Juice (Carrot/Beetroot/Cucumber) · 7. Aloe Vera+Ginger+Coconut Milk",
    image: "/images/special/abc-amla-carrot-beetroot.jpg",
    juices: [
      {
        id: "mw-lem-slt",
        juiceTa: "நாள் 1: எலுமிச்சை ஜூஸ்",
        juiceEn: "Day 1: Lemon Juice",
        ingredientsTa: "எலுமிச்சை + உப்பு",
        ingredientsEn: "Lemon + Salt",
        price: 40,
        emoji: "🍋",
        image: "/images/special/lemon-salt.jpg"
      },
      {
        id: "mw-bot-grd",
        juiceTa: "நாள் 2: சுரைக்காய் ஜூஸ்",
        juiceEn: "Day 2: Bottle Gourd Juice",
        ingredientsTa: "சுரைக்காய் + மிளகு + சீரகம் + உப்பு",
        ingredientsEn: "Bottle Gourd + Pepper + Cumin + Salt",
        price: 45,
        emoji: "🥒",
        image: "/images/special/bottle-gourd.jpg"
      },
      {
        id: "mw-abc-detox",
        juiceTa: "நாள் 3: ABC ஜூஸ்",
        juiceEn: "Day 3: ABC Juice (Amla + Carrot + Beetroot)",
        ingredientsTa: "நெல்லிக்காய் + கேரட் + பீட்ரூட்",
        ingredientsEn: "Amla + Carrot + Beetroot",
        price: 65,
        emoji: "🍎",
        image: "/images/special/abc-amla-carrot-beetroot.jpg"
      },
      {
        id: "mw-cor-jce",
        juiceTa: "நாள் 4: கொத்தமல்லி ஜூஸ்",
        juiceEn: "Day 4: Coriander Detox Juice",
        ingredientsTa: "கறிவேப்பிலை + கொத்தமல்லி தழை + புதினா + மிளகு + உப்பு + தேன்",
        ingredientsEn: "Curry Leaves + Coriander Leaves + Mint + Pepper + Salt + Honey",
        price: 50,
        emoji: "🌿",
        image: "/images/special/coriander-detox.jpg"
      },
      {
        id: "mw-tur-cin-jce",
        juiceTa: "நாள் 5: மஞ்சள் இலவங்கப்பட்டை ஜூஸ்",
        juiceEn: "Day 5: Turmeric Cinnamon Sticks Juice",
        ingredientsTa: "இலவங்கப்பட்டை + மஞ்சள் தூள் + சீரகம் + எலுமிச்சை + தேன்",
        ingredientsEn: "Cinnamon Sticks + Turmeric Powder + Cumin + Lemon + Honey",
        price: 55,
        emoji: "🪵",
        image: "/images/special/turmeric-cinnamon.jpg"
      },
      {
        id: "mw-veg-trio",
        juiceTa: "நாள் 6: புதிய காய்கறி ஜூஸ்",
        juiceEn: "Day 6: Fresh Vegetable Juice",
        ingredientsTa: "தேர்வு செய்த காய்கறி (கேரட் / பீட்ரூட் / வெள்ளரி) + எலுமிச்சை + புதினா + இந்துப்பு",
        ingredientsEn: "Choice of Vegetable (Carrot / Beetroot / Cucumber) + Lemon + Mint + Pink Salt",
        price: 50,
        emoji: "🥕",
        image: "/images/special/vegetable-juice-trio.jpg",
        isVegTrio: true
      },
      {
        id: "mw-alo-jce",
        juiceTa: "நாள் 7: கற்றாழை ஜூஸ்",
        juiceEn: "Day 7: Aloe Vera Wellness Juice",
        ingredientsTa: "கற்றாழை + பெருங்காயம் + இஞ்சி + கறிவேப்பிலை + தேங்காய்ப்பால்",
        ingredientsEn: "Aloe Vera + Asafoetida + Ginger + Curry Leaves + Coconut Milk",
        price: 55,
        emoji: "🌵",
        image: "/images/special/aloevera-wellness.jpg"
      }
    ]
  },
];

const healthPillars = [
  { id: "sugar", ta: "சர்க்கரை நோய் தடுப்பு", en: "Diabetes Prevention", icon: "💧", subTa: "இயற்கை மருத்துவ திட்டம்", subEn: "Blood Sugar Balance" },
  { id: "thyroid", ta: "தைராய்டு நோய் தடுப்பு", en: "Thyroid Prevention", icon: "🦋", subTa: "அயோடின் & செலினியம்", subEn: "Hormone Harmony" },
  { id: "weight-loss", ta: "உடல் எடை குறைப்பு திட்டம்", en: "Weight Loss Package", icon: "🏃", subTa: "மெட்டபாலிசம் & கொழுப்பு எரிப்பு", subEn: "Fat Burn & Detox" },
  { id: "fitness", ta: "நட்ஸ் & எனர்ஜி பிட்னஸ்", en: "Nuts & Energy Fitness", icon: "⚡", subTa: "இயற்கை தாவர புரோட்டீன்", subEn: "Plant Protein & Nuts" },
  { id: "fresh-juices", ta: "புதிய பழச்சாறுகள்", en: "Fresh Juices", icon: "🍉", subTa: "100% தூய இயற்கை சாறு", subEn: "100% Pure & Fresh" },
  { id: "morning", ta: "7 நாள் காலை நல்வாழ்வு திட்டம்", en: "7 Days Morning Wellness Pack", icon: "🌅", subTa: "அதிகாலை 5:30 தயாரிப்பு", subEn: "Dawn Pressed Fresh" },
  { id: "custom-box", ta: "உங்களுக்குத் தேவையான பழச்சாறு வேண்டுமெனில் வாட்ஸ்அப்பை காண்டாக்ட் செய்யவும்", en: "If you need specific juices, kindly contact WhatsApp", icon: "💬", subTa: "வாட்ஸ்அப் நேரடி தொடர்பு", subEn: "WhatsApp Direct" },
];

export function App() {
  const [lang, setLang] = useState<string>("ta");
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("palani-cart") || "[]");
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [showBillPreview, setShowBillPreview] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderFormData | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [selectedVegOption, setSelectedVegOption] = useState<"carrot" | "beetroot" | "cucumber">("carrot");

  // Parallax state on mouse movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem("palani-cart", JSON.stringify(cart));
  }, [cart]);

  // Parallax listener on Hero
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 35;
    const y = (clientY - innerHeight / 2) / 35;
    setMousePos({ x, y });
  };

  const count = cart.reduce((s, x) => s + x.qty, 0);
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const hasRoutine = cart.some((x) => x.type === "routine");
  const delivery = !subtotal || hasRoutine || subtotal >= 150 ? 0 : 20;

  const add = (
    item: { id: string; ta: string; en: string; price: number; emoji?: string; image?: string; benefit?: string },
    type = "juice"
  ) => {
    setCart((c) => {
      const found = c.find((x) => x.id === item.id);
      return found
        ? c.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x))
        : [...c, { ...item, type, qty: 1 }];
    });
  };

  const change = (id: string, delta: number) => {
    setCart((c) =>
      c
        .map((x) => (x.id === id ? { ...x, qty: x.qty + delta } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const remove = (id: string) => {
    setCart((c) => c.filter((x) => x.id !== id));
  };

  const copy = lang === "ta";
  const label = (ta: string, en: string) => (copy ? ta : en);

  const handleOpenPackage = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPackages = () => {
    setSelectedPackage(null);
    setTimeout(() => {
      const el = document.getElementById("packages");
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handlePillarClick = (pillarId: string) => {
    if (pillarId === "sugar") {
      const p = packages.find((x) => x.id === "diabetes-prevention");
      if (p) { handleOpenPackage(p); return; }
    } else if (pillarId === "thyroid") {
      const p = packages.find((x) => x.id === "thyroid-prevention");
      if (p) { handleOpenPackage(p); return; }
    } else if (pillarId === "fitness") {
      const p = packages.find((x) => x.id === "nuts-energy-fitness");
      if (p) { handleOpenPackage(p); return; }
    } else if (pillarId === "weight-loss") {
      const p = packages.find((x) => x.id === "weight-loss");
      if (p) { handleOpenPackage(p); return; }
    } else if (pillarId === "morning") {
      const p = packages.find((x) => x.id === "morning-wellness-pack");
      if (p) { handleOpenPackage(p); return; }
    } else if (pillarId === "fresh-juices" || pillarId === "holistic" || pillarId === "immunity") {
      const p = packages.find((x) => x.id === "fresh-juices");
      if (p) { handleOpenPackage(p); return; }
    } else if (pillarId === "custom-box") {
      const msg = copy
        ? "வணக்கம் ஸ்ரீ பழனி ஆண்டவர் உயிர்ச்சாறு! எனக்கு தேவையான பழச்சாறுகளை ஆர்டர் செய்ய / விவரங்கள் அறிய விரும்புகிறேன்."
        : "Hello Sri Palani Andavar Uyir Saaru! I would like to enquire about and order my choice of fresh juices.";
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      return;
    }
    setSelectedPackage(null);
    setTimeout(() => {
      const el = document.getElementById("packages");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Professional WhatsApp Bill Receipt Formatter (Dynamic Date Label & Sugar Preference)
  const formatWhatsAppBill = (form: OrderFormData) => {
    const billNo = `SPA-${Date.now().toString().slice(-5)}`;
    const today = new Date().toLocaleDateString('en-GB');

    const itemRows = cart
      .map(
        (x, idx) =>
          `${idx + 1}. ${label(x.ta, x.en)} (${label("300 மி.லி", "300ml")})\n   ${label("எண்ணிக்கை (Qty):", "Qty:")} ${x.qty} x ₹${x.price} = ₹${x.price * x.qty}`
      )
      .join("\n");

    const dateHeader = hasRoutine
      ? (copy ? `🚚 தொடக்க தேதி: ${form.date}` : `🚚 Start Date: ${form.date}`)
      : (copy ? `🚚 டெலிவரி தேதி: ${form.date}` : `🚚 Delivery Date: ${form.date}`);

    const sugarLine = copy
      ? (form.sugarOption === "sugar-needed" ? "🍬 சர்க்கரை விருப்பம்: சர்க்கரை தேவை (With Sugar)" : "🍃 சர்க்கரை விருப்பம்: சர்க்கரை தேவையில்லை (இயற்கை சுவை)")
      : (form.sugarOption === "sugar-needed" ? "🍬 Sugar Option: Sugar Needed (With Sugar)" : "🍃 Sugar Option: No Added Sugar (Pure Natural)");

    const iceLine = copy
      ? (form.iceOption === "ice-needed" ? "❄️ ஐஸ் விருப்பம்: ஐஸ் தேவை (With Ice)" : "🧊 ஐஸ் விருப்பம்: ஐஸ் தேவையில்லை (No Ice)")
      : (form.iceOption === "ice-needed" ? "❄️ Ice Option: Ice Needed (With Ice)" : "🧊 Ice Option: No Ice (Natural Room Temp)");

    if (copy) {
      return `🧾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🧾
   🌴 *ஸ்ரீ பழனி ஆண்டவர் உயிர்ச்சாறு* 🌴
   _"உடலுக்கு புத்துணர்ச்சி வாழ்வுக்கு ஆரோக்கியம்!"_
   பழைய பேருந்து நிலையம், கோவில்பட்டி
   📱 வாட்ஸ்அப் / போன்: +91 9342969285
🧾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🧾

📋 *அதிகாரப்பூர்வ ஆர்டர் ரசீது*
🆔 ரசீது எண்: #${billNo}
📅 பில் தேதி: ${today}
⏰ டெலிவரி நேரம்: ${form.slot}
${dateHeader}
${sugarLine}
${iceLine}

👤 *வாடிக்கையாளர் விவரங்கள்*
• பெயர்: ${form.name}
• தொலைபேசி: ${form.phone}
• டெலிவரி முகவரி: ${form.address}

🛒 *பொருட்கள் விவரம் (300 மி.லி)*
───────────────────────────────
${itemRows}
───────────────────────────────
💵 பொருட்கள் மொத்தம்: ₹${subtotal}
🚚 டெலிவரி கட்டணம்: ${delivery ? `₹${delivery}` : "இலவசம் (FREE)"}
✨ *செலுத்த வேண்டிய மொத்த தொகை: ₹${subtotal + delivery}*
───────────────────────────────
💳 செலுத்தும் முறை: நேரடி பணம் (Cash on Delivery)
🛡️ 100% தூய இயற்கை சாறு (100% Pure Natural)
🙏 மிக்க நன்றி! உங்கள் நல்வாழ்வே எங்கள் அர்ப்பணிப்பு!
🧾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🧾`;
    }

    return `🧾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🧾
   🌴 *SRI PALANI ANDAVAR UYIR SAARU* 🌴
   _"Vitality for the Body, Wellness for Life!"_
   Old Bus Stand, Kovilpatti
   📱 WhatsApp / Phone: +91 9342969285
🧾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🧾

📋 *OFFICIAL ORDER INVOICE*
🆔 Bill No: #${billNo}
📅 Date: ${today}
⏰ Delivery Slot: ${form.slot}
${dateHeader}
${sugarLine}
${iceLine}

👤 *CUSTOMER DETAILS*
• Name: ${form.name}
• Phone: ${form.phone}
• Delivery Address: ${form.address}

🛒 *ORDERED ITEMS (300 ml each)*
───────────────────────────────
${itemRows}
───────────────────────────────
💵 Subtotal: ₹${subtotal}
🚚 Delivery Fee: ${delivery ? `₹${delivery}` : "FREE"}
✨ *GRAND TOTAL BILL: ₹${subtotal + delivery}*
───────────────────────────────
💳 Payment Mode: 100% Cash on Delivery
🛡️ 100% Pure Cold-Pressed Juice
🙏 Thank you! Your wellness is our devotion!
🧾━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🧾`;
  };

  const isOrdersClosed = (): boolean => {
    const hours = new Date().getHours();
    return hours >= 22; // 22:00 (10 PM) to 23:59 (11:59 PM) -> Closed. 12:00 AM midnight onwards -> Open.
  };

  const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isOrdersClosed()) {
      alert(
        copy
          ? "மன்னிக்கவும்! இரவு 10:00 மணிக்குப் பிறகு புதிய ஆர்டர்கள் தற்காலிகமாக மூடப்பட்டுள்ளது. நள்ளிரவு 12:00 AM மணிக்கு மீண்டும் திறக்கப்படும்."
          : "Sorry! Orders are closed after 10:00 PM. Bookings will reopen at 12:00 AM midnight."
      );
      return;
    }
    const formData = new FormData(e.currentTarget);
    const form = Object.fromEntries(formData.entries()) as unknown as OrderFormData;
    setConfirmedOrder(form);
    setShowOrder(false);
    setShowBillPreview(true);
  };

  const sendBillToWhatsApp = () => {
    if (!confirmedOrder) return;
    const text = formatWhatsAppBill(confirmedOrder);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setShowBillPreview(false);
  };

  return (
    <div className="site-shell">
      {/* 1. Announcement Top Bar with Slogan */}
      <div className="announcement">
        <span>{label("✦ இயற்கையின் சுவையில் வாழ்வின் நலம்!", "✦ In Nature's Taste Lies Life's Wellness!")}</span>
        <b>{label("ஸ்ரீ பழனி ஆண்டவர் உயிர்ச்சாறு", "Sri Palani Andavar Uyir Saaru")}</b>
        <span>{label("அனைத்து ஜூஸ்களும் 300 மி.லி · இலவச டெலிவரி ₹150 மேல்", "All Juices 300 ml · Free Delivery on ₹150+")}</span>
      </div>

      {/* 2. Sticky Header with Official Logo */}
      <header className="nav">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            if (selectedPackage) {
              e.preventDefault();
              setSelectedPackage(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          data-testid="brand-home-link"
        >
          <img src={images.logo} alt="Sri Palani Andavar Uyir Saaru" className="brand-logo-img" />
          <span>
            <strong className={!copy ? "en-brand" : ""}>{label("ஸ்ரீ பழனி ஆண்டவர்", "Sri Palani Andavar")}</strong>
            <small>{label("உயிர்ச்சாறு · கோவில்பட்டி (300 மி.லி)", "Uyir Saaru · Kovilpatti (300 ml)")}</small>
            <span className="brand-fssai">{label("FSSAI எண்: 12426029000159", "FSSAI Lic. No: 12426029000159")}</span>
          </span>
        </a>

        <nav>
          <a
            href="#pillars"
            onClick={(e) => {
              if (selectedPackage) {
                e.preventDefault();
                setSelectedPackage(null);
                setTimeout(() => {
                  const el = document.getElementById("pillars");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }
            }}
            data-testid="pillars-nav-link"
          >
            {label("நன்மைகள்", "Benefits")}
          </a>
          <a
            href="#packages"
            onClick={(e) => {
              if (selectedPackage) {
                e.preventDefault();
                setSelectedPackage(null);
                setTimeout(() => {
                  const el = document.getElementById("packages");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }
            }}
            data-testid="packages-nav-link"
          >
            {label("திட்டங்கள்", "Packages")}
          </a>
          <a
            href="#packages"
            onClick={(e) => {
              e.preventDefault();
              const freshPkg = packages.find((p) => p.id === "fresh-juices");
              if (freshPkg) {
                handleOpenPackage(freshPkg);
              } else {
                setSelectedPackage(null);
                setTimeout(() => {
                  const el = document.getElementById("packages");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }
            }}
            data-testid="fresh-juices-nav-link"
          >
            {label("பழச்சாறுகள்", "Fresh Juices")}
          </a>
          <a
            href="#delivery"
            onClick={(e) => {
              if (selectedPackage) {
                e.preventDefault();
                setSelectedPackage(null);
                setTimeout(() => {
                  const el = document.getElementById("delivery");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }
            }}
            data-testid="delivery-nav-link"
          >
            {label("டெலிவரி", "Delivery")}
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="lang-switch"
            onClick={() => setLang(copy ? "en" : "ta")}
            data-testid="language-toggle"
            aria-label="Toggle language"
          >
            {copy ? "English" : "தமிழ்"}
          </button>

          <button
            className="cart-button"
            onClick={() => setShowCart(true)}
            data-testid="cart-open-button"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            <span>{label("கூடை", "Cart")}</span>
            {count > 0 && <b data-testid="cart-item-count">{count}</b>}
          </button>
        </div>
      </header>

      {/* 3. Main Content Area */}
      {selectedPackage ? (
        /* DEDICATED FULL-PAGE PACKAGE VIEW */
        <main className="package-page-view" id="package-top">
          {/* Breadcrumb Bar */}
          <div className="pkg-breadcrumb-bar">
            <button
              type="button"
              className="pkg-back-btn"
              onClick={handleBackToPackages}
              data-testid="pkg-back-to-home-btn"
            >
              <ArrowLeft size={16} /> {label("அனைத்து திட்டங்கள்", "All Packages")}
            </button>
            <div className="pkg-breadcrumb-trail">
              <span onClick={handleBackToPackages} style={{ cursor: "pointer" }}>{label("முகப்பு", "Home")}</span>
              <span>/</span>
              <span onClick={handleBackToPackages} style={{ cursor: "pointer" }}>{label("திட்டங்கள்", "Packages")}</span>
              <span>/</span>
              <span className="active">{label(selectedPackage.ta, selectedPackage.en)}</span>
            </div>
          </div>

          {/* Hero Section (Clean Header with Dawn Badge & Title) */}
          <section className="pkg-hero-section">
            <div className={`pkg-hero-layout ${!selectedPackage.isRoutinePackage ? "full-width" : ""}`}>
              <div className="pkg-hero-info">
                <div className="pkg-badge-pill">
                  <Leaf size={14} /> {label("அதிகாலை 5:30 தயாரிப்பு · 300 மி.லி பாட்டில்கள்", "Dawn Pressed 5:30 AM in 300 ml Sealed Bottles")}
                </div>

                <h1 className={`pkg-hero-title ${!copy ? "en-title" : ""}`}>
                  {label(selectedPackage.ta, selectedPackage.en)}
                </h1>
                {!copy && <p className="pkg-hero-en-sub">{selectedPackage.en}</p>}
              </div>

              {/* Order Bundle Card (ONLY for 7-Day Morning Wellness Routine) */}
              {selectedPackage.isRoutinePackage && (
                <div className="pkg-order-card">
                  <span className="pkg-order-card-tag">
                    ⭐ {label("முழு வார தொகுப்பு (7 பாட்டில்கள் · 300 மி.லி)", "COMPLETE 7-BOTTLE ROUTINE BOX (300 ml)")}
                  </span>

                  <div className="pkg-order-price-row">
                    <b>₹{selectedPackage.price}</b>
                    <del>₹{selectedPackage.old}</del>
                    <span className="pkg-order-save-badge">
                      {label("சேமிப்பு", "Save")} {Math.round((1 - selectedPackage.price / selectedPackage.old) * 100)}%
                    </span>
                  </div>

                  <div className="pkg-health-benefit-callout">
                    <span className="pkg-health-benefit-icon">🌿</span>
                    <p className="pkg-health-benefit-text">
                      {label(
                        "தினமும் காலை 9:00 AM-க்கு முன் இந்த 7 ஜூஸ்களை 7 வாரங்கள் குடித்து வந்தால், அசிடிட்டி மற்றும் உடல் எடை குறையும். மேலும் ரத்த அழுத்தம் மற்றும் கொலஸ்ட்ரால் சீராகி அதிகபட்ச ஆரோக்கிய நன்மைகள் கிடைக்கும்.",
                        "If you drink these 7 juices every morning before 9:00 AM for 7 weeks, acidity and body weight will be reduced, and blood pressure and cholesterol will be maintained at balanced levels with maximum health benefits."
                      )}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="pkg-order-main-btn"
                    onClick={() => {
                      const vegLabelTa = selectedVegOption === "carrot" ? "கேரட்" : selectedVegOption === "beetroot" ? "பீட்ரூட்" : "வெள்ளரி";
                      const vegLabelEn = selectedVegOption === "carrot" ? "Carrot" : selectedVegOption === "beetroot" ? "Beetroot" : "Cucumber";
                      add(
                        {
                          id: `${selectedPackage.id}-${selectedVegOption}`,
                          ta: `${selectedPackage.ta} (7 பாட்டில்கள் · நாள் 6: ${vegLabelTa})`,
                          en: `${selectedPackage.en} (7 Bottles · Day 6: ${vegLabelEn})`,
                          benefit: `7 bottles · 300 ml each · Day 6: ${vegLabelEn}`,
                          price: selectedPackage.price,
                          emoji: selectedPackage.icon,
                          image: selectedPackage.image
                        },
                        "routine"
                      );
                      setShowCart(true);
                    }}
                    data-testid="pkg-add-full-box-btn"
                  >
                    <ShoppingBag size={18} /> {label("முழு 7 பாட்டில்கள் தொகுப்பை ஆர்டர் செய்க", "Order Complete Routine Box")}
                  </button>

                  <small className="cod-note" style={{ margin: 0 }}>
                    🔒 {label("நேரடி பணப்பரிவர்த்தனை (100% Cash on Delivery)", "100% Cash on Delivery at your doorstep")}
                  </small>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Detailed Juices Breakdown */}
          <section className="pkg-juices-container">
            <div className="pkg-section-title-wrap">
              <div className="eyebrow orange">{label("ஒவ்வொரு பாட்டிலும் 300 மி.லி தூய சாறு", "EACH BOTTLE 300 ML PURE EXTRACT")}</div>
              <h2 className={!copy ? "en-title" : ""}>
                {label("தொகுப்பில் உள்ள பழச்சாறுகள்", "Included Cold-Pressed Juices")}
              </h2>
              <p>
                {label(
                  "தினமும் அதிகாலை 5:30 மணிக்கு அப்போதே புதியதாக தயார் செய்யப்பட்டு, 300 மி.லி சுகாதாரமான பாட்டில்களில் அடைக்கப்பட்டு உங்கள் வாசல் தேடி சரியான நேரத்தில் டெலிவரி செய்யப்படுகிறது.",
                  "Freshly crafted every dawn at 5:30 AM with pure ingredients, hygienically sealed in 300 ml bottles, and punctually delivered fresh to your doorstep."
                )}
              </p>
            </div>

            <div className="pkg-juices-list">
              {selectedPackage.juices.map((item, idx) => (
                <div key={item.id} className="pkg-juice-detail-card" data-testid={`pkg-juice-card-${item.id}`}>
                  {/* Image with tags */}
                  <div className="pkg-juice-img-box">
                    <img src={item.image} alt={item.juiceEn} loading="lazy" />
                    <span className="pkg-juice-vol-tag">300 ml</span>
                    <span className="pkg-juice-emoji-tag">{item.emoji}</span>
                  </div>

                  {/* Detailed Info */}
                  <div className="pkg-juice-info-box">
                    <div className="pkg-juice-header-row">
                      <span className="pkg-juice-num-badge">#{idx + 1}</span>
                      <h3 className={`pkg-juice-name ${!copy ? "en-name" : ""}`}>
                        {label(item.juiceTa, item.juiceEn)}
                      </h3>
                      <span className="pkg-juice-pure-pill">
                        ✨ {label("300 மி.லி தூய சாறு", "300 ml Pure")}
                      </span>
                    </div>
                    {!copy && <span className="pkg-juice-en-title">{item.juiceEn}</span>}

                    {/* Included Components & Ingredients Box (High Visibility) */}
                    <div className="pkg-component-box">
                      <div className="pkg-comp-label">
                        🌱 {label("உள்ளடங்கிய பொருட்கள்:", "Included Items & Ingredients:")}
                      </div>
                      <div className="pkg-comp-val">
                        {label(item.ingredientsTa, item.ingredientsEn)}
                      </div>
                    </div>

                    {/* Variant selector for Day 6 Vegetable Juice */}
                    {item.isVegTrio && (
                      <div className="veg-variant-selector">
                        <div className="veg-variant-label">
                          🥗 {label("உங்கள் காய்கறி தேர்வை தேர்வு செய்க:", "Select Your Vegetable Choice:")}
                        </div>
                        <div className="veg-variant-chips">
                          <button
                            type="button"
                            className={`veg-chip ${selectedVegOption === "carrot" ? "active" : ""}`}
                            onClick={() => setSelectedVegOption("carrot")}
                          >
                            🥕 {label("கேரட்", "Carrot")}
                          </button>
                          <button
                            type="button"
                            className={`veg-chip ${selectedVegOption === "beetroot" ? "active" : ""}`}
                            onClick={() => setSelectedVegOption("beetroot")}
                          >
                            🍠 {label("பீட்ரூட்", "Beetroot")}
                          </button>
                          <button
                            type="button"
                            className={`veg-chip ${selectedVegOption === "cucumber" ? "active" : ""}`}
                            onClick={() => setSelectedVegOption("cucumber")}
                          >
                            🥒 {label("வெள்ளரி", "Cucumber")}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Bar: Buy separately for individual packages, routine schedule tag for 7-day pack */}
                    {!selectedPackage.isRoutinePackage ? (
                      <div className="pkg-juice-buy-bar">
                        <div className="pkg-juice-price-info">
                          <b>₹{item.price}</b>
                          <small>{label("/ 300 மி.லி பாட்டில்", "/ 300 ml bottle")}</small>
                        </div>
                        <button
                          type="button"
                          className="pkg-juice-buy-btn"
                          onClick={() => {
                            add(
                              {
                                id: item.id,
                                ta: item.juiceTa,
                                en: item.juiceEn,
                                price: item.price,
                                emoji: item.emoji,
                                image: item.image,
                                benefit: label("300 மி.லி தூய சாறு", "300 ml Pure Juice")
                              },
                              "juice"
                            );
                            setShowCart(true);
                          }}
                          data-testid={`pkg-add-juice-btn-${item.id}`}
                        >
                          <Plus size={16} /> {label("கூடையில் சேர்க்க", "Add to Basket")}
                        </button>
                      </div>
                    ) : (
                      <div className="pkg-juice-routine-badge-bar">
                        <span className="pkg-juice-routine-tag">
                          🌅 {label("7-நாள் காலை நல்வாழ்வு தொகுப்பில் அடங்கும்", "Included in 7-Day Morning Wellness Pack")}
                        </span>
                        <small style={{ color: "var(--muted)", fontWeight: 700 }}>
                          {item.isVegTrio
                            ? label(`தேர்வு: ${selectedVegOption === "carrot" ? "கேரட்" : selectedVegOption === "beetroot" ? "பீட்ரூட்" : "வெள்ளரி"}`, `Choice: ${selectedVegOption === "carrot" ? "Carrot" : selectedVegOption === "beetroot" ? "Beetroot" : "Cucumber"}`)
                            : label("300 மி.லி அதிகாலை பிரெஷ்", "300 ml Dawn-Pressed")}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Switcher to Other Health Packages */}
            <div className="pkg-other-packages-section">
              <div className="eyebrow orange">{label("மற்ற திட்டங்கள்", "EXPLORE OTHER PACKAGES")}</div>
              <h3>{label("பிற ஆரோக்கிய திட்டங்களை பார்க்க", "Browse Our Other Health Protocols")}</h3>
              <div className="pkg-other-grid">
                {packages
                  .filter((p) => p.id !== selectedPackage.id)
                  .map((other) => (
                    <div
                      key={other.id}
                      className="pkg-other-card"
                      onClick={() => handleOpenPackage(other)}
                      data-testid={`pkg-switch-${other.id}`}
                    >
                      <span style={{ fontSize: "28px" }}>{other.icon}</span>
                      <strong>{label(other.ta, other.en)}</strong>
                      <small>{label(other.listTa, other.listEn)}</small>
                      <b>
                        {other.isRoutinePackage
                          ? `₹${other.price} / ${label("7 பாட்டில்கள்", "7 bottles")}`
                          : `${label(other.priceRangeTa || `₹${other.price}`, other.priceRangeEn || `₹${other.price}`)} / ${label("பாட்டில்", "bottle")}`}
                      </b>
                      <span style={{ font: "700 12px Mukta Malar", color: "var(--green)" }}>{label("விவரங்கள் பார்க்க →", "View Details →")}</span>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* HOMEPAGE MAIN VIEW */
        <main id="top">
          {/* Hero Section with Interactive Parallax */}
          <div className="hero-wrapper" onMouseMove={handleMouseMove}>
            {/* Floating Parallax Botanical Particles */}
            <div
              className="parallax-bg-accent floating-fruit"
              style={{
                top: '12%',
                left: '6%',
                transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px)`
              }}
            >
              🍊
            </div>
            <div
              className="parallax-bg-accent floating-fruit"
              style={{
                top: '20%',
                right: '10%',
                transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`
              }}
            >
              🌿
            </div>
            <div
              className="parallax-bg-accent floating-fruit"
              style={{
                bottom: '16%',
                left: '38%',
                transform: `translate(${mousePos.x * -0.9}px, ${mousePos.y * -0.9}px)`
              }}
            >
              🍉
            </div>
            <div
              className="parallax-bg-accent floating-fruit"
              style={{
                bottom: '10%',
                right: '6%',
                transform: `translate(${mousePos.x * 1.8}px, ${mousePos.y * 1.8}px)`
              }}
            >
              ❤️
            </div>

            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <Leaf size={15} /> {label("அதிகாலை தயாரிப்பு · 300 மி.லி பாட்டில்கள்", "dawn-made · 300 ml pure bottles")}
                </div>

                <h1 className={copy ? "tamil-headline" : "en-headline"}>
                  {copy ? (
                    <>
                      உடலுக்கு புத்துணர்ச்சி...
                      <em>வாழ்வுக்கு ஆரோக்கியம்!</em>
                    </>
                  ) : (
                    <>
                      Vitality for the Body...
                      <em>Wellness for Life!</em>
                    </>
                  )}
                </h1>


                <p className={`hero-ta ${!copy ? "en-ta" : ""}`}>
                  {label(
                    "ஸ்ரீ பழனி ஆண்டவர் உயிர்ச்சாறு — தினமும் அதிகாலை தயாரிக்கும் 100% தூய பழச்சாறு உங்கள் வீட்டு வாசலுக்கே.",
                    "Sri Palani Andavar Uyir Saaru — 100% pure cold-pressed 300 ml juices delivered fresh to your door across Kovilpatti."
                  )}
                </p>

                {/* Signature Brand Slogan Badge */}
                <div className="brand-motto-badge">
                  <Sparkles size={15} /> {label("“இயற்கையின் சுவையில் வாழ்வின் நலம்!”", "“In Nature's Taste Lies Life's Wellness!”")}
                </div>

                <div className="hero-ctas">
                  <a
                    className="primary-cta"
                    href="#packages"
                    data-testid="explore-packages-button"
                  >
                    {label("திட்டங்களைப் பார்க்க", "Explore Health Packages")} <ArrowRight size={18} />
                  </a>

                  <button
                    type="button"
                    className="text-cta"
                    onClick={() => {
                      const freshPkg = packages.find((p) => p.id === "fresh-juices");
                      if (freshPkg) handleOpenPackage(freshPkg);
                    }}
                    data-testid="browse-fresh-juices-button"
                  >
                    {label("பழச்சாறுகள்", "Explore Fresh Juices")}
                  </button>
                </div>

                <div className="hero-trust">
                  <span>
                    <Check size={16} /> {label("அனைத்தும் 300 மி.லி பாட்டில்கள்", "All 300 ml bottles")}
                  </span>
                  <span>
                    <Check size={16} /> {label("100% தூய பழச்சாறு", "100% Pure Natural")}
                  </span>
                  <span>
                    <Check size={16} /> {label("நேரடி பணப்பரிவர்த்தனை (COD)", "COD on delivery")}
                  </span>
                </div>
              </div>

              <div
                className="hero-image"
                style={{
                  transform: `rotate(2deg) translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`
                }}
              >
                <img src={images.hero} alt="Fresh juice bottles and tropical fruit" />
                <div
                  className="image-sticker"
                  style={{
                    transform: `rotate(-9deg) translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)`
                  }}
                >
                  <strong>{label("300 மி.லி", "300 ML")}</strong>
                  <span>
                    {label("அதிகாலை தயாரிப்பு", "Pressed fresh")}
                    <br />
                    {label("தினமும் 5:30 AM", "every dawn")}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* 4. Official 6 Health Benefit Pillars */}
          <section className="pillars-section" id="pillars">
            <div className="pillars-grid">
              {healthPillars.map((p) => (
                <div
                  key={p.id}
                  className={`pillar-card ${p.id === "custom-box" ? "custom-box-pillar" : ""}`}
                  onClick={() => handlePillarClick(p.id)}
                  style={{ cursor: "pointer" }}
                  data-testid={`pillar-card-${p.id}`}
                >
                  <span className="pillar-icon">{p.icon}</span>
                  <strong className={!copy ? "en-pillar" : ""}>{label(p.ta, p.en)}</strong>
                  <small>{label(p.subTa, p.subEn)}</small>
                </div>
              ))}
            </div>
          </section>

          {/* HEALTH PACKAGES SECTION */}
          <section className="section" id="packages">
            <div className="section-head">
              <div>
                <div className="eyebrow orange">{label("உங்கள் நலம் காக்கும் பிரத்யேக தொகுப்புகள்", "CURATED HEALTH PACKAGES")}</div>
                <h2 className={copy ? "tamil-headline" : ""}>
                  {copy ? (
                    <>
                      ஆரோக்கிய திட்டங்கள்.
                      <br />
                      <i>முழுமையான இயற்கை நலம்.</i>
                    </>
                  ) : (
                    <>
                      Health Packages.
                      <br />
                      <i>Targeted Preventive Nutrition.</i>
                    </>
                  )}
                </h2>
              </div>
              <p>
                {label(
                  "300 மி.லி தூய இயற்கை பழச்சாறுகளின் பிரத்யேக நோய் தடுப்பு, எனர்ஜி மற்றும் நல்வாழ்வு திட்டங்கள்.",
                  "Specialized 300 ml cold-pressed routines crafted for disease prevention, vitality and morning wellness."
                )}
              </p>
            </div>

            <div className="package-grid">
              {packages.map((p) => (
                <article
                  key={p.id}
                  className={`package-card ${p.color}`}
                  onClick={() => handleOpenPackage(p)}
                  data-testid={`package-card-${p.id}`}
                  style={{ cursor: "pointer" }}
                >
                  <div className="package-top">
                    <span className="package-icon">{p.icon}</span>
                    {p.isRoutinePackage ? (
                      <span className="save">
                        {label("சேமிப்பு", "Save")} {Math.round((1 - p.price / p.old) * 100)}%
                      </span>
                    ) : (
                      <span className="save" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                        {label("300 மி.லி பாட்டில்கள்", "300 ml Bottles")}
                      </span>
                    )}
                  </div>

                  <h3 className={!copy ? "en-h3" : ""}>{label(p.ta, p.en)}</h3>
                  {!copy && <p className="english-name">{p.en}</p>}

                  <div className="package-list">
                    <span>{label("உள்ளடங்கிய பொருட்கள்:", "Included Items & Ingredients:")}</span>
                    <small>{label(p.listTa, p.listEn)}</small>
                  </div>

                  <div className="package-bottom">
                    <div>
                      {p.isRoutinePackage ? (
                        <>
                          <b>₹{p.price}</b>
                          <del>₹{p.old}</del>
                          <small>{label("/ 7 பாட்டில்கள்", "/ 7 bottles")}</small>
                        </>
                      ) : (
                        <>
                          <b style={{ fontSize: "19px" }}>{label(p.priceRangeTa || `₹${p.price}`, p.priceRangeEn || `₹${p.price}`)}</b>
                          <small>{label("/ பாட்டில்", "/ bottle")}</small>
                        </>
                      )}
                    </div>
                    <span className="package-view-cta-btn" data-testid={`view-package-btn-${p.id}`}>
                      {p.isRoutinePackage
                        ? label("திட்டம் பார்க்க →", "View Plan →")
                        : label("சாறுகளைப் பார்க்க →", "View Juices →")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 7. Delivery Windows Section */}
          <section className="delivery-section" id="delivery">
            <div className="delivery-copy">
              <div className="eyebrow">{label("உங்கள் நேரத்திற்கு டெலிவரி", "FRESHNESS, ON YOUR CLOCK")}</div>
              <h2 className={copy ? "tamil-headline" : ""}>
                {copy ? (
                  <>
                    உங்களுக்கு ஏற்ற டெலிவரி
                    <br />
                    <i>நேரத்தை தேர்ந்தெடுங்கள்.</i>
                  </>
                ) : (
                  <>
                    Pick your happy
                    <br />
                    <i>delivery window.</i>
                  </>
                )}
              </h2>
              <p>
                {label(
                  "ஒவ்வொரு ஆர்டரும் 300 மி.லி குளிர்ச்சியான சீல் செய்யப்பட்ட பாட்டிலில் உங்கள் வாசல் சேரும். எப்போதும் நேரடி பணப்பரிவர்த்தனை (COD).",
                  "Every order arrives cold, sealed in 300 ml bottles and ready to enjoy. Always Cash on Delivery."
                )}
              </p>

              <div className="delivery-timing-banner">
                <Clock3 size={18} className="delivery-timing-icon" />
                <div className="delivery-timing-info">
                  <strong>{label("தினசரி ஆர்டர் ஏற்கும் நேரம்", "Daily Order Booking Window")}</strong>
                  <span>
                    {label(
                      "நள்ளிரவு 12:00 AM முதல் இரவு 10:00 PM வரை · இரவு 10:00 PM - 12:00 AM புதிய தயாரிப்புக்காக மூடப்படும்",
                      "12:00 AM Midnight to 10:00 PM Daily · Closed 10:00 PM – 12:00 AM for fresh dawn prep"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="slots">
              <div className="slot-card">
                <Clock3 />
                <b className={!copy ? "en-slot" : ""}>{label("அதிகாலை புத்துணர்ச்சி", "Early Dawn Slot")}</b>
                <span>{label("காலை 6:00 – 7:00", "6:00 AM – 7:00 AM")}</span>
              </div>
              <div className="slot-card">
                <Clock3 />
                <b className={!copy ? "en-slot" : ""}>{label("காலை நடைபயிற்சி", "Morning Walk Slot")}</b>
                <span>{label("காலை 7:00 – 8:00", "7:00 AM – 8:00 AM")}</span>
              </div>
              <div className="slot-card">
                <Clock3 />
                <b className={!copy ? "en-slot" : ""}>{label("காலை உணவு நலம்", "Breakfast Slot")}</b>
                <span>{label("காலை 8:00 – 9:00", "8:00 AM – 9:00 AM")}</span>
              </div>
              <div className="slot-card">
                <Clock3 />
                <b className={!copy ? "en-slot" : ""}>{label("நண்பகல் புத்துணர்ச்சி", "Mid-Day Refresh Slot")}</b>
                <span>{label("நண்பகல் 11:00 – 12:00", "11:00 AM – 12:00 PM")}</span>
              </div>
              <div className="slot-card">
                <Clock3 />
                <b className={!copy ? "en-slot" : ""}>{label("மாலை நலம் & எனர்ஜி", "Evening Vitality Slot")}</b>
                <span>{label("மாலை 4:00 – 6:00", "4:00 PM – 6:00 PM")}</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Site Footer */}
      <footer className="site-footer" id="footer-contact">
        <div className="footer-grid">
          {/* Brand & Slogan */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src={images.logo} alt="Sri Palani Andavar" className="footer-logo-img" />
              <div>
                <strong className="footer-brand-title">{label("ஸ்ரீ பழனி ஆண்டவர் உயிர்ச்சாறு", "Sri Palani Andavar Uyir Saaru")}</strong>
                <div className="footer-motto">{label("“உடலுக்கு புத்துணர்ச்சி வாழ்வுக்கு ஆரோக்கியம்!”", "“Vitality for the Body, Wellness for Life!”")}</div>
                <div className="footer-fssai">{label("FSSAI உரிமம் எண்: 12426029000159", "FSSAI Lic. No: 12426029000159")}</div>
              </div>
            </div>
            <p className="footer-desc">
              {label(
                "தினமும் அதிகாலை 5:30 மணிக்கு அப்போதே புதியதாக பிழிந்த 100% தூய பழச்சாறு. சர்க்கரை இல்லை, தண்ணீர் கலப்படம் இல்லை, செயற்கை நிறங்கள் இல்லை. 300 மி.லி சுகாதாரமான சீல் பாட்டில்களில் நேரடி வாசல் டெலிவரி.",
                "100% pure cold-pressed juice prepared fresh every dawn at 5:30 AM. No added sugar, no added water, zero preservatives. Sealed in 300 ml bottles and delivered fresh to your doorstep."
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>{label("முக்கிய பக்கங்கள்", "Quick Links")}</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPackage(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {label("முகப்பு (Home)", "Home")}
                </a>
              </li>
              <li>
                <a
                  href="#pillars"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPackage(null);
                    setTimeout(() => {
                      const el = document.getElementById("pillars");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                >
                  {label("நன்மைகள் (Benefits)", "Benefits")}
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPackage(null);
                    setTimeout(() => {
                      const el = document.getElementById("packages");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                >
                  {label("ஆரோக்கிய திட்டங்கள்", "Health Packages")}
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  onClick={(e) => {
                    e.preventDefault();
                    const freshPkg = packages.find((p) => p.id === "fresh-juices");
                    if (freshPkg) handleOpenPackage(freshPkg);
                  }}
                >
                  {label("புதிய பழச்சாறுகள்", "Fresh Fruit Juices")}
                </a>
              </li>
              <li>
                <a
                  href="#delivery"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPackage(null);
                    setTimeout(() => {
                      const el = document.getElementById("delivery");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                >
                  {label("டெலிவரி நேரங்கள்", "Delivery Slots")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>{label("தொடர்புக்கு & ஆர்டர்", "Contact & Orders")}</h4>
            <div className="footer-contact-item">
              <span>📍</span>
              <div>
                <b>{label("முகவரி:", "Address:")}</b>
                <div>{label("பழைய பேருந்து நிலையம், கோவில்பட்டி - 628501", "Old Bus Stand, Kovilpatti - 628501")}</div>
              </div>
            </div>
            <div className="footer-contact-item">
              <span>📱</span>
              <div>
                <b>{label("வாட்ஸ்அப் / போன்:", "WhatsApp / Phone:")}</b>
                <div>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                    +91 9342969285
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-contact-item">
              <span>⏰</span>
              <div>
                <b>{label("நேரம்:", "Timings:")}</b>
                <div>{label("தினமும் அதிகாலை 5:30 AM – இரவு 9:00 PM", "Daily 5:30 AM – 9:00 PM")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {label("ஸ்ரீ பழனி ஆண்டவர் உயிர்ச்சாறு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.", "Sri Palani Andavar Uyir Saaru. All rights reserved.")}
          </div>
          <div>
            {label("100% தூய இயற்கை சாறு · 300 மி.லி பாட்டில்கள் · நேரடி பணப்பரிவர்த்தனை (COD)", "100% Pure Cold-Pressed Juice · 300 ml Sealed Bottles · 100% COD")}
          </div>
        </div>
      </footer>

      {/* Floating Sticky Bottom Cart Bar on Mobile */}
      {count > 0 && !showCart && !showOrder && !showBillPreview && (
        <div
          className="mobile-sticky-cart-bar"
          onClick={() => setShowCart(true)}
          data-testid="mobile-sticky-cart-bar"
          role="button"
          tabIndex={0}
          aria-label={label("கூடை பார்க்க / பில் பெற", "View Cart & Bill")}
        >
          <div className="sticky-cart-info">
            <div className="sticky-cart-badge">
              <ShoppingBag size={17} />
              <span>{count}</span>
            </div>
            <div className="sticky-cart-price">
              <b>₹{subtotal + delivery}</b>
              <small>{label(delivery ? "+ ₹20 டெலிவரி" : "இலவச டெலிவரி", delivery ? "+ ₹20 delivery" : "Free delivery")}</small>
            </div>
          </div>
          <div className="sticky-cart-action-btn">
            <span>{label("கூடை & பில்", "View Cart & Bill")}</span>
            <ArrowRight size={15} />
          </div>
        </div>
      )}

      {/* 9. Cart Drawer Modal with Dedicated Remove / Cancel Option */}
      {showCart && (
        <div
          className="overlay"
          onClick={() => setShowCart(false)}
          data-testid="cart-drawer-overlay"
        >
          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
            data-testid="cart-drawer"
          >
            <div className="drawer-head">
              <div>
                <div className="eyebrow orange">{label("உங்கள் கூடை", "YOUR BASKET")}</div>
                <h2>
                  {label("உங்கள் கூடை", "Your Basket")}{" "}
                  <span>({count})</span>
                </h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                data-testid="cart-close-button"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart" data-testid="empty-cart">
                <span>🥭</span>
                <h3>
                  {label("கூடை காலியாக உள்ளது", "Your basket is empty")}
                </h3>
                <p>{label("ஆர்டர் செய்ய புதிய 300 மி.லி ஜூஸை தேர்வு செய்யுங்கள்.", "Pick something fresh (300 ml) to get started.")}</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((x) => (
                    <div key={x.id} className="cart-row">
                      {x.image ? (
                        <img src={x.image} alt={x.en} className="cart-item-img" />
                      ) : (
                        <span style={{ fontSize: "24px" }}>{x.emoji || "🍹"}</span>
                      )}
                      <div>
                        <b className={!copy ? "en-cart-b" : ""}>{label(x.ta, x.en)}</b>
                        <small>₹{x.price} · {label("300 மி.லி", "300 ml")}</small>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="qty">
                        <button
                          onClick={() => change(x.id, -1)}
                          data-testid={`decrease-${x.id}`}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <b data-testid={`qty-${x.id}`}>{x.qty}</b>
                        <button
                          onClick={() => change(x.id, 1)}
                          data-testid={`increase-${x.id}`}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <strong>₹{x.price * x.qty}</strong>

                      {/* Explicit Remove / Delete from Cart Button */}
                      <button
                        className="cart-delete-btn"
                        onClick={() => remove(x.id)}
                        title={label("கூடையிலிருந்து நீக்கு", "Remove item from cart")}
                        aria-label={`Delete ${label(x.ta, x.en)}`}
                        data-testid={`delete-cart-item-${x.id}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>{label("மொத்த விலை", "Subtotal")}</span>
                    <b>₹{subtotal}</b>
                  </div>
                  <div>
                    <span>{label("டெலிவரி கட்டணம்", "Delivery Fee")}</span>
                    <b className="free">
                      {delivery ? `₹${delivery}` : label("இலவசம்", "FREE")}
                    </b>
                  </div>
                  <div className="delivery-radius-tag">
                    <span>📍 {label("சுமார் 4 கி.மீ சுற்றளவில் இலவச டெலிவரி", "Free Delivery within ~4 km radius")}</span>
                  </div>
                  <div className="total">
                    <span>{label("செலுத்த வேண்டிய தொகை", "Total Amount")}</span>
                    <b>₹{subtotal + delivery}</b>
                  </div>

                  {isOrdersClosed() ? (
                    <div className="order-closed-notice" data-testid="order-closed-notice">
                      <div className="order-closed-badge">
                        <span className="order-closed-icon">🌙</span>
                        <div>
                          <strong>{label("இரவு 10:00 PM - 12:00 AM ஆர்டர்கள் மூடப்பட்டுள்ளது", "Orders Closed (10:00 PM – 12:00 AM)")}</strong>
                          <p>
                            {label(
                              "நாளை அதிகாலை 5:30 புதிய பழச்சாறு தயாரிப்புக்காக இரவு 10:00 PM முதல் 12:00 AM வரை ஆர்டர்கள் தற்காலிகமாக மூடப்பட்டுள்ளது. நள்ளிரவு 12:00 AM மணிக்கு மீண்டும் திறக்கப்படும்.",
                              "Orders are closed between 10:00 PM and 12:00 AM to prepare dawn fresh batches. Bookings reopen daily at 12:00 AM midnight."
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        className="checkout-btn order-closed-btn"
                        disabled
                        aria-disabled="true"
                        data-testid="closed-checkout-button"
                      >
                        ⏰ {label("இரவு 10 PM - 12 AM வரை ஆர்டர் பெறப்படாது · நள்ளிரவு 12 AM திறக்கும்", "Closed 10 PM – 12 AM · Reopens at 12:00 AM")}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="checkout-btn"
                      onClick={() => {
                        setShowCart(false);
                        setShowOrder(true);
                      }}
                      data-testid="proceed-checkout-button"
                    >
                      {label("ஆர்டர் தொடர / பில் பெற", "Continue to Order & Bill")}{" "}
                      <ArrowRight size={18} />
                    </button>
                  )}

                  <small className="cod-note">
                    🔒 {label("நேரடி பணப்பரிவர்த்தனை (100% Cash on Delivery)", "100% Cash on Delivery at your doorstep")}
                  </small>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* 10. Order Form Overlay (Dynamic Date Label & Sugar Preference) */}
      {showOrder && (
        <div
          className="overlay order-overlay"
          onClick={() => setShowOrder(false)}
        >
          <form
            className="order-form"
            onSubmit={handleOrderSubmit}
            onClick={(e) => e.stopPropagation()}
            data-testid="order-form"
          >
            <button
              type="button"
              className="form-close"
              onClick={() => setShowOrder(false)}
              data-testid="order-form-close"
              aria-label="Close form"
            >
              <X size={22} />
            </button>

            <div className="eyebrow orange">{label("கடைசி படி", "ALMOST THERE")}</div>
            <h2>{label("ஆர்டர் & பில் விவரங்கள்", "Order & Bill Details")}</h2>
            <p>{label("உங்கள் முகவரி மற்றும் விவரங்களை உள்ளிடவும். உடனடி ரசீது உருவாக்கப்படும்.", "Tell us where to bring your fresh cold-pressed 300 ml bottles.")}</p>

            <label>
              {label("முழு பெயர்", "Full Name")}
              <input
                name="name"
                required
                placeholder={label("உங்கள் முழு பெயர்", "Your full name")}
                data-testid="order-name-input"
              />
            </label>

            <label>
              {label("தொலைபேசி எண்", "Phone Number")}
              <input
                name="phone"
                required
                type="tel"
                placeholder={label("10 இலக்க தொலைபேசி எண்", "10-digit mobile number")}
                data-testid="order-phone-input"
              />
            </label>

            <label>
              {label("டெலிவரி முகவரி", "Delivery Address")}
              <textarea
                name="address"
                required
                placeholder={label("வீட்டு எண், தெரு பெயர், கோவில்பட்டி", "House no, street name, landmark, Kovilpatti")}
                data-testid="order-address-input"
              />
            </label>

            {/* Sugar Confirmation / Preference Option */}
            <div className="sugar-preference-group">
              <label className="sugar-group-label">
                🍃 {label("சர்க்கரை விருப்பம்", "Sugar Preference")}
              </label>
              <div className="sugar-options-grid">
                <label className="sugar-radio-card">
                  <input
                    type="radio"
                    name="sugarOption"
                    value="no-sugar"
                    defaultChecked
                    data-testid="sugar-option-no"
                  />
                  <div className="sugar-card-content">
                    <span className="sugar-icon">🍃</span>
                    <div>
                      <strong>{label("சர்க்கரை தேவையில்லை", "No Added Sugar")}</strong>
                      <small>{label("100% தூய இயற்கை சுவை", "100% Pure Natural Taste")}</small>
                    </div>
                  </div>
                </label>

                <label className="sugar-radio-card">
                  <input
                    type="radio"
                    name="sugarOption"
                    value="sugar-needed"
                    data-testid="sugar-option-yes"
                  />
                  <div className="sugar-card-content">
                    <span className="sugar-icon">🍬</span>
                    <div>
                      <strong>{label("சர்க்கரை தேவை", "Sugar Needed")}</strong>
                      <small>{label("மிதமான இனிப்பு சுவை", "Mild Natural Sweetness")}</small>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Ice Confirmation / Preference Option */}
            <div className="sugar-preference-group ice-preference-group">
              <label className="sugar-group-label" style={{ color: "#0284c7" }}>
                🧊 {label("ஐஸ் விருப்பம்", "Ice Preference")}
              </label>
              <div className="sugar-options-grid">
                <label className="sugar-radio-card">
                  <input
                    type="radio"
                    name="iceOption"
                    value="no-ice"
                    defaultChecked
                    data-testid="ice-option-no"
                  />
                  <div className="sugar-card-content">
                    <span className="sugar-icon">🧊</span>
                    <div>
                      <strong>{label("ஐஸ் தேவையில்லை", "No Ice")}</strong>
                      <small>{label("இயற்கை அறை வெப்பநிலை", "Natural Room Temp")}</small>
                    </div>
                  </div>
                </label>

                <label className="sugar-radio-card">
                  <input
                    type="radio"
                    name="iceOption"
                    value="ice-needed"
                    data-testid="ice-option-yes"
                  />
                  <div className="sugar-card-content">
                    <span className="sugar-icon">❄️</span>
                    <div>
                      <strong>{label("ஐஸ் தேவை", "Ice Needed")}</strong>
                      <small>{label("குளிர்ந்த சுவை", "Chilled Fresh")}</small>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-row">
              <label>
                {label("டெலிவரி நேரம் (5 நேரங்கள்)", "Delivery Slot (5 Windows)")}
                <select
                  name="slot"
                  defaultValue={label("காலை · 6:00 – 7:00 AM", "Early Morning · 6:00 AM – 7:00 AM")}
                  data-testid="delivery-slot-select"
                >
                  <option>{label("காலை · 6:00 – 7:00 AM", "Early Morning · 6:00 AM – 7:00 AM")}</option>
                  <option>{label("காலை · 7:00 – 8:00 AM", "Morning Workout · 7:00 AM – 8:00 AM")}</option>
                  <option>{label("காலை · 8:00 – 9:00 AM", "Breakfast Routine · 8:00 AM – 9:00 AM")}</option>
                  <option>{label("நண்பகல் · 11:00 AM – 12:00 PM", "Mid-Day Refresh · 11:00 AM – 12:00 PM")}</option>
                  <option>{label("மாலை · 4:00 PM – 6:00 PM", "Evening Vitality · 4:00 PM – 6:00 PM")}</option>
                </select>
              </label>

              {/* Dynamic Date Label: "Start Date" for Packages/Routines, "Date" for Fresh Juices */}
              <label>
                {hasRoutine
                  ? label("தொடக்க தேதி", "Start Date")
                  : label("தேதி", "Date")}
                <input
                  name="date"
                  required
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  data-testid="order-date-input"
                />
              </label>
            </div>

            <button
              className="whatsapp-btn"
              type="submit"
              data-testid="whatsapp-order-button"
            >
              <FileText size={18} /> {label("ரசீது & WhatsApp ஆர்டர் பெற", "Generate Bill & Send to WhatsApp")}{" "}
              <ArrowRight size={18} />
            </button>

            <small className="form-foot">
              {label("உங்கள் வாட்ஸ்அப் எண்ணில் ஆர்டர் உறுதி செய்யப்படும் · நேரடி பணம் (COD)", "We’ll confirm your order directly on WhatsApp · 100% COD")}
            </small>
          </form>
        </div>
      )}

      {/* 11. DIGITAL BILL / INVOICE PREVIEW MODAL (Dynamic Date Label & Sugar Preference) */}
      {showBillPreview && confirmedOrder && (
        <div
          className="overlay bill-overlay"
          onClick={() => setShowBillPreview(false)}
          data-testid="bill-preview-overlay"
        >
          <div
            className="bill-modal-card"
            onClick={(e) => e.stopPropagation()}
            data-testid="bill-preview-modal"
          >
            <button
              type="button"
              className="form-close"
              onClick={() => setShowBillPreview(false)}
              data-testid="bill-preview-close"
              aria-label="Close bill"
            >
              <X size={22} />
            </button>

            {/* Bill Header */}
            <div className="bill-header">
              <img src={images.logo} alt="Sri Palani Andavar" className="bill-brand-img" />
              <h3>{label("ஸ்ரீ பழனி ஆண்டவர் உயிர்ச்சாறு", "Sri Palani Andavar Uyir Saaru")}</h3>
              <small>{label("“உடலுக்கு புத்துணர்ச்சி வாழ்வுக்கு ஆரோக்கியம்!”", "“Vitality for the Body, Wellness for Life!”")}</small>
              <small>{label("பழைய பேருந்து நிலையம், கோவில்பட்டி", "Old Bus Stand, Kovilpatti")}</small>
              <span className="bill-badge-pill">
                🧾 {label("அதிகாரப்பூர்வ ஆர்டர் ரசீது", "OFFICIAL ORDER INVOICE")}
              </span>
            </div>

            {/* Bill Metadata Grid */}
            <div className="bill-meta-grid">
              <div>
                <span>{label("ரசீது எண்:", "Bill No:")} </span>
                <b>#SPA-{Date.now().toString().slice(-5)}</b>
              </div>
              <div>
                <span>{label("பில் தேதி:", "Bill Date:")} </span>
                <b>{new Date().toLocaleDateString('en-GB')}</b>
              </div>
              <div>
                <span>{label("வாடிக்கையாளர்:", "Customer:")} </span>
                <b>{confirmedOrder.name}</b>
              </div>
              <div>
                <span>{label("தொலைபேசி:", "Phone:")} </span>
                <b>{confirmedOrder.phone}</b>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span>{label("டெலிவரி முகவரி:", "Address:")} </span>
                <b>{confirmedOrder.address}</b>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span>{label("டெலிவரி நேரம்:", "Slot:")} </span>
                <b>{confirmedOrder.slot}</b>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span>{hasRoutine ? label("தொடக்க தேதி:", "Start Date:") : label("தேதி:", "Date:")} </span>
                <b>{confirmedOrder.date}</b>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span>{label("சர்க்கரை விருப்பம்:", "Sugar Preference:")} </span>
                <b>
                  {confirmedOrder.sugarOption === "sugar-needed"
                    ? label("🍬 சர்க்கரை தேவை (With Sugar)", "🍬 Sugar Needed (With Sugar)")
                    : label("🍃 சர்க்கரை தேவையில்லை (100% தூய இயற்கை)", "🍃 No Added Sugar (100% Pure Natural)")}
                </b>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span>{label("ஐஸ் விருப்பம்:", "Ice Preference:")} </span>
                <b>
                  {confirmedOrder.iceOption === "ice-needed"
                    ? label("❄️ ஐஸ் தேவை (With Ice)", "❄️ Ice Needed (With Ice)")
                    : label("🧊 ஐஸ் தேவையில்லை (இயற்கை)", "🧊 No Ice (Natural Room Temp)")}
                </b>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="bill-items-table">
              <thead>
                <tr>
                  <th>{label("பொருள் விவரம் (300 மி.லி)", "Item (300 ml)")}</th>
                  <th style={{ textAlign: "center" }}>{label("எண்ணிக்கை", "Qty")}</th>
                  <th className="num">{label("விலை", "Price")}</th>
                  <th className="num">{label("மொத்தம்", "Total")}</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <b>{label(item.ta, item.en)}</b>
                      <small style={{ display: "block", color: "var(--muted)", fontSize: "10px" }}>
                        {label("300 மி.லி தூய சாறு", "300 ml Pure")}
                      </small>
                    </td>
                    <td style={{ textAlign: "center" }}>x{item.qty}</td>
                    <td className="num">₹{item.price}</td>
                    <td className="num">₹{item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="bill-totals">
              <div className="bill-total-row">
                <span>{label("பொருட்கள் மொத்தம்", "Subtotal")}</span>
                <b>₹{subtotal}</b>
              </div>
              <div className="bill-total-row">
                <span>{label("டெலிவரி கட்டணம்", "Delivery Fee")}</span>
                <b style={{ color: "var(--green)" }}>{delivery ? `₹${delivery}` : label("இலவசம்", "FREE")}</b>
              </div>
              <div className="bill-total-row grand">
                <span>{label("செலுத்த வேண்டிய மொத்த தொகை:", "GRAND TOTAL BILL:")}</span>
                <b>₹{subtotal + delivery}</b>
              </div>
            </div>

            {/* Action to send to WhatsApp */}
            <button
              type="button"
              className="bill-send-whatsapp-btn"
              onClick={sendBillToWhatsApp}
              data-testid="send-bill-whatsapp-btn"
            >
              <FileText size={20} /> {label("WhatsApp இல் பில் அனுப்ப", "Send Official Bill to WhatsApp")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
