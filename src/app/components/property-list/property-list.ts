import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Property, PropertyType, PropertyStatus, PropertyFilter } from '../../../models/property';
import { PropertyService } from '../../../services/property.service';
import { SearchFilterComponent } from '../search-filter/search-filter';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchFilterComponent],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css'
})
export class PropertyListComponent implements OnInit, AfterViewInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  isLoading = false; // Start with false to show content immediately
  currentFilter: PropertyFilter = {};
  hasSearched = false;

  constructor(private propertyService: PropertyService) {
    // Set initial loading state to false to prevent loading spinner on initial render
    this.isLoading = false;
  }

  ngOnInit() {
    this.initializeComponent();
  }

  private initializeComponent() {
    // Only set loading if we don't have cached data
    if (this.properties.length === 0) {
      this.isLoading = true;
    }
    this.hasSearched = false;
    
    // Load properties immediately
    this.loadProperties();
  }

  loadProperties() {
    // Only show loading if we don't have data yet
    if (this.properties.length === 0) {
      this.isLoading = true;
    }
    
    this.propertyService.getProperties().subscribe({
      next: (properties) => {
        // Ensure we have valid data
        if (properties && Array.isArray(properties)) {
          this.properties = [...properties];
          this.filteredProperties = [...properties];
        } else {
          this.properties = [];
          this.filteredProperties = [];
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.isLoading = false;
        this.properties = [];
        this.filteredProperties = [];
      }
    });
  }

  onFilterChanged(filter: PropertyFilter) {
    this.currentFilter = filter;
    
    // Check if filter is empty (no criteria set)
    const hasActiveFilter = this.hasActiveFilters(filter);
    
    if (!hasActiveFilter) {
      // If no filters are active, show all properties
      this.hasSearched = false;
      this.filteredProperties = [...this.properties];
    } else {
      // If filters are active, perform search
      this.hasSearched = true;
      this.performSearch(filter);
    }
  }
  
  private hasActiveFilters(filter: PropertyFilter): boolean {
    return !!(filter.location?.trim() ||
             filter.minPrice ||
             filter.maxPrice ||
             filter.type ||
             filter.status ||
             filter.minBedrooms ||
             filter.maxBedrooms ||
             filter.minBathrooms ||
             filter.maxBathrooms ||
             filter.minArea ||
             filter.maxArea ||
             filter.furnished !== undefined ||
             filter.parking !== undefined);
  }

  onFilterCleared() {
    this.currentFilter = {};
    this.hasSearched = false;
    
    // Reload all properties when filters are cleared
    if (this.properties.length > 0) {
      this.filteredProperties = [...this.properties];
    } else {
      this.loadProperties();
    }
  }

  performSearch(filter: PropertyFilter) {
    this.isLoading = true;
    
    this.propertyService.searchProperties(filter).subscribe({
      next: (properties) => {
        this.filteredProperties = [...properties];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching properties:', error);
        this.isLoading = false;
        this.filteredProperties = [];
      }
    });
  }

  formatPrice(price: number, status: PropertyStatus): string {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
    
    return status === PropertyStatus.FOR_RENT ? `${formatted}/month` : formatted;
  }

  getStatusBadgeClass(status: PropertyStatus): string {
    switch (status) {
      case PropertyStatus.FOR_SALE:
        return 'bg-green-500 text-white';
      case PropertyStatus.FOR_RENT:
        return 'bg-blue-500 text-white';
      case PropertyStatus.SOLD:
        return 'bg-gray-500 text-white';
      case PropertyStatus.RENTED:
        return 'bg-cyan-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  getStatusText(status: PropertyStatus): string {
    switch (status) {
      case PropertyStatus.FOR_SALE:
        return 'For Sale';
      case PropertyStatus.FOR_RENT:
        return 'For Rent';
      case PropertyStatus.SOLD:
        return 'Sold';
      case PropertyStatus.RENTED:
        return 'Rented';
      default:
        return status;
    }
  }

  trackByPropertyId(index: number, property: Property): number {
    return property.id;
  }

  ngAfterViewInit() {
    // Double-check if data is loaded after view initialization
    if (this.filteredProperties.length === 0 && !this.isLoading) {
      this.initializeComponent();
    }
  }
}
