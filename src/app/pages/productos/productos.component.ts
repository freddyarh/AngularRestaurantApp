import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from 'src/app/services/productos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  private categoria: object;
  private productos: object;

  constructor( private route: ActivatedRoute, 
               private productosService: ProductosService,
               private authService: AuthService ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);

    const token = this.authService.userToken;

    this.productosService.categoriaProductos( id, token)
        .subscribe((data: any) => { 
          this.categoria = data.categoria[0].nombre;
          this.productos = data.productos;
          // console.log(this.productos)
        })
  }

}
