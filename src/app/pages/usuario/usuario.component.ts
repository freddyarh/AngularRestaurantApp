import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';


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

    this.usuariosService.getUsuario(id)
      .subscribe((resp: any) => {
        
        // console.log(resp[0]);
        this.usuario = resp[0];
        
      });
  }

  guardar(form: NgForm ){

    if( form.invalid ){
      // const id = this.route.snapshot.paramMap.get('id'); 
      console.log('Invalido');
      return;
    }

    if( form.value.estado === "false" ){

      Swal.fire({
        icon: 'question',
        title: '¿Estas seguro?',
        text: `Estas seguro que deseas desactivar a ${form.value.nombre}`,
        showConfirmButton: true,
        showCancelButton: true
      }).then( resp => {
  
      if( resp.value ){
  
          // this.heroes.splice(i, 1);
          // this.heroesService.borrarHeroe( heroe.id ).subscribe();
          console.log(form);
          const id = this.route.snapshot.paramMap.get('id'); 
          this.usuariosService.actualizarUsuario(id, form.value)
            .subscribe(resp => {
              console.log(resp);
            });
        
          }
        });
        
      }else{

        Swal.fire({
          icon: 'info',
          title: 'Espere',
          text: 'Actualizando informacion',
          allowOutsideClick: false
        })
        Swal.showLoading();

        const id = this.route.snapshot.paramMap.get('id'); 
        this.usuariosService.actualizarUsuario(id, form.value)
          .subscribe(resp => {
                
            Swal.fire({
              title: 'El usuario',
              text: 'Se actualizo correctamente',
              icon: 'success'
            })
      });
    }
      
  }

}
