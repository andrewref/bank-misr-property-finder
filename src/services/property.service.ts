import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Property, PropertyType, PropertyStatus, PropertyFilter } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertiesSubject = new BehaviorSubject<Property[]>([]);
  public properties$ = this.propertiesSubject.asObservable();

  private mockProperties: Property[] = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      description: 'This stunning modern apartment offers the perfect blend of luxury and convenience in the heart of downtown. With floor-to-ceiling windows providing breathtaking city views, this 2-bedroom, 2-bathroom unit features an open-concept living space with hardwood floors throughout.',
      location: 'Downtown',
      address: '123 Main Street, Downtown, City 12345',
      price: 350000,
      type: PropertyType.APARTMENT,
      status: PropertyStatus.FOR_SALE,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ],
      features: ['City View', 'Modern Kitchen', 'Balcony', 'Parking', 'Gym Access'],
      yearBuilt: 2020,
      parking: 1,
      furnished: false,
      dateAdded: new Date('2024-01-15'),
      agent: {
        id: 1,
        name: 'John Smith',
        phone: '+1-555-0123',
        email: 'john.smith@realty.com',
        company: 'Premium Realty'
      }
    },
    {
      id: 2,
      title: 'Cozy Suburban House',
      description: 'Charming 3-bedroom house in a quiet suburban neighborhood, perfect for families.',
      location: 'Suburbia',
      address: '456 Oak Lane, Suburbia',
      price: 2500,
      type: PropertyType.HOUSE,
      status: PropertyStatus.FOR_RENT,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
      features: ['Garden', 'Garage', 'Updated Kitchen', 'Fireplace'],
      yearBuilt: 2015,
      parking: 2,
      furnished: false,
      dateAdded: new Date('2024-01-20')
    },
    {
      id: 3,
      title: 'Luxury Waterfront Villa',
      description: 'Spectacular waterfront villa with panoramic ocean views. This 4-bedroom, 3-bathroom luxury home features a private pool, marble floors, and premium finishes throughout.',
      location: 'Waterfront',
      address: '789 Ocean Drive, Waterfront District',
      price: 850000,
      type: PropertyType.VILLA,
      status: PropertyStatus.FOR_SALE,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
      ],
      features: ['Ocean View', 'Private Pool', 'Marble Floors', 'Wine Cellar', 'Home Theater'],
      yearBuilt: 2018,
      parking: 3,
      furnished: true,
      dateAdded: new Date('2024-01-10'),
      agent: {
        id: 2,
        name: 'Sarah Johnson',
        phone: '+1-555-0456',
        email: 'sarah.johnson@luxuryrealty.com',
        company: 'Luxury Properties Inc'
      }
    },
    {
      id: 4,
      title: 'Contemporary Condo',
      description: 'Stylish 1-bedroom condo in the trendy arts district. Perfect for young professionals with modern amenities and walkable lifestyle.',
      location: 'Arts District',
      address: '321 Creative Street, Arts District',
      price: 1800,
      type: PropertyType.CONDO,
      status: PropertyStatus.FOR_RENT,
      bedrooms: 1,
      bathrooms: 1,
      area: 750,
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
      features: ['City View', 'Rooftop Terrace', 'Gym', 'Concierge', 'Pet Friendly'],
      yearBuilt: 2021,
      parking: 1,
      furnished: true,
      dateAdded: new Date('2024-01-25'),
      agent: {
        id: 3,
        name: 'Michael Chen',
        phone: '+1-555-0789',
        email: 'michael.chen@modernliving.com',
        company: 'Modern Living Realty'
      }
    },
    {
      id: 5,
      title: 'Spacious Family Townhouse',
      description: 'Beautiful 3-bedroom townhouse with attached garage and private backyard. Located in family-friendly neighborhood with excellent schools.',
      location: 'Riverside',
      address: '654 Maple Avenue, Riverside',
      price: 425000,
      type: PropertyType.TOWNHOUSE,
      status: PropertyStatus.FOR_SALE,
      bedrooms: 3,
      bathrooms: 2,
      area: 2100,
      images: ['https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800'],
      features: ['Private Yard', 'Attached Garage', 'Updated Kitchen', 'Hardwood Floors', 'Central Air'],
      yearBuilt: 2012,
      parking: 2,
      furnished: false,
      dateAdded: new Date('2024-01-22'),
      agent: {
        id: 4,
        name: 'Emily Rodriguez',
        phone: '+1-555-0321',
        email: 'emily.rodriguez@familyhomes.com',
        company: 'Family Homes Realty'
      }
    },
    {
      id: 6,
      title: 'Downtown Studio Loft',
      description: 'Trendy studio loft in converted warehouse. High ceilings, exposed brick, and industrial charm in the heart of downtown.',
      location: 'Downtown',
      address: '987 Industrial Way, Downtown',
      price: 1400,
      type: PropertyType.STUDIO,
      status: PropertyStatus.FOR_RENT,
      bedrooms: 0,
      bathrooms: 1,
      area: 650,
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      features: ['Exposed Brick', 'High Ceilings', 'Loft Style', 'Walk to Work', 'Art District'],
      yearBuilt: 2019,
      parking: 0,
      furnished: false,
      dateAdded: new Date('2024-01-28'),
      agent: {
        id: 5,
        name: 'David Kim',
        phone: '+1-555-0654',
        email: 'david.kim@urbanlofts.com',
        company: 'Urban Lofts Realty'
      }
    }
  ];

  constructor() {
    // Ensure data is always available
    this.propertiesSubject.next([...this.mockProperties]);
  }

  getProperties(): Observable<Property[]> {
    // Return a copy of the mock properties to prevent mutation
    return of([...this.mockProperties]);
  }

  getPropertyById(id: number): Observable<Property | undefined> {
    const property = this.mockProperties.find(p => p.id === id);
    return of(property).pipe(delay(300));
  }

  searchProperties(filter: PropertyFilter): Observable<Property[]> {
    let filteredProperties = [...this.mockProperties];

    // Location search (search in location and address)
    if (filter.location && filter.location.trim()) {
      const searchTerm = filter.location.toLowerCase().trim();
      filteredProperties = filteredProperties.filter(p => 
        p.location.toLowerCase().includes(searchTerm) ||
        p.address.toLowerCase().includes(searchTerm) ||
        p.title.toLowerCase().includes(searchTerm)
      );
    }

    // Property type filter
    if (filter.type) {
      filteredProperties = filteredProperties.filter(p => p.type === filter.type);
    }

    // Property status filter
    if (filter.status) {
      filteredProperties = filteredProperties.filter(p => p.status === filter.status);
    }

    // Price range filters
    if (filter.minPrice !== undefined && filter.minPrice > 0) {
      filteredProperties = filteredProperties.filter(p => p.price >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined && filter.maxPrice > 0) {
      filteredProperties = filteredProperties.filter(p => p.price <= filter.maxPrice!);
    }

    // Bedroom filters
    if (filter.minBedrooms !== undefined && filter.minBedrooms > 0) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= filter.minBedrooms!);
    }

    if (filter.maxBedrooms !== undefined && filter.maxBedrooms > 0) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms <= filter.maxBedrooms!);
    }

    // Bathroom filters
    if (filter.minBathrooms !== undefined && filter.minBathrooms > 0) {
      filteredProperties = filteredProperties.filter(p => p.bathrooms >= filter.minBathrooms!);
    }

    if (filter.maxBathrooms !== undefined && filter.maxBathrooms > 0) {
      filteredProperties = filteredProperties.filter(p => p.bathrooms <= filter.maxBathrooms!);
    }

    // Area filters
    if (filter.minArea !== undefined && filter.minArea > 0) {
      filteredProperties = filteredProperties.filter(p => p.area >= filter.minArea!);
    }

    if (filter.maxArea !== undefined && filter.maxArea > 0) {
      filteredProperties = filteredProperties.filter(p => p.area <= filter.maxArea!);
    }

    // Furnished filter
    if (filter.furnished !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.furnished === filter.furnished);
    }

    // Parking filter
    if (filter.parking !== undefined) {
      if (filter.parking) {
        // If parking is required, filter for properties with parking > 0
        filteredProperties = filteredProperties.filter(p => p.parking && p.parking > 0);
      }
      // If no parking required, show all properties (no additional filtering)
    }
    
    return of(filteredProperties);
  }
}
