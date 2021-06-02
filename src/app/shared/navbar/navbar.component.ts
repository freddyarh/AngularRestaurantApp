import { Component, OnInit } from '@angular/core';

import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public productoArr : string[] = [];

  public numPro : [] = [];

  nombre: string;

  constructor( private carritoService : CarritoService ) { 
    this.nombre = localStorage.getItem('nombre');
  }

  ngOnInit() {
    this.carritoService.getProductos$().subscribe(
      product => {
        product
      }
    );
  }

  modalCar(){
    console.log('aqui se ejecuta el modal');
  }
}
