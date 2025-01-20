import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {}
  getProductos(): Observable<any[]> {
    const jsonUrl = 'https://drive.google.com/uc?export=download&id=1NNyoaLZCJSQ7fwPdS16Op5S07Q-ORbYP'; // Reemplaza con tu URL
    return this.http.get<any[]>(jsonUrl);
  }
}
