export interface Ticket {
    id: number;
    titulo: string;
    descripcion: string;
    prioridad: 'Baja' | 'Media' | 'Alta' | 'Urgente';
    estado: 'Abierto' | 'En proceso' | 'Resuelto';
    fechaCreacion: Date;
    cliente: string;
    archivos?: File[];
  }