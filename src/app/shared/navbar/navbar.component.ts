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
  public valorTotal : number = 0;
  public total: Array<any> = [];
  public cantidad: Array<any> = [];

  nombre: string;

  constructor( private carritoService : CarritoService ) { 
    this.nombre = localStorage.getItem('nombre');
  }

  ngOnInit() {
    //Aqui llamamos el servicio que carga lo solicitado

    this.numPro2 = this.carritoService.arrProducto;
    console.log(this.numPro2);
    this.numPro = this.numPro2.length == 0 ? 0 : this.totalCantidad(this.numPro2);
    this.valorTotal = this.totalValor(this.numPro2);
  
    this.carritoService.getProductos$().subscribe(
      (product : any) => {
        this.numPro = 0;
        this.valorTotal = this.totalValor(product);
        this.numPro = this.totalCantidad(product);
        
      }
    );
  }

  totalValor(arrProducto : Array<any>):number{
    
    arrProducto.forEach(element => {
          
          this.total.push(element.precio);
          
        });
        const total = this.total.slice(this.total.length - arrProducto.length, this.total.length);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        if(arrProducto.length > 0){
          return  total.reduce(reducer);
        }
  }

  totalCantidad(arrProducto : Array<any>): number{

    arrProducto.forEach( element => {

      this.cantidad.push(element.cantidad);
    });

    const total = this.cantidad.slice(this.cantidad.length - arrProducto.length, this.cantidad.length);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if(arrProducto.length > 0){
      return  total.reduce(reducer);
    }


  }

  modalCar(index){
    
    let a = this.carritoService.arrProducto.splice(index, 1);
    this.ngOnInit();
  }
}
