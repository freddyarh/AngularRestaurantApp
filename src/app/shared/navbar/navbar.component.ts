import { Component, OnInit } from '@angular/core';

import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public productoArr : string[] = [];

  public numPro : number;
  public numPro2 : any;
  private cantidad : number;

  nombre: string;

  constructor( private carritoService : CarritoService ) { 
    this.nombre = localStorage.getItem('nombre');
  }

  ngOnInit() {
    //Aqui llamamos el servicio que carga lo solicitado

    this.numPro = this.carritoService.arrProducto.length;
    this.carritoService.getProductos$().subscribe(
      (product : any) => {
        this.numPro = product.producto.length;
        this.numPro2 = product.producto;
        this.cantidad = product;
        console.log(this.numPro2);
      }
    );
  }

  modalCar(){
    console.log('aqui se ejecuta el modal');
  }
}
