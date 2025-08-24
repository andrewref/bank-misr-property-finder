import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Properties</h1>
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="text-6xl mb-4">🏠</div>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Property Listings Coming Soon</h2>
        <p class="text-gray-600">We're working on bringing you the best property listings. Stay tuned!</p>
      </div>
    </div>
  `
})
export class PropertyListComponent {

}