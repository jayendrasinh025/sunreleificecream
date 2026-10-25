import { CustomerEnquiryData, DistributorEnquiryData, FranchiseEnquiryData } from '../types';

export const BUSINESS_PHONE = '+91 95588 83147';
export const BUSINESS_PHONE_RAW = '919558883147';
export const BUSINESS_EMAIL = 'sunrelieficecream@gmail.com';
export const BUSINESS_INSTAGRAM = 'https://www.instagram.com/sun_relief_ice_cream/';
export const BUSINESS_ADDRESS = '97 A, Aambawadi, near Dr. G. D. High School, Sayan, Olpad, Surat, Gujarat – 394130';

/**
 * Creates properly formatted & URL-encoded WhatsApp links
 */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${BUSINESS_PHONE_RAW}?text=${encoded}`;
}

export function formatCustomerEnquiry(data: CustomerEnquiryData): string {
  const name = data.name.trim();
  const city = data.city.trim();
  const details = data.productOrQuestion.trim();
  const phone = data.phone?.trim();

  let msg = `Hello Sun Relief Ice Cream, I have a product enquiry.\n\nName: ${name}\nCity: ${city}\nProduct/question: ${details}`;
  if (phone) {
    msg += `\nPhone: ${phone}`;
  }
  msg += `\n\nPlease share more information.`;
  return msg;
}

export function formatDistributorEnquiry(data: DistributorEnquiryData): string {
  const name = data.name.trim();
  const business = data.businessName.trim();
  const location = data.cityAndState.trim();
  const phone = data.phone.trim();
  const coldStorage = data.coldStorage;
  const notes = data.additionalNotes?.trim();

  let msg = `Hello Sun Relief Ice Cream, I am interested in becoming a distributor.\n\nName: ${name}\nBusiness: ${business}\nLocation: ${location}\nCold-storage availability: ${coldStorage}\nContact: ${phone}`;
  if (notes) {
    msg += `\nAdditional notes: ${notes}`;
  }
  msg += `\n\nPlease share the distribution requirements.`;
  return msg;
}

export function formatFranchiseEnquiry(data: FranchiseEnquiryData): string {
  const name = data.name.trim();
  const phone = data.phone.trim();
  const city = data.preferredCity.trim();
  const range = data.investmentRange.trim();
  const notes = data.additionalNotes?.trim();

  let msg = `Hello Sun Relief Ice Cream, I am interested in a franchise opportunity.\n\nName: ${name}\nPreferred location: ${city}\nInvestment range: ${range}\nContact: ${phone}`;
  if (notes) {
    msg += `\nExperience/notes: ${notes}`;
  }
  msg += `\n\nPlease share the available options and requirements.`;
  return msg;
}

export function formatProductSpecificEnquiry(productName: string, category: string, customerName?: string, city?: string): string {
  let msg = `Hello Sun Relief Ice Cream, I am interested in your ${productName} (${category}).`;
  if (customerName) {
    msg += `\nName: ${customerName.trim()}`;
  }
  if (city) {
    msg += `\nCity: ${city.trim()}`;
  }
  msg += `\n\nPlease share more details regarding packaging, availability, and ordering.`;
  return msg;
}
