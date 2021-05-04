import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriasService } from 'src/app/services/categorias.service';
import { UploadService } from 'src/app/services/upload.service';
import { global } from 'src/app/services/global';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public categoriasArray: Array<any> = [];
  public urlUsersImg = global.urlUploadImg;
  public fileToUpload: Array<File>;

  forma: FormGroup;

  public imagePath;
  imgURL: any;
  public message: string;

  constructor( private fb: FormBuilder, 
               private categoriasService: CategoriasService, 
               private productosService: ProductosService, 
               private uploadService: UploadService, 
               private authService: AuthService ) { 

    this.categoriasService.getCategorias()
      .subscribe((data:any) => {

        let categorias = data.categorias;
        this.categoriasArray.unshift({
          nombre: '[ Seleccione una categoria ]',
          _id:''
        });
        categorias.forEach((valor:string) => {
          
          this.categoriasArray.push(valor);

        });
        // console.log(this.categoriasArray);
        // console.log(data);
      });

    this.crearFormulario();

  }

  ngOnInit() {
  }

  get imgProductoNoValido(){
    return this.forma.get('imagen').invalid && this.forma.get('imagen').touched
  }
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get descripcionNoValido(){
    return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched
  }
  get precioNoValido(){
    return this.forma.get('precio').invalid && this.forma.get('precio').touched
  }
  get categoriaNoValido(){
    return this.forma.get('categoria').invalid && this.forma.get('categoria').touched
  }

  crearFormulario(){

    this.forma = this.fb.group({
      imagen:         ['', Validators.required],
      nombre:         ['', Validators.required],
      descripcion:    ['', Validators.required],
      precio:         ['', Validators.required],
      categoria:      ['', Validators.required]
    });

  }

  guardar(){
    // console.log(this.forma);

    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }

    // Creamos el producto 

    const token = this.authService.userToken;
    this.productosService.crearProductos(this.forma.value, token).subscribe( (data:any) => {

      // Aqui cargamos la imagen 

      this.uploadService.fileRequest(`${this.urlUsersImg}productos/${data._id}`, [], this.fileToUpload, 'archivo')
        .then((resp) => {
          console.log(resp);
          this.forma.reset();
          this.imgURL = null;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu producto ha sido guardado',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err:any) => {
          
          console.log('Error', err);
        });
      
    });

  }

  preview(files) {

    this.fileToUpload = <Array<File>>files;
    
    if (files.length === 0)
      return;
 
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
