import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital [] = [] ;
  medico: Medico = new Medico('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
      .subscribe( respuesta => this.hospitales = respuesta.hospitales );
  }

  guardarMedico( f: NgForm ) {
    console.log( f.valid );
    console.log( f.value );
    
  }
}
