import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor( private _HttpClient:HttpClient) { }

  getProperty(): Observable <any>
  {
    return this._HttpClient.get("https://mocki.io/v1/0c33e544-7e92-439f-96e9-629551a5f9a5")
  }
  getPropertyById(id: number): Observable<any> {
    return this.getProperty().pipe(
      map ((properties: any[]) => properties.find(p => p.id === id))
    );
  }
}
