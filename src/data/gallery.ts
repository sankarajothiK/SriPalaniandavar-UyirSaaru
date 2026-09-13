export interface GalleryItem {
  id: string;
  titleTa: string;
  titleEn: string;
  category: 'farm' | 'preparation' | 'bottling' | 'delivery';
  categoryTa: string;
  categoryEn: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    titleTa: "விவசாயத் தோட்டத்து புதிய பழங்கள்",
    titleEn: "Farm-Fresh Orchard Harvest",
    category: "farm",
    categoryTa: "தோட்டத்து பழங்கள்",
    categoryEn: "Farm Harvest",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    aspect: "landscape"
  },
  {
    id: "gal-2",
    titleTa: "அதிகாலை தூய பழச்சாறு பிழிதல்",
    titleEn: "Dawn Cold-Press Squeeze",
    category: "preparation",
    categoryTa: "தயாரிப்பு முறை",
    categoryEn: "Fresh Extraction",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    aspect: "portrait"
  },
  {
    id: "gal-3",
    titleTa: "சிகப்பு மாதுளை முத்துக்களின் நலம்",
    titleEn: "Ruby Pomegranate Jewels",
    category: "farm",
    categoryTa: "தோட்டத்து பழங்கள்",
    categoryEn: "Farm Harvest",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    aspect: "square"
  },
  {
    id: "gal-4",
    titleTa: "சுகாதாரமான காற்றுப்புகா பாட்டிலிங்",
    titleEn: "Hygienic Tamper-Proof Bottling",
    category: "bottling",
    categoryTa: "பாட்டிலிங் தரம்",
    categoryEn: "Sanitized Bottling",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80",
    aspect: "portrait"
  },
  {
    id: "gal-5",
    titleTa: "அதிகாலை வீட்டு வாசல் டெலிவரி",
    titleEn: "Doorstep Morning Delivery",
    category: "delivery",
    categoryTa: "காலை டெலிவரி",
    categoryEn: "Morning Delivery",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    aspect: "landscape"
  },
  {
    id: "gal-6",
    titleTa: "வைட்டமின் சி ஆரஞ்சு புத்துணர்ச்சி",
    titleEn: "Pure Vitamin C Squeeze",
    category: "preparation",
    categoryTa: "தயாரிப்பு முறை",
    categoryEn: "Fresh Extraction",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
    aspect: "square"
  }
];
