import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PropertyListComponent } from '../components/property-list/property-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PropertyListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project5';
}
