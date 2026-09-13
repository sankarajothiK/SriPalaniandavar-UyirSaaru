import React, { useState } from 'react';
import { galleryItems, GalleryItem } from '../../data/gallery';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Camera
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { isTamil } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', labelTa: 'அனைத்து புகைப்படங்கள்', labelEn: 'All Photos' },
    { id: 'farm', labelTa: 'தோட்டத்து பழங்கள்', labelEn: 'Farm Harvest' },
    { id: 'preparation', labelTa: 'தயாரிப்பு முறை', labelEn: 'Fresh Extraction' },
    { id: 'bottling', labelTa: 'பாட்டிலிங் தரம்', labelEn: 'Sanitized Bottling' },
    { id: 'delivery', labelTa: 'காலை டெலிவரி', labelEn: 'Morning Delivery' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-tamil">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTamil ? "எங்கள் தூய்மைப் பயணம்" : "Visual Journey"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-tamil tracking-tight">
            {isTamil ? "சோலையின் புகைப்படத் தொகுப்பு" : "The Orchard Gallery"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-tamil leading-relaxed">
            {isTamil 
              ? "தோட்டத்து புதிய பழங்கள் பறிப்பு முதல் அதிகாலை உங்கள் வாசல் வரும் வரை உள்ள தூய்மை நிலைகள்."
              : "A glimpse into our daily harvest, cold-press extraction, hygienic bottling, and punctual doorstep delivery."}
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl max-w-full overflow-x-auto gap-1 scrollbar-none">
            {categories.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap font-tamil ${
                    isSelected
                      ? 'bg-white text-emerald-800 shadow-xs scale-102'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isTamil ? cat.labelTa : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-Style Animated Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => {
            const title = isTamil ? item.titleTa : item.titleEn;
            const categoryName = isTamil ? item.categoryTa : item.categoryEn;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs hover:shadow-luxury transition-all duration-300 cursor-pointer aspect-4/3 sm:aspect-auto sm:h-72"
              >
                <img
                  src={item.image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                
                {/* Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 font-sans">
                      {categoryName}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold font-tamil leading-snug">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl space-y-3 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.titleEn}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="px-2 py-1 flex items-center justify-between text-white">
              <div>
                <span className="text-xs font-bold text-emerald-400 font-sans uppercase">
                  {isTamil ? selectedImage.categoryTa : selectedImage.categoryEn}
                </span>
                <h3 className="text-sm sm:text-base font-bold font-tamil">
                  {isTamil ? selectedImage.titleTa : selectedImage.titleEn}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
