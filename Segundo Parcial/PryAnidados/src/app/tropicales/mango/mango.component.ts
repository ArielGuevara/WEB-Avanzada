import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mango',
  standalone: true,  // Indica que este es un componente independiente
  imports: [ReactiveFormsModule],  // Importa el módulo necesario
  templateUrl: './mango.component.html',
  styleUrls: ['./mango.component.css']
})
export class MangoComponent {
  mangoForm: FormGroup;
  productos: any[] = [];
  editIndex: number | null = null;

  constructor() {
    this.mangoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\\.\\d{1,2})?$')]),
      cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  agregarProducto() {
    if (this.mangoForm.valid) {
      if (this.editIndex === null) {
        this.productos.push(this.mangoForm.value);
      } else {
        this.productos[this.editIndex] = this.mangoForm.value;
        this.editIndex = null;
      }
      this.mangoForm.reset();
    }
  }

  editarProducto(index: number) {
    this.mangoForm.setValue(this.productos[index]);
    this.editIndex = index;
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  get nombre() { return this.mangoForm.get('nombre'); }
  get precio() { return this.mangoForm.get('precio'); }
  get cantidad() { return this.mangoForm.get('cantidad'); }
  get descripcion() { return this.mangoForm.get('descripcion'); }
}
