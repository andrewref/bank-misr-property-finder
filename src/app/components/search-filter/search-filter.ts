import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyType, PropertyStatus, PropertyFilter } from '../../../models/property';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.html',
  styleUrl: './search-filter.scss'
})
export class SearchFilterComponent implements OnInit {
  @Input() initialFilter: PropertyFilter = {};
  @Input() showAdvanced = false;
  @Output() filterChanged = new EventEmitter<PropertyFilter>();
  @Output() filterCleared = new EventEmitter<void>();

  filter: PropertyFilter = {
    location: '',
    minPrice: undefined,
    maxPrice: undefined,
    type: undefined,
    status: undefined,
    minBedrooms: undefined,
    maxBedrooms: undefined,
    minBathrooms: undefined,
    maxBathrooms: undefined,
    minArea: undefined,
    maxArea: undefined,
    furnished: undefined,
    parking: undefined
  };

  propertyTypes = Object.values(PropertyType);
  propertyStatuses = Object.values(PropertyStatus);
  
  bedroomOptions = [1, 2, 3, 4, 5];
  bathroomOptions = [1, 2, 3, 4, 5];
  
  priceRanges = [
    { label: 'Any Price', min: undefined, max: undefined },
    { label: 'Under $200K', min: undefined, max: 200000 },
    { label: '$200K - $400K', min: 200000, max: 400000 },
    { label: '$400K - $600K', min: 400000, max: 600000 },
    { label: '$600K - $800K', min: 600000, max: 800000 },
    { label: '$800K - $1M', min: 800000, max: 1000000 },
    { label: 'Over $1M', min: 1000000, max: undefined }
  ];
  
  areaRanges = [
    { label: 'Any Size', min: undefined, max: undefined },
    { label: 'Under 500 sq ft', min: undefined, max: 500 },
    { label: '500 - 1000 sq ft', min: 500, max: 1000 },
    { label: '1000 - 1500 sq ft', min: 1000, max: 1500 },
    { label: '1500 - 2000 sq ft', min: 1500, max: 2000 },
    { label: '2000 - 3000 sq ft', min: 2000, max: 3000 },
    { label: 'Over 3000 sq ft', min: 3000, max: undefined }
  ];

  isAdvancedOpen = false;
  
  ngOnInit() {
    if (this.initialFilter) {
      this.filter = { ...this.initialFilter };
    }
  }

  onFilterChange() {
    this.filterChanged.emit({ ...this.filter });
  }

  clearFilter() {
    console.log('SearchFilterComponent: clearFilter called');
    this.filter = {
      location: '',
      minPrice: undefined,
      maxPrice: undefined,
      type: undefined,
      status: undefined,
      minBedrooms: undefined,
      maxBedrooms: undefined,
      minBathrooms: undefined,
      maxBathrooms: undefined,
      minArea: undefined,
      maxArea: undefined,
      furnished: undefined,
      parking: undefined
    };
    console.log('SearchFilterComponent: Filter cleared, emitting events');
    // First emit the clear event to parent
    this.filterCleared.emit();
    // Then emit the empty filter to trigger proper reset
    this.filterChanged.emit({ ...this.filter });
  }

  toggleAdvanced() {
    this.isAdvancedOpen = !this.isAdvancedOpen;
  }

  setPriceRange(range: any) {
    console.log('SearchFilterComponent: setPriceRange called with range:', range);
    this.filter.minPrice = range.min;
    this.filter.maxPrice = range.max;
    this.onFilterChange();
  }

  setAreaRange(range: any) {
    console.log('SearchFilterComponent: setAreaRange called with range:', range);
    this.filter.minArea = range.min;
    this.filter.maxArea = range.max;
    this.onFilterChange();
  }

  formatPropertyType(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  }

  formatPropertyStatus(status: string): string {
    return status.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  hasActiveFilters(): boolean {
    return !!(this.filter.location ||
             this.filter.minPrice ||
             this.filter.maxPrice ||
             this.filter.type ||
             this.filter.status ||
             this.filter.minBedrooms ||
             this.filter.maxBedrooms ||
             this.filter.minBathrooms ||
             this.filter.maxBathrooms ||
             this.filter.minArea ||
             this.filter.maxArea ||
             this.filter.furnished !== undefined ||
             this.filter.parking !== undefined);
  }

  getActiveFilterCount(): number {
    let count = 0;
    if (this.filter.location) count++;
    if (this.filter.minPrice || this.filter.maxPrice) count++;
    if (this.filter.type) count++;
    if (this.filter.status) count++;
    if (this.filter.minBedrooms || this.filter.maxBedrooms) count++;
    if (this.filter.minBathrooms || this.filter.maxBathrooms) count++;
    if (this.filter.minArea || this.filter.maxArea) count++;
    if (this.filter.furnished !== undefined) count++;
    if (this.filter.parking !== undefined) count++;
    return count;
  }
}
