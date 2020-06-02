import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._usuarioService.actualizarUsuario( this.usuario ).subscribe();
  }

  seleccionImagen( archivo ) {
    console.log(archivo);
    if ( ! archivo ) {
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;
  }

  cambiarImagen() {
    console.log('cambiar imagen');
    console.log('Usuario', this.usuario);
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }
}
