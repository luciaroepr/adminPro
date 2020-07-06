import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public _http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  public cargarMedicos( desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this._http.get( url )
    .pipe(
      map( (resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  public buscarMedicos( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this._http.get( url )
      .pipe(
        map( (resp: any ) => resp.medicos),
      );
  }

  public borrarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url    += '?token=' + this._usuarioService.token;

    return this._http.delete( url )
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        if ( resp.ok ) {
          swal('Medico borrado', 'Se ha borrado el medico ' + resp.medico.nombre, 'success');
        }
      })
    );
  }

  public guardarMedico( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico';
  
    if ( medico._id ) {
      // actualizando
      url    += '/' + medico._id;
      url    += '?token=' + this._usuarioService.token;
      return this._http.put( url, medico)
        .pipe(
          map( (resp: any) => {
            swal('Médico actualizado', medico.nombre, 'success');
            return resp.medico;
          })
        )
    } else{
      // creando
      url    += '?token=' + this._usuarioService.token;
      return this._http.post( url , medico)
      .pipe(
        map( (resp:any) => {
          swal('Médico creado', medico.nombre, 'success');
          return resp.medico;
        })
      )
    }

  }

  public cargarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this._http.get( url )
      .pipe(
        map( (resp: any ) => {
          console.log(resp.medico);
          return resp.medico;

        } ),
      );
  }
}
