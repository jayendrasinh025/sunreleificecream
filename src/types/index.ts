export type ProductCategory = 'all' | 'candy' | 'cone' | 'family-pack' | 'premium' | 'shrikhand';

export interface Product {
  id: string;
  name: string;
  category: 'candy' | 'cone' | 'family-pack' | 'premium' | 'shrikhand';
  categoryLabel: string;
  description: string;
  image: string;
  badge?: string;
  highlight?: string;
  packaging?: string;
  isPopular?: boolean;
}

export type PageId = 'home' | 'about' | 'products' | 'distribution' | 'franchise' | 'contact' | 'privacy' | 'terms' | 'distributor-terms';

export interface CustomerEnquiryData {
  name: string;
  phone?: string;
  city: string;
  productOrQuestion: string;
}

export interface DistributorEnquiryData {
  name: string;
  businessName: string;
  cityAndState: string;
  phone: string;
  coldStorage: 'Yes' | 'No' | 'Need guidance';
  additionalNotes?: string;
}

export interface FranchiseEnquiryData {
  name: string;
  phone: string;
  preferredCity: string;
  investmentRange: string;
  additionalNotes?: string;
}
