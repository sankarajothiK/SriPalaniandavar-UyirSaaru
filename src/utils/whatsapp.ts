import { CartItem, CustomerDetails, Language } from '../types';
import { STORE_CONFIG } from '../config/whatsapp';

export interface GenerateOrderParams {
  cart: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  total: number;
  language: Language;
}

export function formatWhatsAppMessage({
  cart,
  customer,
  subtotal,
  deliveryFee,
  total,
  language
}: GenerateOrderParams): string {
  const isTa = language === 'ta';
  
  const header = `🌴 *${STORE_CONFIG.brandNameTa}* 🌴\n_${STORE_CONFIG.brandNameEn}_\n_${STORE_CONFIG.taglineTa}_\n━━━━━━━━━━━━━━━━━━━━\n\n🧾 *${isTa ? "புதிய ஆர்டர் விவரங்கள் (ORDER DETAILS)" : "ORDER DETAILS"}*`;

  // Filter single products and packages
  const regularItems = cart.filter(item => item.itemType === 'product');
  const planItems = cart.filter(item => item.itemType === 'plan');
  const customBoxes = cart.filter(item => item.itemType === 'custom_package');

  let itemsText = '';
  let itemCounter = 1;

  if (regularItems.length > 0) {
    itemsText += `\n\n🍹 *${isTa ? "ப்ரெஷ் ஜூஸ்கள் (Fresh Juices):" : "Fresh Juices:"}*`;
    regularItems.forEach(item => {
      const name = isTa ? `${item.nameTa} (${item.nameEn})` : `${item.nameEn} (${item.nameTa})`;
      const sizeStr = item.size ? ` [${item.size}]` : '';
      itemsText += `\n${itemCounter}. *${name}*${sizeStr}\n   ▫️ ${item.quantity} × ₹${item.price} = *₹${item.quantity * item.price}*`;
      itemCounter++;
    });
  }

  if (planItems.length > 0) {
    itemsText += `\n\n📅 *${isTa ? "காலை திட்டங்கள் (Morning Plans):" : "Morning Subscription Plans:"}*`;
    planItems.forEach(item => {
      const name = isTa ? `${item.nameTa} (${item.nameEn})` : `${item.nameEn} (${item.nameTa})`;
      const days = item.customDetails?.durationDays || 7;
      const persons = item.customDetails?.bottlesPerDay || 1;
      itemsText += `\n${itemCounter}. *${name}*\n   ▫️ ${days} ${isTa ? "நாட்கள்" : "Days"} • ${persons} ${isTa ? "பாட்டில்/நாள்" : "Bottle(s)/Day"}\n   ▫️ ${item.quantity} × ₹${item.price} = *₹${item.quantity * item.price}*`;
      itemCounter++;
    });
  }

  if (customBoxes.length > 0) {
    itemsText += `\n\n📦 *${isTa ? "தனிப்பயன் பேக்கேஜ் (Custom Packages):" : "Custom Juice Packages:"}*`;
    customBoxes.forEach(item => {
      const name = isTa ? `${item.nameTa}` : `${item.nameEn}`;
      const freq = isTa ? (item.customDetails?.frequencyTa || item.customDetails?.frequency || 'தனிப்பயன்') : (item.customDetails?.frequencyEn || item.customDetails?.frequency || 'Custom');
      itemsText += `\n${itemCounter}. *${name}* (${freq})\n   ▫️ ${isTa ? "தேர்வு செய்யப்பட்டவை" : "Included Juices"}:`;
      if (item.customDetails?.selectedJuices && item.customDetails.selectedJuices.length > 0) {
        item.customDetails.selectedJuices.forEach(j => {
          itemsText += `\n      • ${isTa ? j.nameTa : j.nameEn} × ${j.qty}`;
        });
      }
      itemsText += `\n   ▫️ ${isTa ? "தொகை" : "Price"}: *₹${item.price}*`;
      itemCounter++;
    });
  }

  const deliveryStr = deliveryFee === 0 
    ? (isTa ? "இலவசம் (FREE)" : "FREE Delivery") 
    : `₹${deliveryFee}`;

  const customerText = `\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *${isTa ? "டெலிவரி முகவரி (Delivery Address):" : "Delivery Address:"}*\n${customer.address}${customer.landmark ? `\n(Landmark: ${customer.landmark})` : ''}\n\n👤 *${isTa ? "வாடிக்கையாளர் (Customer):" : "Customer:"}* ${customer.name}\n📞 *${isTa ? "மொபைல் (Phone):" : "Phone:"}* ${customer.phone}\n⏰ *${isTa ? "டெலிவரி நேரம் (Preferred Slot):" : "Delivery Slot:"}* ${customer.deliverySlot}${customer.notes ? `\n📝 *${isTa ? "சிறப்பு குறிப்பு (Notes):" : "Special Notes:"}* ${customer.notes}` : ''}`;

  const paymentText = `\n\n━━━━━━━━━━━━━━━━━━━━\n💵 *${isTa ? "பொருட்களின் தொகை (Subtotal):" : "Subtotal:"}* ₹${subtotal}\n🚚 *${isTa ? "டெலிவரி கட்டணம் (Delivery Fee):" : "Delivery Fee:"}* ${deliveryStr}\n💰 *${isTa ? "செலுத்த வேண்டிய மொத்த தொகை (Total):" : "Total to Pay:"}* *₹${total}*\n\n💳 *${isTa ? "பணம் செலுத்தும் முறை:" : "Payment Mode:"}* Cash on Delivery (COD)\n━━━━━━━━━━━━━━━━━━━━\n\n🙏 *${isTa ? "தயவுசெய்து எனது ஆர்டரை உறுதி செய்து டெலிவரி அனுப்பவும்." : "Please confirm my order and arrange morning delivery."}*`;

  return `${header}${itemsText}${customerText}${paymentText}`;
}

export function generateWhatsAppUrl(message: string, phoneNumber: string = STORE_CONFIG.whatsappNumber): string {
  // Clean phone number (remove +, spaces, dashes)
  const cleanedPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  // Return standard WhatsApp API URL
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}

export function generateWhatsAppWebUrl(message: string, phoneNumber: string = STORE_CONFIG.whatsappNumber): string {
  const cleanedPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://web.whatsapp.com/send?phone=${cleanedPhone}&text=${encodedMessage}`;
}
