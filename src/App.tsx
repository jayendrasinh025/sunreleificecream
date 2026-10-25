import React, { useState, useEffect } from 'react';
import { PageId, Product, ProductCategory } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { DistributionPage } from './pages/DistributionPage';
import { FranchisePage } from './pages/FranchisePage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { buildWhatsAppUrl, BUSINESS_PHONE } from './utils/whatsapp';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync hash for easy back/forward browser navigation & deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'products',
        'distribution',
        'franchise',
        'contact',
        'privacy',
        'terms',
        'distributor-terms',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: PageId, category?: ProductCategory) => {
    setCurrentPage(page);
    window.location.hash = page;
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDirectWhatsApp = () => {
    window.open(
      buildWhatsAppUrl('Hello Sun Relief Ice Cream, I would like to enquire about your products and services.'),
      '_blank'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#F5C542] selection:text-[#123B75]">
      {/* Header */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            initialCategory={selectedCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentPage === 'distribution' && (
          <DistributionPage onNavigate={navigateTo} />
        )}

        {currentPage === 'franchise' && (
          <FranchisePage onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {(currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'distributor-terms') && (
          <PolicyPage initialPolicy={currentPage} onNavigate={navigateTo} />
        )}
      </main>

      {/* Product Modal Preview */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Floating Action Utilities: Scroll to Top & WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white text-[#123B75] border border-slate-200 shadow-md hover:bg-slate-50 flex items-center justify-center transition-all pointer-events-auto cursor-pointer animate-in fade-in zoom-in-75"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating WhatsApp Quick Action Button */}
        <button
          onClick={handleOpenDirectWhatsApp}
          className="group relative flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-300 pointer-events-auto cursor-pointer"
          aria-label="Chat on WhatsApp with Sun Relief Ice Cream"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-5 h-5 fill-white shrink-0" />
          <span className="text-xs font-bold whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </button>
      </div>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
