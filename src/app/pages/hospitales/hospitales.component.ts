import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import * as swal from 'sweetalert';
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
    swal("Nombre del Hospital:", {
      content: "input",
    })
    .then((value) => {
      if ( value ) {
        this._hospitalService.crearHospital( value )
        .subscribe((resp: any) => {
          swal(`Hospital creado: ${resp.hospital.nombre}`);
          this.cargarHospitales();
        });
        
      }else {
        swal(`Error creando hospital: ${value}`);
      }
      
    });
  
  }

  guardarHospital( hospital: Hospital) {

  }

  borrarHospital( hospital: Hospital ) {
    console.log('Borrar hospital', hospital._id);
    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangetMode: true,
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
}
