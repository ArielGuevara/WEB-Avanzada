import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-papaya',
  standalone: true,  // Indica que este es un componente independiente
  imports: [ReactiveFormsModule],  // Importa el módulo necesario
  templateUrl: './papaya.component.html',
  styleUrls: ['./papaya.component.css']
})
export class PapayaComponent {
  papayaForm: FormGroup;
  productos: any[] = [];
  editIndex: number | null = null;

  constructor() {
    this.papayaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\\.\\d{1,2})?$')]),
      cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  agregarProducto() {
    if (this.papayaForm.valid) {
      if (this.editIndex === null) {
        this.productos.push(this.papayaForm.value);
      } else {
        this.productos[this.editIndex] = this.papayaForm.value;
        this.editIndex = null;
      }
      this.papayaForm.reset();
    }
  }

  editarProducto(index: number) {
    this.papayaForm.setValue(this.productos[index]);
    this.editIndex = index;
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  get nombre() { return this.papayaForm.get('nombre'); }
  get precio() { return this.papayaForm.get('precio'); }
  get cantidad() { return this.papayaForm.get('cantidad'); }
  get descripcion() { return this.papayaForm.get('descripcion'); }
}
