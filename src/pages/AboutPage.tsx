import React from 'react';
import { PageId } from '../types';
import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  buildWhatsAppUrl,
} from '../utils/whatsapp';
import {
  Sparkles,
  Milk,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Store,
  MapPin,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-white">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF9F2] via-[#FDF5E8] to-white py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5C542] text-[#123B75] text-xs font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pure Dairy Craftsmanship • Surat, Gujarat</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-[#123B75] tracking-tight leading-tight mb-4">
            About Sun Relief Ice Cream
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Rooted in South Gujarat's dairy tradition, Sun Relief crafts authentic, creamy, and joyful ice cream
            experiences for families, retail stores, and commercial partners.
          </p>
        </div>
      </section>

      {/* 2. Brand Story & Company Overview */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35]">
                Who We Are
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#123B75] leading-tight">
                Our Journey: Delivering Pure Moments of Relief & Joy
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Operated by <strong>Maruti Marketing</strong>, Sun Relief Ice Cream was born from a desire to provide honest,
                pure-milk frozen desserts with real ingredients, uncompromised rich creaminess, and generous family value.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Operating from our manufacturing facility in <strong>Sayan (Olpad, Surat, Gujarat)</strong>, we blend modern
                automated production standards with beloved Indian sweet heritage—from rich caramelized Mawa and Kesar Pista
                to crunchy Frostick chocolate bars and authentic churned Shrikhand.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#123B75]">
                  <MapPin className="w-4 h-4 text-[#E94B35]" />
                  <span>Verified Manufacturing & Registered Facility</span>
                </div>
                <p className="pl-6 text-slate-600 leading-relaxed">
                  {BUSINESS_ADDRESS}
                </p>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#123B75] to-[#0c274e] p-7 text-white shadow-xl relative">
                <div className="w-12 h-12 rounded-2xl bg-[#F5C542] text-[#123B75] flex items-center justify-center mb-4 font-bold text-xl">
                  SR
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-2">
                  Our Core Philosophy
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Ice cream is more than a dessert—it is an escape, a smile after a long day in the sun, and the centerpiece of family reunions.
                </p>
                <div className="space-y-3 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>Real dairy milk base</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>No artificial shortcuts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>Pure celebration with generous family packs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>Strict temperature-controlled cold-chain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Range Overview */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35]">
              Product Spectrum
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#123B75] mt-1 mb-2">
              Five Pillars of Indulgence
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              A comprehensive range created for daily corner store impulse treats, family dinners, and festival gifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#E94B35] uppercase tracking-wider">01. Cones</span>
                <h4 className="font-heading font-bold text-lg text-[#123B75] mt-1">Waffle Cone Series</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Crunchy wafer cones lined with chocolate and filled with Butterscotch, Pista, Belgian Chocolate, Black Currant, and Vanilla.
                </p>
              </div>
              <div className="w-full h-36 flex items-center justify-center p-2 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100">
                <ProductImage
                  src="/images/products/cone/IMG-20261024-WA0126.jpg"
                  alt="Sun Relief Butterscotch Waffle Cone"
                  className="max-h-full max-w-full object-contain"
                  categoryLabel="Cone"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#E94B35] uppercase tracking-wider">02. Candies</span>
                <h4 className="font-heading font-bold text-lg text-[#123B75] mt-1">Sticks, Bars & Kulfis</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Featuring our signature Frostick crunchy chocolate bars, slow-cooked Mawa Kulfis, juicy Mango Dolly, and Chowpati Malai.
                </p>
              </div>
              <div className="w-full h-36 flex items-center justify-center p-2 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100">
                <ProductImage
                  src="/images/products/candy/IMG-20261024-WA0018.jpg"
                  alt="Sun Relief Frostick Chocolate Ice Cream Bar"
                  className="max-h-full max-w-full object-contain"
                  categoryLabel="Candy"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#E94B35] uppercase tracking-wider">03. Family Packs</span>
                <h4 className="font-heading font-bold text-lg text-[#123B75] mt-1">Family Celebration Bricks</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Signature 750ml party bricks including Kesar Pista, Mawa Malai, American Nuts, Kaju Draksh, Shahi Gulab, and Winter Cream.
                </p>
              </div>
              <div className="w-full h-36 flex items-center justify-center p-2 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100">
                <ProductImage
                  src="/images/products/family-pack/IMG-20261024-WA0006.jpg"
                  alt="Sun Relief Kesar Pista Family Celebration Brick"
                  className="max-h-full max-w-full object-contain"
                  categoryLabel="Family Pack"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#E94B35] uppercase tracking-wider">04. Premium</span>
                <h4 className="font-heading font-bold text-lg text-[#123B75] mt-1">Rajbhog & Sundae Tubs</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Gourmet tubs packed with dry fruits, saffron, and rich cream for premium celebrations and dining occasions.
                </p>
              </div>
              <div className="w-full h-36 flex items-center justify-center p-2 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100">
                <ProductImage
                  src="/images/products/premium/IMG-20261024-WA0099.jpg"
                  alt="Sun Relief Scoop into Sunshine Rajbhog Tub"
                  className="max-h-full max-w-full object-contain"
                  categoryLabel="Premium"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#E94B35] uppercase tracking-wider">05. Shrikhand</span>
                <h4 className="font-heading font-bold text-lg text-[#123B75] mt-1">Traditional Shrikhand</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Freshly prepared with pure hung curd, saffron, Alphonso mango, and cardamom in sealed hygienic consumer tubs.
                </p>
              </div>
              <div className="w-full h-36 flex items-center justify-center p-2 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100">
                <ProductImage
                  src="/images/products/shrikhand/IMG-20261024-WA0136.jpg"
                  alt="Sun Relief Authentic Mango Shrikhand"
                  className="max-h-full max-w-full object-contain"
                  categoryLabel="Shrikhand"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="bg-[#123B75] p-6 rounded-2xl text-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F5C542] uppercase tracking-wider">Commercial</span>
                <h4 className="font-heading font-bold text-lg text-white mt-1">Ready to Partner?</h4>
                <p className="text-xs text-slate-200 leading-relaxed mt-1">
                  We supply supermarkets, grocery stores, wedding caterers, and parlour outlets across Gujarat.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('distribution')}
                  className="w-full px-4 py-2.5 bg-[#F5C542] hover:bg-[#fad875] text-[#123B75] text-xs font-bold rounded-full text-center transition-all cursor-pointer shadow-xs"
                >
                  Explore Distributorship →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Commitment to Quality & Manufacturing Safety */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35]">
              Manufacturing Discipline
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#123B75] mt-1 mb-2">
              Hygiene, Safety & Cold-Chain
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Verified food safety guidelines followed at every stage from dairy chilling to store delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-[#123B75]/10 text-[#123B75] flex items-center justify-center mx-auto mb-4">
                <Milk className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#123B75] mb-2">Pure Milk Sourcing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wholesome milk tested for fat and SNF purity, ensuring true velvety texture without watery ice crystals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-[#123B75]/10 text-[#123B75] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#123B75] mb-2">Automated Batching</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern batch freezers, continuous churners, and sealed automated flow-wrapping keep hands away from the product.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-[#123B75]/10 text-[#123B75] flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#123B75] mb-2">Sub-Zero Preservation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict -18°C cold room hardening and insulated distribution ensure products arrive fresh, crisp, and intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Clear Route to Business Partnerships CTA */}
      <section className="py-16 bg-gradient-to-r from-[#123B75] to-[#0a244b] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F5C542]">
            Connect With Our Leadership
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white leading-tight">
            Let’s Grow Together Across Gujarat
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Whether you are interested in distribution routes, opening a franchise parlour, or procuring ice cream
            for events, our team is ready to assist you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('distribution')}
              className="px-6 py-3 rounded-full bg-[#F5C542] hover:bg-[#fad875] text-[#123B75] font-semibold text-sm transition-all cursor-pointer"
            >
              Distributor Enquiries
            </button>
            <button
              onClick={() => onNavigate('franchise')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all cursor-pointer"
            >
              Franchise Formats
            </button>
            <button
              onClick={() => {
                window.open(
                  buildWhatsAppUrl('Hello Sun Relief Ice Cream, I would like to connect with your team.'),
                  '_blank'
                );
              }}
              className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
