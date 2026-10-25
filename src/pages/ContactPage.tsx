import React, { useState } from 'react';
import {
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_RAW,
  BUSINESS_INSTAGRAM,
  buildWhatsAppUrl,
  formatCustomerEnquiry,
} from '../utils/whatsapp';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  Clock,
  Check,
  Send,
  Navigation,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!city.trim()) {
      setError('Please provide your city or town.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your message or enquiry.');
      return;
    }

    setError('');
    const fullMessage = formatCustomerEnquiry({
      name,
      phone,
      city,
      productOrQuestion: message,
    });
    window.open(buildWhatsAppUrl(fullMessage), '_blank');
  };

  const handleCopy = () => {
    if (!name.trim() || !message.trim()) {
      setError('Please enter your name and message first.');
      return;
    }
    const fullMessage = formatCustomerEnquiry({
      name,
      phone,
      city,
      productOrQuestion: message,
    });
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapDirectionUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Dr. G. D. High School, Sayan, Olpad, Surat, Gujarat 394130'
  )}`;

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF9F2] via-[#FDF5E8] to-[#FAFAFA] py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35] bg-[#F8DCE8] px-3.5 py-1 rounded-full">
            Get in Touch
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#123B75] tracking-tight mt-3 mb-3">
            Contact Sun Relief Ice Cream
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Have a question about our flavours, party orders, route deliveries, or business partnerships?
            Our Surat team is happy to assist you.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Card: Verified Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-heading font-bold text-xl text-[#123B75] border-b border-slate-100 pb-3">
                  Confirmed Factory & Office
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E94B35]/10 text-[#E94B35] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                        Address
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mt-0.5">
                        {BUSINESS_ADDRESS}
                      </p>
                      <a
                        href={mapDirectionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#123B75] hover:text-[#E94B35] mt-1.5 cursor-pointer"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Get Directions on Google Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                        Phone & WhatsApp
                      </h4>
                      <a
                        href={`tel:+${BUSINESS_PHONE_RAW}`}
                        className="text-xs sm:text-sm text-[#123B75] font-semibold hover:underline mt-0.5 block"
                      >
                        {BUSINESS_PHONE}
                      </a>
                      <span className="text-[11px] text-slate-400">
                        Customer inquiries, distribution, and corporate desk
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#123B75]/10 text-[#123B75] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                        Email Address
                      </h4>
                      <a
                        href={`mailto:${BUSINESS_EMAIL}`}
                        className="text-xs sm:text-sm text-[#123B75] font-semibold hover:underline mt-0.5 block"
                      >
                        {BUSINESS_EMAIL}
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                        Instagram
                      </h4>
                      <a
                        href={BUSINESS_INSTAGRAM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-pink-700 font-semibold hover:underline mt-0.5 block"
                      >
                        @sun_relief_ice_cream
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                        Operating Hours
                      </h4>
                      <p className="text-xs text-slate-700 mt-0.5">
                        Monday – Saturday: 9:00 AM – 8:00 PM IST
                      </p>
                      <p className="text-[11px] text-slate-400">
                        WhatsApp inquiries welcome anytime; responses sent during business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="bg-gradient-to-r from-[#25D366]/15 via-emerald-50 to-white rounded-3xl p-6 border border-[#25D366]/30 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    Chat Directly on WhatsApp
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Fastest way to reach our sales team.
                  </p>
                </div>
                <button
                  onClick={() => {
                    window.open(
                      buildWhatsAppUrl('Hello Sun Relief Ice Cream, I am reaching out from your website.'),
                      '_blank'
                    );
                  }}
                  className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Start Chat</span>
                </button>
              </div>
            </div>

            {/* Right Card: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#123B75]">
                    Fast Message Generator
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-[#123B75] mt-1 mb-1">
                    Send Us an Enquiry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill out the form below. Once you click Submit, your message will be prepared in WhatsApp
                    where you can review and click Send.
                  </p>
                </div>

                {error && (
                  <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ankit Patel"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98980 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Location in Gujarat or India *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Surat, Bardoli, Ankleshwar, Vapi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message / Enquiry Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you are looking for (e.g. Flavour availability, bulk catering orders, retailer freezer setup, general enquiry)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#123B75] bg-slate-50/50 resize-none"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Prepare & Send on WhatsApp</span>
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>No database storage • Sent manually via your WhatsApp</span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="text-[#123B75] hover:underline font-semibold cursor-pointer"
                      >
                        {copied ? 'Copied to Clipboard!' : 'Copy Text'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
