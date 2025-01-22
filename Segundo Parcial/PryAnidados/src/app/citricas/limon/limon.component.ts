import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-limon',
  standalone: true,  // Indica que este es un componente independiente
  imports: [ReactiveFormsModule],  // Importa el módulo necesario
  templateUrl: './limon.component.html',
  styleUrls: ['./limon.component.css']
})
export class LimonComponent {
  limonForm: FormGroup;
  productos: any[] = [];
  editIndex: number | null = null;

  constructor() {
    this.limonForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\\.\\d{1,2})?$')]),
      cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  agregarProducto() {
    if (this.limonForm.valid) {
      if (this.editIndex === null) {
        this.productos.push(this.limonForm.value);
      } else {
        this.productos[this.editIndex] = this.limonForm.value;
        this.editIndex = null;
      }
      this.limonForm.reset();
    }
  }

  editarProducto(index: number) {
    this.limonForm.setValue(this.productos[index]);
    this.editIndex = index;
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  get nombre() { return this.limonForm.get('nombre'); }
  get precio() { return this.limonForm.get('precio'); }
  get cantidad() { return this.limonForm.get('cantidad'); }
  get descripcion() { return this.limonForm.get('descripcion'); }
}
