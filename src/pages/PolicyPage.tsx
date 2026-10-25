import React, { useState } from 'react';
import { PageId } from '../types';
import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
} from '../utils/whatsapp';
import { ShieldCheck, FileText, Handshake, ArrowLeft } from 'lucide-react';

interface PolicyPageProps {
  initialPolicy?: 'privacy' | 'terms' | 'distributor-terms';
  onNavigate: (page: PageId) => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({
  initialPolicy = 'privacy',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'distributor-terms'>(
    initialPolicy
  );

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-24">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF9F2] to-[#FAFAFA] py-14 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123B75] hover:text-[#E94B35] mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#123B75] tracking-tight">
            Policies & Commercial Terms
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Sun Relief Ice Cream (Operated by Maruti Marketing, Sayan, Surat, Gujarat).
          </p>

          {/* Policy Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-2">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'privacy'
                  ? 'bg-[#123B75] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'terms'
                  ? 'bg-[#123B75] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms & Conditions</span>
            </button>

            <button
              onClick={() => setActiveTab('distributor-terms')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'distributor-terms'
                  ? 'bg-[#123B75] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Handshake className="w-3.5 h-3.5" />
              <span>Distributor & Franchise Terms</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Policy Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm leading-relaxed text-sm text-slate-700 space-y-6">
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#123B75] mb-1">
                  Privacy Policy
                </h2>
                <p className="text-xs text-slate-400">
                  Last updated: October 2026
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  1. Static Website Architecture & No Database Storage
                </h3>
                <p>
                  This website is a static information portal operated for Sun Relief Ice Cream by Maruti Marketing.
                  We do <strong>not</strong> collect, process, or store personal visitor details, submitted inquiries, or passwords
                  in any centralized backend server or user database through this website.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  2. How Inquiries Work via WhatsApp
                </h3>
                <p>
                  All forms on this website (Customer Inquiries, Distributor Inquiries, Franchise Inquiries, and Product Inquiries)
                  function solely as client-side text formatting utilities. When you click “Send on WhatsApp”, the website creates
                  a standard <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">wa.me</code> hyperlink that opens your WhatsApp
                  messenger application with the text pre-populated.
                </p>
                <p>
                  No communication occurs until you actively review and press “Send” inside WhatsApp. Once you communicate over WhatsApp,
                  WhatsApp’s own Privacy Policy and Terms of Service govern the transmission of that message.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  3. Cookies & Analytical Scripts
                </h3>
                <p>
                  We do not deploy intrusive third-party behavioral trackers, marketing pixels, or advertising cookie engines.
                  Standard technical session cookies may be utilized by modern web browsers to preserve display preferences and viewport state.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  4. Contact For Privacy Matters
                </h3>
                <p>
                  If you have any questions regarding your communications with our brand, please reach out directly:
                </p>
                <ul className="text-xs space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <li><strong>Entity:</strong> Maruti Marketing (Sun Relief Ice Cream)</li>
                  <li><strong>Address:</strong> {BUSINESS_ADDRESS}</li>
                  <li><strong>Phone:</strong> {BUSINESS_PHONE}</li>
                  <li><strong>Email:</strong> {BUSINESS_EMAIL}</li>
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#123B75] mb-1">
                  Terms & Conditions
                </h2>
                <p className="text-xs text-slate-400">
                  Last updated: October 2026
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  1. Informational Purpose Only
                </h3>
                <p>
                  This website is provided exclusively for general informational and marketing purposes concerning the ice cream
                  and frozen dessert products manufactured and marketed under the brand <strong>Sun Relief Ice Cream</strong> by Maruti Marketing.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  2. No Online Ordering or Payment Processing
                </h3>
                <p>
                  This website does not provide direct online ordering, checkout, or monetary transaction gateways. Any pricing,
                  product availability, or packaging details communicated verbally or via WhatsApp are subject to confirmation at the
                  time of physical order placement with our sales representative or distributor.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  3. Intellectual Property
                </h3>
                <p>
                  The brand name <strong>Sun Relief Ice Cream</strong>, trademark packaging visuals, product labels (including Frostick,
                  Mawa Kulfi, Mango Dolly, Chocobar, Rajbhog, and Shrikhand designs), and custom typography/illustrations are the property
                  of Maruti Marketing. Reproduction without prior written authorization is prohibited.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  4. Jurisdiction
                </h3>
                <p>
                  Any dispute related to the brand, supply agreements, or manufacturing claims shall be subject to the exclusive
                  jurisdiction of the competent courts in Surat district, Gujarat, India.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'distributor-terms' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#123B75] mb-1">
                  Distributor & Franchise Enquiry Terms
                </h2>
                <p className="text-xs text-slate-400">
                  Guidelines for Commercial Partners
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  1. Preliminary & Non-Binding Enquiry Nature
                </h3>
                <p>
                  Submitting an enquiry via our website or via WhatsApp regarding a distributorship, wholesale agency, or parlour
                  franchise constitutes an initial expression of mutual interest only. It does <strong>not</strong> create any binding
                  commercial agreement, exclusive agency right, or contractual obligation on either party.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  2. No Guaranteed Profit or Earnings Claims
                </h3>
                <p>
                  Sun Relief Ice Cream and Maruti Marketing make no claims of guaranteed earnings, fixed return on investment (ROI),
                  or assured sales volumes. Commercial performance depends entirely on local retail location, refrigeration discipline,
                  market footfall, and partner business execution.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  3. Cold-Chain & Product Quality Responsibilities
                </h3>
                <p>
                  Prospective commercial distributors and parlour operators must maintain strict compliance with food safety and cold-chain
                  standards, ensuring ice cream products remain continuously stored at -18°C or lower to preserve consumer quality.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  4. Official Onboarding
                </h3>
                <p>
                  Formal partnership onboarding requires direct verification with management at our Sayan/Surat office,
                  signing of physical distributor terms, and verification of trade licenses/GST details.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
