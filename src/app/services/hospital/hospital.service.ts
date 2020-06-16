import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as swal from 'sweetalert';

import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

// declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService,
  ) { }

  cargarHospitales( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url);
 }

  obtenerHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url);
  }

  borrarHospital( id:string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url    += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .pipe(
      map(
        (resp: any) => {
          console.log('Hospital borrado');
          // swal('Hospital borrado', 'Se ha borrado el hospital ' + resp.hospital.nombre, 'success');
          return true;
        }
      )
    );
  }

  crearHospital( nombre:string ) {
    let url = URL_SERVICIOS + '/hospital';
    url    += '?token=' + this._usuarioService.token;
    return this.http.post( url , {nombre});
  }

  buscarHospital( termino:string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url);
  }

  actualizarHospital( hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url    += '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital)
    .pipe(
      map( (resp: any) => {
        // swal('Hospital actualizado', resp.hospital.nombre, 'success' );
        return resp.hospital;
      })
    );
  }
}
