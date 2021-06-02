import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { UploadService } from 'src/app/services/upload.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  // public urlUserImg = 'http://localhost:3000/upload/usuarios/';
  public urlUsersImg = 'http://localhost:3000/uploads/usuarios/';

  public fileToUpload: Array<File>;
  public fileToUpload2: Array<File>;
  public extencion: boolean;

  constructor(private route: ActivatedRoute, private usuariosService: UsuariosService, 
              private uploadService: UploadService ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.usuariosService.getUsuario(id)
      .subscribe((resp: any) => {
        
        this.usuario = resp[0];
        
      });
    this.usuariosService.getUsuarioImg(id)
      .subscribe((resp: any) => {
        // console.log(resp);
      },
      error => {
        // console.log(error.url);
      })
  }

  guardar(form: NgForm ){

    if( form.invalid ){
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
  
          const id = this.route.snapshot.paramMap.get('id'); 
          this.usuariosService.actualizarUsuario(id, form.value)
            .subscribe(resp => {
              // console.log(resp);
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
          .subscribe((resp:any) => {
            
            // Subir imagen
            
            this.uploadService.fileRequest(`${this.urlUsersImg}${resp.usuarioDB.uid}`, [], this.fileToUpload, 'archivo')
              .then((resp) => {
                //console.log(resp);
              })
              .catch((err:any) => {
                
                //console.log('Error', err);
              });
            
            Swal.fire({
              title: 'El usuario',
              text: 'Se actualizo correctamente',
              icon: 'success'
            })
      });
    }
      
  }

  cargarImagen(fileInput: any){

    console.log(fileInput);
    
    this.fileToUpload = <Array<File>>fileInput.target.files;
    this.fileToUpload2 = <Array<File>>fileInput.target.files[0].name;
    let fileExt = this.fileToUpload2;
    let fileExt2 = fileExt.toString();
    let fileExt3 = fileExt2.split(".");
    let [nombre, extesion] = fileExt3;

    let extencionesPermitidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extencionesPermitidas.indexOf(extesion) < 0){
      this.extencion = true;
    }else{
      this.extencion = false;
    }


  }

}
