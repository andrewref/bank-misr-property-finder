import { Routes } from '@angular/router';
import { PropertyListComponent } from './components/property-list/property-list';
import { PropertyDetailsComponent } from './components/property-details/property-details';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'properties', component: PropertyListComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: NotFoundComponent }
];
