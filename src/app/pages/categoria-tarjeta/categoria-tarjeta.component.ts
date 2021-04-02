import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { global } from 'src/app/services/global';

import Swiper from 'swiper';

import { ProductosService } from 'src/app/services/productos.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-categoria-tarjeta',
  templateUrl: './categoria-tarjeta.component.html',
  styleUrls: ['./categoria-tarjeta.component.css']
})
export class CategoriaTarjetaComponent implements OnInit, AfterViewInit {

  public urlUploadImg = global.urlUploadImg;
  public slideImg : Array<any> = [];
  // public valores;

  @Input() categoria: any = {};
  @Input() index: number;

  @Output() categoriaSeleccionada: EventEmitter<number>;

  constructor(private productosService: ProductosService,
    private authService: AuthService) { 

    this.categoriaSeleccionada = new EventEmitter();    
  }
  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper-container', {
      // Optional parameters
      // loop: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
    });
  }

  ngOnInit() {
    // console.log('cate',this.categoria);

    const id = this.categoria._id

    const token = this.authService.userToken;

    this.productosService.categoriaProductos( id, token)
    .subscribe((data: any) => { 
      // console.log(data.productos)
      let producto = data.productos;
      producto.forEach( (valor:any) => {
        // this.valores = valor;
        
        if (this.categoria._id == valor.categoria ){

          this.slideImg.push(valor);
        }
        
      })

      console.log(this.slideImg);
    
    })

   
  }

}
