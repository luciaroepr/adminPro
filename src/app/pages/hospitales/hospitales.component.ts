import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
// import * as swal from 'sweetalert';
declare var swal: any;

@Component({
  templateUrl: './hospitales.component.html',
  styles: []
})


export class HospitalesComponent implements OnInit {

  cargando: boolean = false;
  desde: number = 0;

  hospitales: Hospital [] = [];
  totalRegistros: number = 0;
  constructor(
    public _hospitalService : HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
    .subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  buscarHospital( termino: string ) {
    console.log('Buscar hospital', termino);

    if( termino.length <=0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital( termino )
      .subscribe( (resp : any) => {
        console.log('Respuesta ', resp);
        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.length;
        this.cargando = false;
      });
  }

  crearHospital() {
    console.log('Crear hospital');
    swal({
      title: 'Crear hospital',
      content: 'input',
      text: 'Ingrese el nombre del hospital',
      icon: 'info',
      button: true,
      dangerMode: true
    })
    .then( (value: string ) => {
      if ( !value || value.length === 0 ) {
        swal(`Error creando hospital: ${value}`);
      }

      this._hospitalService.crearHospital( value )
      .subscribe((resp: any) => {
        swal(`Hospital creado: ${resp.hospital.nombre}`);
        this.hospitales.push( resp.hospital );
        // this.cargarHospitales();
      });
    });
  }

  borrarHospital( hospital: Hospital ) {
    console.log('Borrar hospital', hospital._id);
    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      console.log(borrar);

      if ( borrar ) {
        console.log('Llamada a servicio borraro');
        this._hospitalService.borrarHospital( hospital._id )
          .subscribe((resp: any) => {
            console.log(resp);
            if ( resp == true ) {
              if (this.desde >= this.totalRegistros -1 ) {
                console.log(this.desde, '>=', this.totalRegistros-1, 'si');
                this.desde = 0;
              }else {
                console.log(this.desde, '>=', this.totalRegistros-1, 'no');
              }
              this.cargarHospitales();
            }
          });
      }
    });
  }

  cambiarDesde( valor ) {
    let desde  = this.desde + valor;

    if ( desde >= this.totalRegistros  ) {
      return;
    }
    if ( desde <  0 ) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  guardarHospital( hospital ) {
    this._hospitalService.actualizarHospital( hospital )
    .subscribe();
  }
}
