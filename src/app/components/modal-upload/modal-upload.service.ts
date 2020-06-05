import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  oculto: string = 'oculto';

  tipo: string = null;
  id: string = null;

  public notificacion = new EventEmitter<any>();

  constructor() { }

  abrirModal(tipo, id) {
    this.tipo = tipo;
    this.id = id;
    this.oculto = '';
  }

  cerrarModal() {
    this.tipo = null;
    this.id = null;
    this.oculto = 'oculto';
  }
}
