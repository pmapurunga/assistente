import { Injectable } from '@angular/core';
import estados from '../../assets/estados-brasileiros.json';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  estados = estados;

  constructor() { }

  getEstados() {
    return this.estados;
  }
}
