import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel;

  constructor( private usuariosService: UsuariosService ) { }

  ngOnInit() {

    this.usuariosService.getUsuarios()
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        console.log(resp);
        console.log(this.usuarios);
      });
  }

}
