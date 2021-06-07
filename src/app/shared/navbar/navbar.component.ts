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
  public car : Function;
  public total: number = 0;

  nombre: string;

  constructor( private carritoService : CarritoService ) { 
    this.nombre = localStorage.getItem('nombre');
  }

  ngOnInit() {
    //Aqui llamamos el servicio que carga lo solicitado

    this.numPro = this.carritoService.arrProducto.length;
    this.numPro2 = this.carritoService.arrProducto;
    this.numPro = this.numPro2.length;
        this.numPro2.forEach( resp => {
          this.total += resp.precio;
          // console.log(this.total);
        });

    this.carritoService.getProductos$().subscribe(
      (product : any) => {
        this.numPro = product.length;
        product.forEach( resp => {
          this.total += resp.precio;
          // console.log(this.total);
        });
      }
    );
  }

  modalCar(index){
    
    let a = this.carritoService.arrProducto.splice(index, 1);
    this.ngOnInit();
  }
}
