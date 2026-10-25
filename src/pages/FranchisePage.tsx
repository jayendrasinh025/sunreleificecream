import React, { useState } from 'react';
import { PageId, FranchiseEnquiryData } from '../types';
import {
  formatFranchiseEnquiry,
  buildWhatsAppUrl,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
} from '../utils/whatsapp';
import {
  Store,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

interface FranchisePageProps {
  onNavigate: (page: PageId) => void;
}

export const FranchisePage: React.FC<FranchisePageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<FranchiseEnquiryData>({
    name: '',
    phone: '',
    preferredCity: '',
    investmentRange: '₹3 Lakhs – ₹5 Lakhs',
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
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setFormError('Please provide a valid contact number.');
      return;
    }
    if (!formData.preferredCity.trim()) {
      setFormError('Please enter your preferred location or city.');
      return;
    }

    setFormError('');
    const msg = formatFranchiseEnquiry(formData);
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    if (!formData.name.trim() || !formData.preferredCity.trim()) {
      setFormError('Please fill in your name and preferred location first.');
      return;
    }
    const msg = formatFranchiseEnquiry(formData);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const investmentTiers = [
    'Under ₹2 Lakhs (Retail Freezer Outlet)',
    '₹3 Lakhs – ₹5 Lakhs (Kiosk / Express)',
    '₹5 Lakhs – ₹10 Lakhs (Exclusive Brand Parlour)',
    'Above ₹10 Lakhs (Master / Multi-Unit)',
  ];

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-20">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-b from-[#FFF9F2] via-[#FDF5E8] to-[#FAFAFA] py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E94B35] text-white text-xs font-semibold mb-4 shadow-2xs">
            <Store className="w-3.5 h-3.5" />
            <span>Retail & Scooping Parlour Opportunities</span>
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#123B75] tracking-tight leading-tight mb-4">
            Own a Sun Relief Ice Cream Parlour
          </h1>
          <p className="text-slate-700 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Bring joyful scoops, signature waffle cones, and family celebration packs to your local market.
            Join our growing parlour network with dedicated operational, branding, and stock supply support.
          </p>
        </div>
      </section>

      {/* 2. Three Parlour Formats */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35]">
              Available Formats
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#123B75] mt-1 mb-2">
              Tailored to Your Space & Budget
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Choose the format that fits your commercial location—from busy shopping complexes to neighborhood hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Format 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-full h-36 flex items-center justify-center p-2 mb-3 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100">
                  <ProductImage
                    src="/images/products/cone/IMG-20261024-WA0126.jpg"
                    alt="Sun Relief Waffle Cones and Impulse Sticks"
                    className="max-h-full max-w-full object-contain"
                    categoryLabel="Cones & Sticks"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E94B35] bg-[#F8DCE8] px-2.5 py-0.5 rounded-full">
                  Compact & Quick
                </span>
                <h3 className="font-heading font-bold text-xl text-[#123B75] mt-2 mb-1">
                  Express Kiosk / Booth
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Ideal for malls, transit hubs, university streets, and busy retail corridors with 80–150 sq. ft. space.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#123B75]" />
                    <span>Focus on impulse sticks, cones & quick scoops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#123B75]" />
                    <span>Low overheads & rapid installation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#123B75]" />
                    <span>Standardized modular counter branding</span>
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
                Space Requirement: 80 – 150 sq. ft.
              </div>
            </div>

            {/* Format 2 */}
            <div className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFFDF9] rounded-3xl p-6 border-2 border-[#123B75]/30 shadow-md space-y-4 flex flex-col justify-between relative">
              <span className="absolute -top-3 right-6 bg-[#123B75] text-[#F5C542] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                Recommended
              </span>
              <div>
                <div className="w-full h-36 flex items-center justify-center p-2 mb-3 bg-white rounded-2xl border border-slate-100">
                  <ProductImage
                    src="/images/products/premium/IMG-20261024-WA0099.jpg"
                    alt="Sun Relief Gourmet Scooping and Sundaes"
                    className="max-h-full max-w-full object-contain"
                    categoryLabel="Scooping Parlour"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B75] bg-[#F5C542]/30 px-2.5 py-0.5 rounded-full">
                  Full Experience
                </span>
                <h3 className="font-heading font-bold text-xl text-[#123B75] mt-2 mb-1">
                  Sun Relief Brand Parlour
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Full-fledged ice cream parlour with dine-in seating, complete sundae menu, waffle cones, and take-home family freezer display.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E94B35]" />
                    <span>Complete 40+ flavour scooping counter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E94B35]" />
                    <span>Festive family pack retail sales corner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E94B35]" />
                    <span>Interior branding, menu boards & neon sign</span>
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
                Space Requirement: 200 – 500 sq. ft.
              </div>
            </div>

            {/* Format 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-full h-36 flex items-center justify-center p-2 mb-3 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100">
                  <ProductImage
                    src="/images/products/family-pack/IMG-20261024-WA0006.jpg"
                    alt="Sun Relief Family Celebration Packs for Retailers"
                    className="max-h-full max-w-full object-contain"
                    categoryLabel="Retail Freezer Pack"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Store-in-Store
                </span>
                <h3 className="font-heading font-bold text-xl text-[#123B75] mt-2 mb-1">
                  Retail Freezer Dealer
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  For existing bakeries, dairy parlours, supermarket aisles, or sweet shops wanting to install a dedicated Sun Relief freezer.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#123B75]" />
                    <span>Dedicated branded deep-freezer unit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#123B75]" />
                    <span>High-volume family party pack sales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#123B75]" />
                    <span>Low space & seamless integration</span>
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
                Space Requirement: 30 – 60 sq. ft.
              </div>
            </div>
          </div>

          {/* 3. Franchise Enquiry Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c274e] to-[#123B75] text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#F5C542]">
                  Franchise Desk
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mt-1 mb-3">
                  Franchise Inquiry Flow
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Submit your preliminary inquiry via WhatsApp. Our team will share available territory slots,
                  unit economics, and layout guidelines.
                </p>

                <ul className="space-y-3 text-xs text-slate-200 mb-6">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                    <span>Full recipe, scoops, sundae and packaging training</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                    <span>Scheduled batch delivery directly from Surat factory</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                    <span>Transparent commercial terms discussed directly with management</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-slate-300">
                <p className="font-semibold text-white">Maruti Marketing Franchise Team:</p>
                <p className="mt-1">{BUSINESS_PHONE} (WhatsApp / Call)</p>
                <p>{BUSINESS_EMAIL}</p>
                <p className="text-[11px] text-slate-400 mt-2">{BUSINESS_ADDRESS}</p>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#123B75] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#E94B35]" />
                  <span>Franchise Partner Information</span>
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
                      placeholder="e.g. Jayendra Vaghela"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 95588 83147"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surat (Adajan, Vesu, Sayan), Navsari, Bardoli, Ahmedabad"
                    value={formData.preferredCity}
                    onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Investment Range *
                  </label>
                  <select
                    value={formData.investmentRange}
                    onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                  >
                    {investmentTiers.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Do you have own or rented commercial property? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your location, available square footage, or previous business background..."
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
                    <span>Send Franchise Enquiry on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Target Number: +91 95588 83147</span>
                    <button
                      type="button"
                      onClick={handleCopy}
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
