import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError  } from 'rxjs/operators';
import swal from 'sweetalert';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  usuario: Usuario;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivo: SubirArchivoService,
    ) {
      this.cargarStorage();
      console.log('Servicio de usuario listo');
  }

  estaLogueado() {
    console.log(this.token);
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.token = token;
    this.usuario = usuario;
    this.menu = menu;
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario)
    .pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success' );
        return resp.usuario;
      }),
      catchError( err => {
        console.log(err);
        swal( err.error.mensaje, err.error.errors.message, 'error' );
        return Observable.throw( err );
      })
    );
  }

  actualizarUsuario( usuario: Usuario ) {
    console.log('Actualizar usuario');
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url    += '?token=' + this.token;
    return this.http.put( url, usuario)
    .pipe(
      map( (resp: any) => {
        let usuarioBD : Usuario = resp.usuario;

        this.guardarStorage( usuarioBD._id, this.token, usuarioBD, this.menu);
        swal('Usuario actualizado', usuarioBD.nombre, 'success' );
        return resp.true;
      }),
      catchError( err => {
        console.log(err);
        swal( err.error.mensaje, err.error.errors.message, 'error' );
        return Observable.throw( err );
      })
    );
  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivo.subirArchivo( archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img  = resp.usuario.img;
        // swal( 'Imagen actualizada ', this.usuario.nombre, 'success');

        this.guardarStorage( id, this.token, this.usuario, this.menu);
      })
      .catch( resp => {
        console.log( resp );
      });
  }

  login( usuario: Usuario, recuerdame: boolean = false ) {

    if ( recuerdame ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    console.log(url, 'login');
    return this.http.post( url, usuario)
    .pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log(resp);
        return true;
      }),
      catchError( err => {
        swal( 'Error en el login', err.error.mensaje, 'error' );
        return Observable.throw( err );
      })
    );
  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url);
  }

  buscarUsuario( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url);
  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete( url)
    .pipe(
      map( (resp: any) => {
        console.log('Se ha borrado el usuario');
        // swal('Usuario borrado', 'Se ha borrado el usuario ' + resp.usuario.nombre, 'success');
        return true;
      })
    );
  }

}

