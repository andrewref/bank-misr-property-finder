import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFoundComponent {
  quickLinks = [
    { name: 'Properties', route: '/properties', icon: 'fas fa-building' },
    { name: 'Search', route: '/search', icon: 'fas fa-search' }
  ];
}
