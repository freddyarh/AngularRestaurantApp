import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public categoriasArray: Array<any> = [];

  forma: FormGroup;

  public imagePath;
  imgURL: any;
  public message: string;

  constructor( private fb: FormBuilder, private categoriasService: CategoriasService ) { 

    this.categoriasService.getCategorias()
      .subscribe((data:any) => {

        let categorias = data.categorias;
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

  crearFormulario(){

    this.forma = this.fb.group({
      imagen:    [''],
      nombre:    ['', Validators.required],
      precio:    [''],
      categoria: ['']
    });

  }

  guardar(){
    console.log(this.forma);
  }

  preview(files) {
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
