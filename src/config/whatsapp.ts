import { DeliverySlotOption } from '../types';

export const STORE_CONFIG = {
  // Configurable WhatsApp order receiving number
  whatsappNumber: "919944665159", // Store WhatsApp phone number
  
  brandNameTa: "ஸ்ரீ பழனியாண்டவர் பழமுதிர் சோலை",
  brandNameEn: "Sri Palani Andavar Pazhamudir Solai",
  taglineTa: "இயற்கையின் சுவையில்... வாழ்வின் நலம்...",
  taglineEn: "In Nature's Taste... Lies Life's Wellness...",
  sloganTa: "Fresh • Healthy • Home Delivered",
  sloganEn: "Fresh • Healthy • Home Delivered",
  
  phoneDisplay: "+91 99446 65159",
  altPhoneDisplay: "+91 94432 11223",
  email: "orders@palaniandavarjuice.com",
  addressTa: "பழைய பேருந்து நிலையம், கோவில்பட்டி, தமிழ்நாடு - 628501",
  addressEn: "Old Bus Stand, Kovilpatti, Tamil Nadu - 628501",
  
  operatingHoursTa: "காலை 5:30 AM - இரவு 9:30 PM (அனைத்து நாட்களும்)",
  operatingHoursEn: "5:30 AM - 9:30 PM (All 7 Days)",
  
  deliveryScheduleSummaryTa: "தினசரி 3 நேர டெலிவரி: காலை 6-9 AM • நண்பகல் 11-12 PM • மாலை 4-6 PM",
  deliveryScheduleSummaryEn: "3 Daily Delivery Slots: Morning 6-9 AM • Noon 11-12 PM • Evening 4-6 PM",
  
  deliveryCharge: 0, // Free delivery
  freeDeliveryThreshold: 0, // Free delivery
  currency: "₹",
};

export const DELIVERY_SLOTS: DeliverySlotOption[] = [
  {
    id: "slot-morning",
    labelTa: "🌅 காலை டெலிவரி: 6:00 AM - 9:00 AM",
    labelEn: "🌅 Morning Slot: 6:00 AM - 9:00 AM",
    time: "6:00 AM - 9:00 AM",
    badgeTa: "அதிகாலை புத்துணர்ச்சி",
    badgeEn: "Dawn Freshness"
  },
  {
    id: "slot-noon",
    labelTa: "☀️ நண்பகல் டெலிவரி: 11:00 AM - 12:00 PM",
    labelEn: "☀️ Mid-Day Slot: 11:00 AM - 12:00 PM",
    time: "11:00 AM - 12:00 PM",
    badgeTa: "மதிய உணவு புத்துணர்ச்சி",
    badgeEn: "Mid-Day Refresh"
  },
  {
    id: "slot-evening",
    labelTa: "🌇 மாலை டெலிவரி: 4:00 PM - 6:00 PM",
    labelEn: "🌇 Evening Slot: 4:00 PM - 6:00 PM",
    time: "4:00 PM - 6:00 PM",
    badgeTa: "மாலை நலம் & எனர்ஜி",
    badgeEn: "Evening Vitality"
  }
];
