import React, { useState } from 'react';
import { PageId } from '../types';
import { BrandLogo } from './BrandLogo';
import { Menu, X, MessageSquare, PhoneCall } from 'lucide-react';
import { BUSINESS_PHONE } from '../utils/whatsapp';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'distribution', label: 'Distribution' },
    { id: 'franchise', label: 'Franchise' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none cursor-pointer group"
          >
            <BrandLogo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-[#123B75] font-semibold'
                      : 'text-slate-600 hover:text-[#123B75]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#E94B35] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('distribution')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#123B75] bg-[#F5C542]/30 hover:bg-[#F5C542] rounded-full border border-[#123B75]/20 transition-all duration-200 cursor-pointer"
            >
              Become a Distributor
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#123B75] hover:bg-[#0a244b] rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#F5C542]" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="p-2 text-[#123B75] bg-[#F5C542]/30 rounded-full"
              aria-label="Contact quick link"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#123B75] hover:bg-slate-100 rounded-xl focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 text-base rounded-xl font-medium transition-colors ${
                    isActive
                      ? 'bg-[#123B75]/10 text-[#123B75] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('distribution')}
              className="w-full py-3 text-center text-sm font-semibold text-[#123B75] bg-[#F5C542] rounded-xl shadow-xs"
            >
              Become a Distributor
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-[#123B75] rounded-xl shadow-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#F5C542]" />
              <span>Contact Us</span>
            </button>
            <div className="text-center text-xs text-slate-500 pt-1 flex items-center justify-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Support: {BUSINESS_PHONE}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
