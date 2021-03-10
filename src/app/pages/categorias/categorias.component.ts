import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';


import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor( private categoriasService: CategoriasService ) { }

  ngOnInit() {
  }

  crearCategoria(){
    console.log('Categoria creada');

    Swal.fire({
      title: 'Nombre de la categoria',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        
        const objCategoria = {
          nombre: login
        }
        // console.log(leter);
        this.categoriasService.setCategoria(objCategoria)
            .subscribe(data => console.log(data))

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
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }

}
