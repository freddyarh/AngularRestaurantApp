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

  constructor( private fb: FormBuilder, private categoriasService: CategoriasService ) { 

    this.categoriasService.getCategorias()
      .subscribe((data:any) => {

        let categorias = data.categorias;
        categorias.forEach((valor:string) => {
          
          this.categoriasArray.push(valor);

        });
        console.log(this.categoriasArray);
        // console.log(data);
      });

    this.crearFormulario();

  }

  ngOnInit() {
  }

  crearFormulario(){

    this.forma = this.fb.group({
      nombre:    ['', Validators.required],
      precio:    [''],
      categoria: ['']
    });

  }

  guardar(){
    console.log(this.forma);
  }

}
