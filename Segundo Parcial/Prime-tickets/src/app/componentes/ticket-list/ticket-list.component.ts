import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.services';
import { TreeTableModule } from 'primeng/treetable';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TreeNode } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ticket-list',
  imports: [
    CommonModule,
    TreeTableModule,
    ChipModule,
    AccordionModule,
    FileUploadModule,
    ProgressSpinnerModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  tickets!: TreeNode[];
  isUploading: boolean = false;  // Estado para mostrar el spinner

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.tickets$.subscribe(data => { 
      this.tickets = data;
      // console.log("tickets: ", data);
    });
  }

  onUpload(event: any) {
    console.log('Archivo subido:', event);
    this.isUploading = true;  // Mostrar spinner al iniciar carga

    // Simulando tiempo de carga (por ejemplo, petición HTTP)
    setTimeout(() => {
      console.log('Archivo subido:', event);
      this.isUploading = false;  // Ocultar spinner después de la carga
    }, 3000);  // Simulación de 3 segundos de carga
  }
}
