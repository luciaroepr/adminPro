import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: any = [];
  usuario: Usuario;
  
  constructor(
    public _sidebar: SidebarService,
    public _usuarioServicio: UsuarioService
  ) { }

  ngOnInit() {
    console.log(this._sidebar.menu);
    this.usuario = this._usuarioServicio.usuario;
    this._sidebar.cargarMenu();
  }
  


}
