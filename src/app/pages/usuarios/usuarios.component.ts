import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import * as swal from 'sweetalert';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario [] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean= true;
  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
      .subscribe( (resp : any) => {
        console.log('Respuesta ', resp);
        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.total;
        this.cargando = false;
      });
  }

  cambiarDesde( valor ) {
    let desde  = this.desde + valor;
    
    if ( desde >= this.totalRegistros  ){
      return;
    }
    if ( desde <  0 ){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario ( termino:string ) {
    console.log(termino );

    if( termino.length <=0 ) {
      this.cargarUsuarios();
      return;
    }
    
    this.cargando = true;
    this._usuarioService.buscarUsuario( termino )
      .subscribe( (resp : any) => {
        console.log('Respuesta ', resp);
        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.length;
        this.cargando = false;
      });
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id == this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    
    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangetMode: true,
    })
    .then( borrar => {
      console.log(borrar);

      if ( borrar ) {
        console.log('Llamada a servicio borraro');
        this._usuarioService.borrarUsuario( usuario._id )
          .subscribe((resp: any) => {
            console.log(resp);
            if ( resp == true ) {
              if (this.desde >= this.totalRegistros -1 ) {
                console.log(this.desde, '>=', this.totalRegistros-1, 'si');
                this.desde = 0;
              }else {
                console.log(this.desde, '>=', this.totalRegistros-1, 'no');
              }
              this.cargarUsuarios();
            }
          });
      }
    });

  }
}
