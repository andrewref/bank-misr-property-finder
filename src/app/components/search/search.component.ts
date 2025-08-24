import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchFilterComponent } from '../search-filter/search-filter';
import { Property, PropertyFilter } from '../../../models/property';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchFilterComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary-600 mb-4">
          <i class="fas fa-search mr-3"></i>
          Search Properties
        </h1>
        <p class="text-xl text-gray-600">
          Use our advanced filters to find your perfect property
        </p>
      </div>

      <!-- Search Filter Component -->
      <div class="mb-12">
        <app-search-filter
          [initialFilter]="currentFilter"
          [showAdvanced]="true"
          (filterChanged)="onFilterChanged($event)"
          (filterCleared)="onFilterCleared()">
        </app-search-filter>
      </div>

      <!-- Search Results -->
      <div *ngIf="hasSearched">
        <!-- Results Header -->
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-xl font-semibold">
            {{ isLoading ? 'Searching...' : searchResults.length + ' Properties Found' }}
          </h4>
          <div class="flex space-x-2" *ngIf="!isLoading && searchResults.length > 0">
            <button class="px-3 py-1 text-sm bg-primary-600 text-white rounded">
              <i class="fas fa-th mr-1"></i>
              Grid
            </button>
            <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              <i class="fas fa-list mr-1"></i>
              List
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p class="mt-4 text-gray-600">Finding the best properties for you...</p>
        </div>

        <!-- Search Results -->
        <div *ngIf="!isLoading && searchResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let property of searchResults; trackBy: trackByPropertyId" 
            class="property-card bg-white rounded-lg shadow-md overflow-hidden">
            <!-- Property Image -->
            <div class="relative">
              <img 
                [src]="property.images[0]" 
                [alt]="property.title" 
                class="w-full h-48 object-cover">
              
              <!-- Status Badge -->
              <div class="absolute top-3 left-3">
                <span class="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                  {{ getStatusText(property.status) }}
                </span>
              </div>
              
              <!-- Favorite Button -->
              <div class="absolute top-3 right-3">
                <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50" title="Add to favorites">
                  <i class="far fa-heart text-gray-600"></i>
                </button>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6">
              <!-- Price -->
              <div class="mb-2">
                <h4 class="text-2xl font-bold text-primary-600">
                  {{ formatPrice(property.price, property.status) }}
                </h4>
              </div>

              <!-- Title -->
              <h5 class="text-lg font-semibold mb-2">
                <a [routerLink]="['/property', property.id]" class="text-gray-900 hover:text-primary-600 transition-colors duration-200">
                  {{ property.title }}
                </a>
              </h5>

              <!-- Location -->
              <p class="text-gray-600 mb-4">
                <i class="fas fa-map-marker-alt mr-1"></i>
                {{ property.address }}
              </p>

              <!-- Property Details -->
              <div class="grid grid-cols-3 gap-4 text-center mb-4">
                <div *ngIf="property.bedrooms > 0">
                  <i class="fas fa-bed text-primary-600"></i>
                  <div class="text-sm text-gray-600">{{ property.bedrooms }} Beds</div>
                </div>
                <div>
                  <i class="fas fa-bath text-primary-600"></i>
                  <div class="text-sm text-gray-600">{{ property.bathrooms }} Baths</div>
                </div>
                <div>
                  <i class="fas fa-ruler-combined text-primary-600"></i>
                  <div class="text-sm text-gray-600">{{ property.area | number }} sq ft</div>
                </div>
              </div>

              <!-- Action Button -->
              <div>
                <a [routerLink]="['/property', property.id]" class="w-full inline-flex justify-center items-center px-4 py-2 bg-primary-600 text-white font-medium rounded hover:bg-primary-700 transition-colors duration-200">
                  <i class="fas fa-eye mr-2"></i>
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div *ngIf="!isLoading && searchResults.length === 0" class="text-center py-12">
          <div class="mb-4">
            <i class="fas fa-search text-gray-400 text-6xl"></i>
          </div>
          <h3 class="text-xl text-gray-600 mb-3">No Properties Found</h3>
          <p class="text-gray-500 mb-6">
            We couldn't find any properties matching your search criteria. Try adjusting your filters.
          </p>
          <button class="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-medium rounded hover:bg-primary-50 transition-colors duration-200" (click)="onFilterCleared()">
            <i class="fas fa-eraser mr-2"></i>
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Initial State -->
      <div *ngIf="!hasSearched" class="text-center py-12">
        <div class="mb-4">
          <i class="fas fa-search text-gray-400 text-6xl"></i>
        </div>
        <h3 class="text-xl text-gray-600 mb-3">Ready to Search</h3>
        <p class="text-gray-500">
          Use the filters above to start searching for your perfect property
        </p>
      </div>
    </div>
  `,
})
export class SearchComponent implements OnInit {
  searchResults: Property[] = [];
  currentFilter: PropertyFilter = {};
  isLoading = false;
  hasSearched = false;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    // Component initialization
  }

  onFilterChanged(filter: PropertyFilter) {
    this.currentFilter = filter;
    this.performSearch(filter);
  }

  onFilterCleared() {
    this.currentFilter = {};
    this.searchResults = [];
    this.hasSearched = false;
  }

  performSearch(filter: PropertyFilter) {
    this.isLoading = true;
    this.hasSearched = true;
    
    this.propertyService.searchProperties(filter).subscribe({
      next: (properties) => {
        this.searchResults = properties;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching properties:', error);
        this.isLoading = false;
        this.searchResults = [];
      }
    });
  }

  formatPrice(price: number, status: any): string {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
    
    return status === 'for_rent' ? `${formatted}/month` : formatted;
  }

  getStatusText(status: any): string {
    switch (status) {
      case 'for_sale': return 'For Sale';
      case 'for_rent': return 'For Rent';
      case 'sold': return 'Sold';
      case 'rented': return 'Rented';
      default: return status;
    }
  }

  trackByPropertyId(index: number, property: Property): number {
    return property.id;
  }
}