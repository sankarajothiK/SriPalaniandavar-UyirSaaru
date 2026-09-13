import React, { useState } from 'react';
import { testimonials } from '../../data/testimonials';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { isTamil } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-tamil">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isTamil ? "வாடிக்கையாளர் கருத்துக்கள்" : "Customer Love"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-tamil tracking-tight">
            {isTamil ? "எங்கள் வாடிக்கையாளர்களின் அனுபவம்" : "Loved by Families & Fitness Enthusiasts"}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-luxury relative">
            
            <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-200/80 pointer-events-none" />

            <div className="space-y-6">
              
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-700 ml-2 font-sans">5.0 Rating</span>
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-slate-800 font-tamil leading-relaxed italic">
                "{isTamil ? activeTestimonial.commentTa : activeTestimonial.commentEn}"
              </p>

              {/* User Profile Info */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-emerald-400 shadow-2xs"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-tamil">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-tamil">
                      {isTamil ? activeTestimonial.roleTa : activeTestimonial.roleEn} • {isTamil ? activeTestimonial.locationTa : activeTestimonial.locationEn}
                    </p>
                  </div>
                </div>

                {/* Verified Badge */}
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isTamil ? "உறுதிப்படுத்தப்பட்ட சந்தாதாரர்" : "Verified Subscriber"}</span>
                </span>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === dotIdx ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs active:scale-95 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs active:scale-95 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
