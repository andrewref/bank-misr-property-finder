import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Property, PropertyType, PropertyStatus } from '../../../models/property';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-details.html',
  styleUrl: './property-details.scss'
})
export class PropertyDetailsComponent implements OnInit {
  property: Property | null = null;
  isLoading = true;
  currentImageIndex = 0;
  isFullscreen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id']);
      this.loadProperty(id);
    });
  }

  loadProperty(id: number) {
    this.isLoading = true;
    this.propertyService.getPropertyById(id).subscribe({
      next: (property) => {
        this.property = property || null;
        this.isLoading = false;
        
        if (!this.property) {
          this.router.navigate(['/not-found']);
        }
      },
      error: (error) => {
        console.error('Error loading property:', error);
        this.isLoading = false;
        this.router.navigate(['/not-found']);
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
        return 'badge bg-success';
      case PropertyStatus.FOR_RENT:
        return 'badge bg-primary';
      case PropertyStatus.SOLD:
        return 'badge bg-secondary';
      case PropertyStatus.RENTED:
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
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

  previousImage() {
    if (this.property && this.property.images.length > 0) {
      this.currentImageIndex = this.currentImageIndex > 0 ? 
        this.currentImageIndex - 1 : 
        this.property.images.length - 1;
    }
  }

  nextImage() {
    if (this.property && this.property.images.length > 0) {
      this.currentImageIndex = this.currentImageIndex < this.property.images.length - 1 ? 
        this.currentImageIndex + 1 : 0;
    }
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  goBack() {
    this.router.navigate(['/properties']);
  }

  contactAgent() {
    if (this.property?.agent) {
      window.location.href = `mailto:${this.property.agent.email}?subject=Inquiry about ${this.property.title}`;
    }
  }

  callAgent() {
    if (this.property?.agent) {
      window.location.href = `tel:${this.property.agent.phone}`;
    }
  }
}
