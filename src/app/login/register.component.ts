import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  // reactive forms
  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      // este seria el punto que dice que las contraseñas no coiniciden y por tanto formulario no es valido
      return {
        sonIguales: true
      };

    };

  }
  ngOnInit() {
    init_plugins();
    this.forma =   new FormGroup({
      nombre:      new FormControl( null, Validators.required),
      correo:     new FormControl( null, [Validators.required, Validators.email]),
      password:    new FormControl( null, Validators.required),
      password2:   new FormControl( null, Validators.required),
      condiciones: new FormControl( false),
    }, { validators: this.sonIguales('password', 'password2') });

    // para ayuda desarrollo vamos a rellenar los campos paraq facilitar las pruebas
    this.forma.setValue( {
      nombre: 'Lucia',
      correo: 'lucia.roper@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: false
    });
  }

  registarUsuario(  ) {
    console.log( this.forma.value );

    console.log(  'Forma valida', this.forma.valid);

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {

      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;

    }


    let usuario =  new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    console.log( 'Respuesta de crear usuario' );
    this._usuarioService.crearUsuario( usuario ).subscribe(
      resp => {
        console.log( ' Esta es la respuesta: ', resp );
      }
    );
  }

}
