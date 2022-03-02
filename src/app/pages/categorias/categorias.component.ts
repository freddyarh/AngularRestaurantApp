import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swiper from 'swiper';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  private token: string;

  public categorias: object;

  constructor( private categoriasService: CategoriasService, private authService: AuthService ) { }

  ngOnInit() {
    this.categoriasService.getCategorias()
      .subscribe((data:any) => {

        this.categorias = data.categorias;
      });
  }

  crearCategoria(){

    Swal.fire({
      title: 'Nombre de la categoria',
      input: 'text',
      input2: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        
        const objCategoria = {
          nombre: login,
          descripcion: 'Platos deliciosos provenientes del mar'
        }
        // console.log(leter);
        const token = this.authService.userToken;

        this.categoriasService.setCategoria(objCategoria, token )
          .subscribe(data => {
            this.ngOnInit();
        });

        // // return fetch(`//api.github.com/users/${login}`)
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error(response.statusText)
        //     }
        //     return response.json()
        //   })
        //   .catch(error => {
        //     Swal.showValidationMessage(
        //       `Ingresa un texto: ${error}`
        //     )
        //   })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire({
          icon:'success',
          title: `Se a creado la categoria ${result.value}`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }

  getCategorias() {

    this.categoriasService.getCategorias()
      .subscribe(res => {
        this.categorias = res;
        //console.log(res);
      });
  }

  verCategoria(evento: number) {
    //console.log('este es el evento', evento);
  }

  crearProducto(){

    //console.log('nuevo');
  }

}
