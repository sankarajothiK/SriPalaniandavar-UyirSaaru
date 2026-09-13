import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { DELIVERY_SLOTS } from '../../config/whatsapp';
import { User, Phone, MapPin, Clock, FileText } from 'lucide-react';

interface CustomerDetailsFormProps {
  errors?: Record<string, string>;
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({ errors = {} }) => {
  const { t, isTamil } = useLanguage();
  const { customer, updateCustomer } = useCart();

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-200">
        <MapPin className="w-4 h-4 text-emerald-700" />
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
          {t.customerInfoTitle}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.customerName}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={customer.name}
              onChange={(e) => updateCustomer({ name: e.target.value })}
              placeholder={isTamil ? "உங்கள் பெயர் (உதா: Ramesh)" : "Full Name"}
              className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
              } focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600`}
            />
          </div>
          {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.customerPhone}
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="tel"
              maxLength={10}
              value={customer.phone}
              onChange={(e) => updateCustomer({ phone: e.target.value })}
              placeholder="9842100000"
              className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border ${
                errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
              } focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-sans`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-red-600 mt-0.5">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.customerAddress}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <textarea
              rows={2}
              value={customer.address}
              onChange={(e) => updateCustomer({ address: e.target.value })}
              placeholder={isTamil ? "கதவு எண், தெரு பெயர், பகுதி..." : "Door No, Street Name, Area..."}
              className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border ${
                errors.address ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
              } focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600`}
            />
          </div>
          {errors.address && <p className="text-[11px] text-red-600 mt-0.5">{errors.address}</p>}
        </div>

        {/* 3 Delivery Slots */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.customerDeliverySlot}
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <select
              value={customer.deliverySlot}
              onChange={(e) => updateCustomer({ deliverySlot: e.target.value })}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium text-slate-800"
            >
              {DELIVERY_SLOTS.map(slot => (
                <option key={slot.id} value={isTamil ? slot.labelTa : slot.labelEn}>
                  {isTamil ? slot.labelTa : slot.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Notes */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            {t.customerNotes}
          </label>
          <input
            type="text"
            value={customer.notes}
            onChange={(e) => updateCustomer({ notes: e.target.value })}
            placeholder="e.g. Less ice, no added sugar..."
            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>
    </div>
  );
};
