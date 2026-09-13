export interface Testimonial {
  id: string;
  name: string;
  locationTa: string;
  locationEn: string;
  roleTa: string;
  roleEn: string;
  rating: number;
  commentTa: string;
  commentEn: string;
  avatar: string;
  routine: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Dr. K. Senthil Kumar",
    locationTa: "பழனி மெயின் ரோடு",
    locationEn: "Palani Main Road",
    roleTa: "மருத்துவர் & 7 நாள் வழக்க சந்தாதாரர்",
    roleEn: "Doctor & 7-Day Plan Subscriber",
    rating: 5,
    commentTa: "காலை 6:30 மணிக்கே எந்தவொரு தண்ணீரும் சர்க்கரையும் கலக்காத 100% தூய பழச்சாறு வாசல் தேடி வருவது என் அன்றாட ஆரோக்கியத்தை பெரிதும் உயர்த்தியுள்ளது. தரம் அற்புதம்!",
    commentEn: "Having pure 100% cold-pressed juice delivered at 6:30 AM without water dilution or added sugar has transformed my morning routine. Top-notch quality!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    routine: "7-Day Morning Freshness Routine"
  },
  {
    id: "t-2",
    name: "Meenakshi Sundaram",
    locationTa: "அடிவாரம், பழனி",
    locationEn: "Adivaram, Palani",
    roleTa: "குடும்பத் தலைவி & யோகா பயிற்சியாளர்",
    roleEn: "Homemaker & Yoga Practitioner",
    rating: 5,
    commentTa: "சர்க்கரை இல்லாத வெள்ளரி மற்றும் நெல்லிக்காய் சாறு என் பெற்றோருக்கு மிகவும் பிடித்துள்ளது. வாட்ஸ்அப் மூலம் ஆர்டர் செய்வது மிகவும் சுலபம்.",
    commentEn: "The sugar-conscious cucumber and amla juices are a blessing for my elderly parents. Ordering directly on WhatsApp is effortless and fast.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    routine: "Sugar-Conscious Routine"
  },
  {
    id: "t-3",
    name: "R. Vigneshwar",
    locationTa: "பைபாஸ் ரோடு",
    locationEn: "Bypass Road",
    roleTa: "உடற்பயிற்சியாளர் & மாரத்தான் ஓட்டப்பந்தய வீரர்",
    roleEn: "Fitness Coach & Marathon Runner",
    rating: 5,
    commentTa: "வேர்க்கடலை மற்றும் வாழைப்பழ புரோட்டீன் ஸ்மூத்திகள் ஜிம் பயிற்சிக்கு பிறகு உடனடி ஆற்றல் தருகின்றன. உணவு தர பாட்டிலிங் மற்றும் தூய்மை பிரமாதம்.",
    commentEn: "The banana peanut butter protein smoothies are the ultimate post-workout fuel. Clean bottling, royal taste, and punctual dawn delivery.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    routine: "Energy & Fitness Routine"
  }
];
