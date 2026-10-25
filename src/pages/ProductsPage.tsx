import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ProductImage } from '../components/ProductImage';
import { Search, Sparkles, MessageCircle, Eye, Tag, Filter } from 'lucide-react';

interface ProductsPageProps {
  initialCategory?: ProductCategory;
  onSelectProduct: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory = 'all',
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Flavours', count: PRODUCTS.length },
    { id: 'cone', label: 'Cones', count: PRODUCTS.filter((p) => p.category === 'cone').length },
    { id: 'candy', label: 'Candy & Sticks', count: PRODUCTS.filter((p) => p.category === 'candy').length },
    { id: 'family-pack', label: 'Family Packs', count: PRODUCTS.filter((p) => p.category === 'family-pack').length },
    { id: 'premium', label: 'Premium Tubs', count: PRODUCTS.filter((p) => p.category === 'premium').length },
    { id: 'shrikhand', label: 'Shrikhand', count: PRODUCTS.filter((p) => p.category === 'shrikhand').length },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.highlight && p.highlight.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF9F2] via-[#FDF5E8] to-[#FAFAFA] py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5C542] text-[#123B75] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Sun Relief Catalogue • Authentic Dairy</span>
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#123B75] tracking-tight leading-tight mb-3">
            Our Products & Flavours
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore our diverse range of crispy cones, chocolate-dipped sticks, rich kulfis,
            celebration family party packs, and authentic Gujarati shrikhand.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search flavours (e.g. Kesar Pista, Frostick, Mawa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#123B75]" />
              <span className="hidden sm:inline">Filter Category:</span>
            </div>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#123B75] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-[#F5C542] text-[#123B75]' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto">
            <Tag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-800 mb-1">
              No Flavours Found
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              We couldn’t find any products matching “{searchQuery}”. Try clearing your search or picking another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 text-xs font-bold text-[#123B75] bg-[#F5C542] rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Section */}
                <div
                  onClick={() => onSelectProduct(p)}
                  className="relative bg-gradient-to-b from-slate-50 via-[#FAF7F2] to-white p-6 h-60 flex items-center justify-center cursor-pointer overflow-hidden border-b border-slate-100"
                >
                  {p.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5C542] text-[#123B75] shadow-2xs z-10">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200/70 z-10">
                    {p.categoryLabel}
                  </span>

                  <ProductImage
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-sm"
                  />

                  {/* Hover Quick Overlay */}
                  <div className="absolute inset-0 bg-[#123B75]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/90 text-[#123B75] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to view</span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(p)}
                      className="font-heading font-bold text-base text-[#123B75] group-hover:text-[#E94B35] transition-colors leading-snug cursor-pointer"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                    {p.highlight && (
                      <p className="text-[11px] font-medium text-[#123B75] mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E94B35] shrink-0" />
                        <span className="truncate">{p.highlight}</span>
                      </p>
                    )}
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer text-center"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        const url = buildWhatsAppUrl(
                          `Hello Sun Relief Ice Cream, I would like to enquire about ${p.name} (${p.categoryLabel}). Please share availability and ordering details.`
                        );
                        window.open(url, '_blank');
                      }}
                      className="py-2 px-3.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
