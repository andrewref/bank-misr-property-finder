import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <!-- Hero Section -->
      <div class="container mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Property
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect home with our comprehensive property finder. Browse thousands of listings and find your ideal property today.
          </p>
          <div class="space-x-4">
            <a 
              routerLink="/properties" 
              class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              Browse Properties
            </a>
            <a 
              routerLink="/search" 
              class="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
              Advanced Search
            </a>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">🏠</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Wide Selection</h3>
            <p class="text-gray-600">Browse through thousands of properties from apartments to luxury homes.</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
            <p class="text-gray-600">Use our advanced filters to find exactly what you're looking for.</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p class="text-gray-600">Search and browse properties on any device, anywhere, anytime.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {

}