import { Component, OnInit } from '@angular/core';
import { ProductosService } from './productos.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports:[RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pryServicioRecuperacion';
  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe(
      (data) => {
        this.productos = data;
        console.log('Productos cargados:', this.productos);
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}
