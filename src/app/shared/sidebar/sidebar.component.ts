import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: any = [];

  constructor(
    public _sidebar: SidebarService,
    public _usuarioServicio: UsuarioService
  ) { }

  ngOnInit() {
    console.log(this._sidebar.menu);
  }
  


}
