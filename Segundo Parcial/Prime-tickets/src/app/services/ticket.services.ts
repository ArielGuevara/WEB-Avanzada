import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public tickets: Ticket[] = [
    {
      id: 1,
      titulo: 'Error en inicio de sesión',
      descripcion: 'No puedo acceder a mi cuenta',
      prioridad: 'Alta',
      estado: 'Abierto',
      fechaCreacion: new Date(),
      cliente: 'Cliente A'
    },
    {
        id: 2,
        titulo: 'Error en loggin',
        descripcion: 'Contrseña invalida',
        prioridad: 'Alta',
        estado: 'Abierto',
        fechaCreacion: new Date(),
        cliente: 'Cliente B'
    },
    {
        id: 3,
        titulo: 'Error de cache',
        descripcion: 'Problema con el explorador',
        prioridad: 'Media' ,
        estado: 'En proceso',
        fechaCreacion: new Date(),
        cliente: 'Cliente C'
    }
  ];

  private ticketTreeData = this.convertirATreeData(this.tickets);
  private ticketSubject = new BehaviorSubject<any[]>(this.ticketTreeData);
  tickets$ = this.ticketSubject.asObservable();

  agregarTicket(ticket: Ticket) {
    this.tickets.push(ticket);
    this.actualizarDatos();
  }

  actualizarEstado(id: number, estado: Ticket['estado']) {
    const ticket = this.tickets.find(t => t.id === id);
    if (ticket) {
      ticket.estado = estado;
      this.actualizarDatos();
    }
  }

  private actualizarDatos() {
    this.ticketTreeData = this.convertirATreeData(this.tickets);
    this.ticketSubject.next(this.ticketTreeData);
  }

  private convertirATreeData(tickets: Ticket[]) {
    return tickets.map(ticket => ({
      data: ticket
    }));
  }
}
