import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TicketListComponent } from './componentes/ticket-list/ticket-list.component';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, TreeTableModule, ChipModule, AccordionModule, FileUploadModule,
    ProgressSpinnerModule, DialogModule, TicketListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Soporte';
}
