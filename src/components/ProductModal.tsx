import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { buildWhatsAppUrl, formatProductSpecificEnquiry } from '../utils/whatsapp';
import { ProductImage } from './ProductImage';
import { X, MessageCircle, Check, MapPin, User, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const enquiryMessage = formatProductSpecificEnquiry(
    product.name,
    product.categoryLabel,
    userName,
    userCity
  );

  const handleSendWhatsApp = () => {
    const url = buildWhatsAppUrl(enquiryMessage);
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(enquiryMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 bg-gradient-to-b from-[#FFFDF9] via-[#FEF6EE] to-white p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-100">
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#F5C542] text-[#123B75] shadow-xs">
              {product.badge}
            </span>
          )}
          <div className="w-full h-64 md:h-80 flex items-center justify-center p-2">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              priority={true}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-xs font-semibold text-[#123B75] uppercase tracking-wider bg-[#F8DCE8] px-3 py-1 rounded-full">
              {product.categoryLabel}
            </span>
            {product.packaging && (
              <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
                Pack: {product.packaging}
              </p>
            )}
          </div>
        </div>

        {/* Product Details & WhatsApp Quick Form */}
        <div className="md:w-1/2 p-6 md:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#E94B35] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sun Relief Authentic Quality</span>
            </div>

            <h2 id="product-modal-title" className="font-heading font-bold text-2xl text-[#123B75] mb-2 leading-tight">
              {product.name}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {product.description}
            </p>

            {product.highlight && (
              <div className="p-3 bg-[#FEF3C7]/60 border border-[#F5C542]/40 rounded-xl mb-4 text-xs font-medium text-[#123B75]">
                <span className="font-bold">Key Note: </span>
                {product.highlight}
              </div>
            )}

            {/* Quick Prefill Inputs */}
            <div className="space-y-2.5 pt-1 mb-5">
              <label className="block text-xs font-semibold text-slate-700">
                Customise WhatsApp Enquiry (Optional):
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#123B75] transition-colors"
                />
              </div>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Your City / Town (e.g. Surat, Ahmedabad)"
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#123B75] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2 px-3 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Message Copied!</span>
                </>
              ) : (
                <span>Copy Message to Clipboard</span>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Opens WhatsApp directly with prefilled details. You review before sending.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
