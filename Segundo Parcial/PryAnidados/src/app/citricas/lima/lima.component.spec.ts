import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lima',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lima.component.html',
  styleUrls: ['./lima.component.css']
})
export class LimaComponent {
  limaForm: FormGroup;
  productos: any[] = [];
  editIndex: number | null = null;

  constructor() {
    this.limaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\\.\\d{1,2})?$')]),
      cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  agregarProducto() {
    if (this.limaForm.valid) {
      if (this.editIndex === null) {
        this.productos.push(this.limaForm.value);
      } else {
        this.productos[this.editIndex] = this.limaForm.value;
        this.editIndex = null;
      }
      this.limaForm.reset();
    }
  }

  editarProducto(index: number) {
    this.limaForm.setValue(this.productos[index]);
    this.editIndex = index;
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  get nombre() { return this.limaForm.get('nombre'); }
  get precio() { return this.limaForm.get('precio'); }
  get cantidad() { return this.limaForm.get('cantidad'); }
  get descripcion() { return this.limaForm.get('descripcion'); }
}
