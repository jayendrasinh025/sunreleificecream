import React, { useState } from 'react';
import { PageId, DistributorEnquiryData } from '../types';
import {
  formatDistributorEnquiry,
  buildWhatsAppUrl,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
} from '../utils/whatsapp';
import {
  Truck,
  CheckCircle2,
  Building2,
  ThermometerSnowflake,
  MessageCircle,
  Check,
  ShieldAlert,
  ArrowRight,
  Package,
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

interface DistributionPageProps {
  onNavigate: (page: PageId) => void;
}

export const DistributionPage: React.FC<DistributionPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<DistributorEnquiryData>({
    name: '',
    businessName: '',
    cityAndState: '',
    phone: '',
    coldStorage: 'Yes',
    additionalNotes: '',
  });

  const [formError, setFormError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.businessName.trim()) {
      setFormError('Please enter your business or firm name.');
      return;
    }
    if (!formData.cityAndState.trim()) {
      setFormError('Please enter your city and state.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setFormError('Please provide a valid contact phone number.');
      return;
    }

    setFormError('');
    const msg = formatDistributorEnquiry(formData);
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  const handleCopyMessage = () => {
    if (!formData.name.trim() || !formData.businessName.trim()) {
      setFormError('Please fill in your name and business name before copying.');
      return;
    }
    const msg = formatDistributorEnquiry(formData);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-20">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-b from-[#FFF9F2] via-[#FDF5E8] to-[#FAFAFA] py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B75] text-[#F5C542] text-xs font-semibold mb-4 shadow-2xs">
            <Truck className="w-3.5 h-3.5" />
            <span>Commercial Wholesale & Distribution Opportunities</span>
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#123B75] tracking-tight leading-tight mb-4">
            Partner With Sun Relief Ice Cream
          </h1>
          <p className="text-slate-700 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Expand your distribution footprint with a rapidly growing ice cream brand manufacturer.
            We supply high-turnover cones, candy bars, generous family packs, and traditional shrikhand across Gujarat.
          </p>
        </div>
      </section>

      {/* 2. Key Distributor Model Pillars */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#123B75]/10 text-[#123B75] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#123B75]">
                Direct Factory Supply
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct procurement from Maruti Marketing manufacturing plant in Sayan, Surat, Gujarat.
                Ensures fresh stock rotation and consistent product availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E94B35]/10 text-[#E94B35] flex items-center justify-center font-bold">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#123B75]">
                Cold-Storage Protocol
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict sub-zero (-18°C) temperature requirements. We assist prospective partners with
                deep freezer selection, cold room capacities, and route logistics advice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5C542]/20 text-[#123B75] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6 text-[#123B75]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#123B75]">
                High-Volume Consumer Demand
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From corner grocery stores to wedding caterers and retail supermarkets, our celebration
                family packs and impulse sticks drive rapid customer repeat purchases.
              </p>
            </div>
          </div>

          {/* Wholesale Pack Showcase */}
          <div className="bg-gradient-to-r from-[#FFFDF9] via-white to-[#FFFDF9] rounded-3xl border border-slate-200 p-6 md:p-8 mb-12 shadow-xs">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-5/12 flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs">
                <div className="w-full h-56 flex items-center justify-center">
                  <ProductImage
                    src="/images/products/family-pack/IMG-20261024-WA0034.jpg"
                    alt="Sun Relief 5-Litre Wholesale Catering Box"
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                    categoryLabel="5-Ltr Catering Brick"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-7/12 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123B75] text-[#F5C542] text-xs font-bold">
                  <Package className="w-3.5 h-3.5" />
                  <span>Commercial & Event Catering Supply</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#123B75]">
                  5-Litre Bulk Catering Bricks & Party Packs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In addition to retail individual sticks and 750ml celebration bricks, Sun Relief manufactures heavy-duty 5-Litre bulk catering boxes designed specifically for banquets, wedding caterers, ice cream parlours, and institutional foodservice buyers.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-[#123B75] block">5-Litre Capacity</span>
                    <span className="text-[11px] text-slate-500">Commercial scooping</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-[#123B75] block">750ml Bricks</span>
                    <span className="text-[11px] text-slate-500">Family celebrations</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                    <span className="font-bold text-[#123B75] block">Impulse Sticks</span>
                    <span className="text-[11px] text-slate-500">Cones & Chocobars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Distribution Enquiry Form Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Form Left Guidance (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#123B75] to-[#0a244b] text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#F5C542]">
                  Direct Wholesale Flow
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mt-1 mb-4">
                  Distributor Application
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Please complete the verified form details. When you click “Submit on WhatsApp”,
                  it will prepare an officially formatted inquiry message directly to our business number.
                </p>

                <div className="space-y-3 text-xs text-slate-200 mb-8">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                    <span>Coverage areas: South Gujarat, Surat, Navsari, Bharuch, Vadodara & expanding</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                    <span>Minimum order & route schedules tailored to territory size</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                    <span>Promotional store boards and banner support provided</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-slate-300">
                <p className="font-semibold text-white">Direct Business Desk:</p>
                <p className="mt-1">{BUSINESS_PHONE} (WhatsApp / Call)</p>
                <p>{BUSINESS_EMAIL}</p>
                <p className="text-[11px] text-slate-400 mt-2">{BUSINESS_ADDRESS}</p>
              </div>
            </div>

            {/* Form Right Inputs (7 cols) */}
            <div className="lg:col-span-7 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#123B75] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#E94B35]" />
                  <span>Required Distributor Details</span>
                </div>

                {formError && (
                  <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mukeshbhai Shah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business / Firm Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shah Cold Storage & Agency"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City & State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Surat, Gujarat"
                      value={formData.cityAndState}
                      onChange={(e) => setFormData({ ...formData, cityAndState: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98250 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Do you have sub-zero cold-storage / deep-freezer availability? *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Yes', 'No', 'Need guidance'] as const).map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, coldStorage: opt })}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                          formData.coldStorage === opt
                            ? 'bg-[#123B75] text-white border-[#123B75] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Existing routes, retail stores served, or questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your distribution experience, current routes, or territory interest..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50 resize-none"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Send Distributor Enquiry on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Target Number: +91 95588 83147</span>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="text-[#123B75] hover:underline font-semibold cursor-pointer"
                    >
                      {copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
