import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';

import * as swal from 'sweetalert';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  desde: number = 0;
  cargando: boolean = false;

  medicos: Medico []  = [];
  totalRegistros: number = 0;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  public cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos( this.desde ).subscribe(
      (medicos: Medico []) => {
        this.cargando = false;
        this.medicos = medicos;
      }
    );
  }

  buscarMedico( termino: string ) {

    if ( !termino || termino.length === 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this._medicoService.buscarMedicos( termino )
    .subscribe(
      (medicos: Medico []) => {
        console.log(medicos);
        this.medicos = medicos;
        this.cargando = false;
      }
    );
  }

  borrarMedico( medico: Medico ) {
    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if ( borrar ) {
        console.log('BORRAR AL MEDICO', medico._id);
        this._medicoService.borrarMedico( medico._id ).subscribe( (resp) => this.cargarMedicos());
      }
      
    });
  }
}
