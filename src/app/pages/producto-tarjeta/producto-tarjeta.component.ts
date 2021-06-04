import { Component, OnInit, Input, Output } from '@angular/core';

import { CarritoService } from '../../services/carrito.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component'

import { global } from 'src/app/services/global';

@Component({
  selector: 'app-producto-tarjeta',
  templateUrl: './producto-tarjeta.component.html',
  styleUrls: ['./producto-tarjeta.component.css']
})
export class ProductoTarjetaComponent implements OnInit {

  public numProducto : number = 0;
  // public productoArr : string[] = [];

  public urlUploadImg = global.urlUploadImg;

  @Input() producto: any = {};
  @Input() index: number;

  constructor( private carritoService: CarritoService ) { }

  ngOnInit() {
    // console.log(this.productoArr.length);
  }

   cantidad(valor:boolean){
    if(valor){
      this.numProducto += 1;
    }
    if( !valor && this.numProducto != 0 ){
      this.numProducto -= 1;
    }
  }

  agregarCarro(producto : string){

    //console.log(this.numProducto);

    this.carritoService.cargarCarrito(producto,this.numProducto).subscribe((carro : object) => {
      //console.log(carro);
    });
    this.numProducto = 0;

  }

}
