export type PropertyType = 
  | 'all' 
  | 'villa' 
  | 'residence' 
  | 'penthouse' 
  | 'apartment' 
  | 'mansion' 
  | 'commercial';

export type PropertyStatus = 'all' | 'sale' | 'rent';

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  whatsapp: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  completedDeals: number;
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  type: PropertyType;
  status: 'sale' | 'rent';
  priceTRY: number;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  livingRooms: number;
  bathrooms: number;
  areaSqM: number;
  floor: number | string;
  totalFloors: number;
  buildingAge: number | string;
  heatingType: string;
  hasBalcony: boolean;
  isFurnished: boolean;
  hasPool: boolean;
  parkingSpaces: number;
  duesTRY: number;
  images: string[];
  featuredImage: string;
  description: string;
  features: string[];
  nearbyPerks: {
    metro?: string;
    coast?: string;
    airport?: string;
    school?: string;
    hospital?: string;
    mall?: string;
  };
  agent: Agent;
  isFeatured?: boolean;
  isHotDeal?: boolean;
  isNew?: boolean;
  virtualTourAvailable?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  dateListed: string;
}

export interface PropertyFilterState {
  searchQuery: string;
  status: PropertyStatus;
  type: PropertyType;
  city: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

export type Currency = 'TRY' | 'USD' | 'EUR';
export type Theme = 'dark' | 'light';

export interface LocationHighlight {
  id: string;
  name: string;
  city: string;
  tag: string;
  count: number;
  avgPrice: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  propertyPurchased: string;
  date: string;
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  message: string;
  propertyTitle?: string;
  propertyId?: string;
}
