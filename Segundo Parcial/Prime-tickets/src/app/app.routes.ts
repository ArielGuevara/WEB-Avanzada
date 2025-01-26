import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './componentes/ticket-list/ticket-list.component';

export const routes: Routes = [
    {
        path:'tickets',
        component:TicketListComponent
    }
];
