import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private route: ActivatedRoute, private usuariosService: UsuariosService ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.usuariosService.getUsuario(id)
      .subscribe((resp: any) => {
        
        console.log(resp[0]);
        this.usuario = resp[0];
        // this.usuario.id = id;
        
      });
  }

}
