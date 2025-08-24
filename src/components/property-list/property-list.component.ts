import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  providers: [PropertyService]
})


export class PropertyListComponent implements OnInit {
  property: any[] = [];
  constructor(private _PropertyService:PropertyService){}
  loading = true;
error: string | null = null;
  ngOnInit():void
  {
    this._PropertyService.getProperty().subscribe({
      next:(res) => {this.property = res;
  },
      error:(err) => {this.error = "Failed to load properties";},
      complete:() =>{this.loading = false;}
    })
  }

}
