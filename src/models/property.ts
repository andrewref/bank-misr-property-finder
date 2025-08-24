export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square feet
  images: string[];
  features: string[];
  yearBuilt?: number;
  parking?: number;
  furnished: boolean;
  dateAdded: Date;
  agent?: PropertyAgent;
}

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  VILLA = 'villa',
  STUDIO = 'studio',
  COMMERCIAL = 'commercial'
}

export enum PropertyStatus {
  FOR_SALE = 'for_sale',
  FOR_RENT = 'for_rent',
  SOLD = 'sold',
  RENTED = 'rented'
}

export interface PropertyAgent {
  id: number;
  name: string;
  phone: string;
  email: string;
  company?: string;
}

export interface PropertyFilter {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
  status?: PropertyStatus;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  furnished?: boolean;
  parking?: boolean;
}
