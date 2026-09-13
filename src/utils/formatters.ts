export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getTomorrowFormatted(language: 'ta' | 'en'): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };

  if (language === 'ta') {
    return `நாளை, ${tomorrow.toLocaleDateString('ta-IN', options)}`;
  }
  return `Tomorrow, ${tomorrow.toLocaleDateString('en-IN', options)}`;
}

export function validatePhoneNumber(phone: string): boolean {
  // 10 digits Indian mobile number validation
  const clean = phone.replace(/[^0-9]/g, '');
  return /^[6-9]\d{9}$/.test(clean);
}
