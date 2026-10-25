import React, { useState } from 'react';
import { PageId, Product, ProductCategory } from '../types';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductImage } from '../components/ProductImage';
import { PRODUCTS } from '../data/products';
import {
  formatCustomerEnquiry,
  buildWhatsAppUrl,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
} from '../utils/whatsapp';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
  Store,
  MessageCircle,
  Milk,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, category?: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  // Customer quick enquiry form state
  const [custName, setCustName] = useState('');
  const [custCity, setCustCity] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custQuestion, setCustQuestion] = useState('');
  const [formError, setFormError] = useState('');

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!custCity.trim()) {
      setFormError('Please enter your city or town.');
      return;
    }
    if (!custQuestion.trim()) {
      setFormError('Please enter your product question or enquiry.');
      return;
    }

    setFormError('');
    const msg = formatCustomerEnquiry({
      name: custName,
      phone: custPhone,
      city: custCity,
      productOrQuestion: custQuestion,
    });
    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  // Categories list
  const categories: {
    category: ProductCategory;
    name: string;
    subtitle: string;
    image: string;
    badge: string;
    count: string;
  }[] = [
    {
      category: 'cone',
      name: 'Waffle Cones',
      subtitle: 'Crispy baked cones with rich swirls & chocolate tips',
      image: '/images/products/cone/IMG-20261024-WA0126.jpg',
      badge: '5 Flavours',
      count: 'Butterscotch, Pista, Choco, Berry & Crunch',
    },
    {
      category: 'candy',
      name: 'Ice Candy & Sticks',
      subtitle: 'Frostick, pure mawa kulfi, and real fruit mango dolly',
      image: '/images/products/candy/IMG-20261024-WA0018.jpg',
      badge: '17+ Varieties',
      count: 'Chocobars, Kulfis & Fruit Bars',
    },
    {
      category: 'family-pack',
      name: 'Family Party Packs',
      subtitle: 'Rich 750ml celebration bricks for every gathering',
      image: '/images/products/family-pack/IMG-20261024-WA0006.jpg',
      badge: 'Party Bricks',
      count: 'Kesar Pista, Mawa Malai, American Nuts & more',
    },
    {
      category: 'premium',
      name: 'Premium Ice Cream',
      subtitle: 'Indulgent gourmet Rajbhog tubs and layered sundaes',
      image: '/images/products/premium/IMG-20261024-WA0099.jpg',
      badge: 'Gourmet Tubs',
      count: 'Rajbhog, Roasted Badam & Sundae Cups',
    },
    {
      category: 'shrikhand',
      name: 'Authentic Shrikhand',
      subtitle: 'Fresh strained curd with real Alphonso mango & cardamom',
      image: '/images/products/shrikhand/IMG-20261024-WA0136.jpg',
      badge: 'Gujarati Heritage',
      count: 'Mango & Elaichi Festive Tubs',
    },
  ];

  // Featured 6 popular products
  const featuredProducts = PRODUCTS.filter((p) => p.isPopular).slice(0, 6);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Exact Reelmark Hero Carousel Component */}
      <HeroCarousel
        onExploreProducts={() => onNavigate('products')}
        onBecomeDistributor={() => onNavigate('distribution')}
      />

      {/* 2. Brand Trust Pillars Bar */}
      <section className="bg-[#123B75] text-white py-6 border-y border-[#F5C542]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#F5C542]/20 border border-[#F5C542] flex items-center justify-center shrink-0">
                <Milk className="w-5 h-5 text-[#F5C542]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">100% Pure Milk Base</h4>
                <p className="text-xs text-slate-300">Rich wholesome dairy solids</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#F5C542]/20 border border-[#F5C542] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-[#F5C542]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Family Celebration Packs</h4>
                <p className="text-xs text-slate-300">Rich 750ml party bricks</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#F5C542]/20 border border-[#F5C542] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#F5C542]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Cold-Chain Assured</h4>
                <p className="text-xs text-slate-300">Sub-zero fleet logistics</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#F5C542]/20 border border-[#F5C542] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#F5C542]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Gujarat Craftsmanship</h4>
                <p className="text-xs text-slate-300">Hygienic manufacturing in Surat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Product Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35]">
              Flavour Collections
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#123B75] mt-2 mb-3">
              Explore Every Craving
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              From crunchy sticks to grand celebration family packs and traditional Gujarati sweets,
              discover ice cream crafted to bring pure joy to every moment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat, idx) => (
              <div
                key={cat.category}
                onClick={() => onNavigate('products', cat.category)}
                className={`group relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Background soft color splash */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#F8DCE8]/50 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4 z-10">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#123B75] text-white">
                    {cat.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#E94B35] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Range <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Real Product Image Showcase */}
                <div className="w-full h-52 flex items-center justify-center p-2 my-2 z-10">
                  <ProductImage
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md"
                  />
                </div>

                {/* Info Text */}
                <div className="z-10 pt-3 border-t border-slate-100">
                  <h3 className="font-heading font-bold text-xl text-[#123B75] group-hover:text-[#E94B35] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {cat.subtitle}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 mt-2">
                    {cat.count}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#123B75] hover:bg-[#0a244b] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>View Complete 40+ Product Catalogue</span>
              <ArrowRight className="w-4 h-4 text-[#F5C542]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Brand Introduction & Gujarat Heritage */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFDF9] via-[#FEF7EC] to-[#FFFDF9] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C542]/30 border border-[#F5C542] text-[#123B75] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage • Surat, Gujarat</span>
              </div>

              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#123B75] tracking-tight leading-tight">
                Crafted with Pure Milk Base and Authentic Indian Taste.
              </h2>

              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Sun Relief Ice Cream was founded with one clear passion: to bring genuine dairy indulgence,
                wholesome rich milk cream, and beloved regional Gujarati flavours to families and ice cream lovers
                across Gujarat.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#E94B35] font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pure Dairy Goodness</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Crafted from authentic pasteurized milk solids and pure cream for that authentic dense texture.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#123B75] font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>Family Celebration Value</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Generous 750ml family celebration packs created so everyone can enjoy pure dairy delight.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-full bg-[#123B75] hover:bg-[#0a244b] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                >
                  Read Our Story
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-full bg-white text-[#123B75] border-2 border-[#123B75]/25 hover:border-[#123B75] font-semibold text-sm transition-all cursor-pointer"
                >
                  Contact Factory & Sales
                </button>
              </div>
            </div>

            {/* Right Visual Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white p-6 md:p-8 border border-[#123B75]/15 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5C542]/30 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E94B35]">
                    Signature Pack Highlight
                  </span>
                  <span className="text-[11px] font-semibold bg-[#F5C542] text-[#123B75] px-2.5 py-0.5 rounded-full">
                    750ml Brick
                  </span>
                </div>

                <div className="w-full h-64 flex items-center justify-center p-3">
                  <ProductImage
                    src="/images/products/family-pack/IMG-20261024-WA0006.jpg"
                    alt="Kesar Pista Family Pack"
                    className="max-h-full max-w-full object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="font-heading font-bold text-lg text-[#123B75]">
                    Kesar Pista Celebration Brick
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Authentic Kashmiri saffron aroma with chopped pistachios in thick dairy cream.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      100% Vegetarian • FSSAI Assured
                    </span>
                    <button
                      onClick={() => onNavigate('products', 'family-pack')}
                      className="text-xs font-bold text-[#E94B35] hover:underline cursor-pointer"
                    >
                      Explore Packs →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Highlights (Featured 6 items) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35]">
                Bestsellers & Favourites
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#123B75] mt-1">
                Featured Product Highlights
              </h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-sm font-semibold text-[#123B75] hover:text-[#E94B35] flex items-center gap-1 group cursor-pointer"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Area */}
                <div className="relative bg-gradient-to-b from-slate-50 to-white p-6 h-64 flex items-center justify-center border-b border-slate-100">
                  {p.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-[#F5C542] text-[#123B75] shadow-2xs">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {p.categoryLabel}
                  </span>
                  <ProductImage
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm cursor-pointer"
                    onClick={() => onSelectProduct(p)}
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(p)}
                      className="font-heading font-bold text-lg text-[#123B75] group-hover:text-[#E94B35] transition-colors cursor-pointer"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                    {p.highlight && (
                      <p className="text-[11px] font-medium text-[#123B75] mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E94B35]" />
                        {p.highlight}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-[#123B75] bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-center cursor-pointer"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => {
                        const url = buildWhatsAppUrl(
                          `Hello Sun Relief Ice Cream, I am enquiring about ${p.name} (${p.categoryLabel}). Please share details.`
                        );
                        window.open(url, '_blank');
                      }}
                      className="py-2 px-3 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-full transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dual Commercial Opportunities (Distribution & Franchise) */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Distributor Partnership */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#123B75] to-[#0c274e] text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5C542]/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5C542] text-[#123B75] flex items-center justify-center mb-5 shadow-sm">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#F5C542]">
                  Wholesale & Supply
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl mt-1 mb-3 text-white">
                  Become a Sun Relief Distributor
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Expand your FMCG and frozen dairy portfolio with high-demand candy sticks,
                  crunchy cones, generous celebration bricks, and traditional shrikhand across Gujarat and beyond.
                </p>
                <ul className="space-y-2 text-xs text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>Attractive route margins & strong consumer repeat demand</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>Reliable scheduled cold-chain delivery from Sayan/Surat plant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C542]" />
                    <span>POS materials, promotional banners and retailer launch support</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('distribution')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F5C542] hover:bg-[#fad875] text-[#123B75] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for Distributorship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Box 2: Franchise & Parlour Partnership */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-white to-[#FDF8F3] border-2 border-[#123B75]/15 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F8DCE8]/50 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E94B35] text-white flex items-center justify-center mb-5 shadow-sm">
                  <Store className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35]">
                  Retail & Scooping Parlour
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl mt-1 mb-3 text-[#123B75]">
                  Start a Sun Relief Ice Cream Parlour
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Open a high-footfall ice cream parlour or retail kiosk in your city. Offer cones, sundaes,
                  sticks, and party packs with brand signage and complete equipment guidance.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E94B35]" />
                    <span>Flexible formats: Kiosks, High-Street Parlours, Deep Freezer Dealers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E94B35]" />
                    <span>Complete menu planning, flavour rotation and display branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E94B35]" />
                    <span>Direct WhatsApp enquiry flow with Maruti Marketing team</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('franchise')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#123B75] hover:bg-[#0a244b] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Franchise Formats</span>
                  <ArrowRight className="w-4 h-4 text-[#F5C542]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Quick Customer Enquiry Call-To-Action Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#FFFBF5] via-[#FFF9F0] to-white rounded-3xl p-8 md:p-12 border border-[#F5C542]/40 shadow-xl relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E94B35] bg-[#F8DCE8] px-3 py-1 rounded-full">
                Instant WhatsApp Connection
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#123B75] mt-3 mb-2">
                Have a Question or Looking for Flavours?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Send us a direct WhatsApp message. Our customer and sales team will assist you with
                flavour availability, bulk orders, and local stockists.
              </p>
            </div>

            <form onSubmit={handleCustomerSubmit} className="space-y-4 max-w-xl mx-auto">
              {formError && (
                <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surat, Navsari, Bharuch"
                    value={custCity}
                    onChange={(e) => setCustCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product or Question Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Which flavours are you inquiring about? Bulk order for an event, party pack availability, or local stores?"
                  value={custQuestion}
                  onChange={(e) => setCustQuestion(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send WhatsApp Message to Sun Relief</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Prepares message for +91 95588 83147. You review and click Send in WhatsApp.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
