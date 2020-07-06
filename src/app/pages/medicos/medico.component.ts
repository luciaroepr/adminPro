import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital [] = [] ;
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRouter.params.subscribe( params => {
      let id = params['id'];

      if (id !== 'nuevo' ) {
       this.cargarMedico( id );
      }

    });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
      .subscribe( (respuesta: any) => { this.hospitales = respuesta.hospitales; });

    this._modalUploadService.notificacion.subscribe(
      resp => {
        console.log( resp );
        this.medico.img = resp.medico.img;
      }
    );
  }

  cargarMedico( id:string ) {
    this._medicoService.cargarMedico( id )
      .subscribe( medico =>{
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );

      });
  }

  guardarMedico( f: NgForm ) {
    console.log( f.valid );
    console.log( f.value );
    if ( f.invalid) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
      .subscribe(medico => {
        console.log(medico);
        this.medico._id = medico._id;
        this.router.navigate((['/medico', medico._id]));
      });
  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital( id )
    .subscribe( (resp:any) => {
      console.log(resp);
      this.hospital = resp.hospital;
    });
  }

  cambiarFoto() {
    console.log( 'asdf ');
    this._modalUploadService.abrirModal( 'medicos', this.medico._id );
  }
}
