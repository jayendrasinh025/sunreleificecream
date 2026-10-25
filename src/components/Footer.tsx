import React from 'react';
import { PageId } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_INSTAGRAM,
  buildWhatsAppUrl,
} from '../utils/whatsapp';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const quickLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products & Flavours' },
    { id: 'distribution', label: 'Distribution Network' },
    { id: 'franchise', label: 'Franchise Opportunity' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const policyLinks: { id: PageId; label: string }[] = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'distributor-terms', label: 'Distributor & Franchise Terms' },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppDirect = () => {
    window.open(
      buildWhatsAppUrl('Hello Sun Relief Ice Cream, I am contacting you through your website.'),
      '_blank'
    );
  };

  return (
    <footer className="bg-[#0a244b] text-white border-t-4 border-[#F5C542] selection:bg-[#F5C542] selection:text-[#123B75]">
      {/* Upper Footer: Brand & Core Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo variant="light" showTagline={false} />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm pt-2">
              Sun Relief Ice Cream is a premier dairy manufacturer based in Sayan, Surat, Gujarat.
              We craft pure-milk cones, candy sticks, generous family celebration bricks, gourmet sundae tubs,
              and authentic Gujarati shrikhand with uncompromising taste and quality.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </button>
              <a
                href={BUSINESS_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-medium border border-white/15 transition-all"
              >
                <Instagram className="w-4 h-4 text-[#F5C542]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-heading font-bold text-base text-[#F5C542] tracking-wide uppercase text-xs">
              Explore Our Brand
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="hover:text-[#F5C542] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Confirmed Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading font-bold text-base text-[#F5C542] tracking-wide uppercase text-xs">
              Factory & Office Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E94B35] shrink-0 mt-1" />
                <span className="leading-snug">{BUSINESS_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5C542] shrink-0" />
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_PHONE} (WhatsApp & Calls)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5C542] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-block text-xs bg-white/10 px-3 py-1 rounded-md text-slate-300 border border-white/10">
                  Manufactured & Marketed by Maruti Marketing
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10" />

        {/* Lower Footer: Policies & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
            {policyLinks.map((p) => (
              <button
                key={p.id}
                onClick={() => handleNav(p.id)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-center">
            <span>© {new Date().getFullYear()} Sun Relief Ice Cream. All rights reserved.</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              Crafted with <Heart className="w-3 h-3 text-[#E94B35] fill-[#E94B35]" /> in Gujarat
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
