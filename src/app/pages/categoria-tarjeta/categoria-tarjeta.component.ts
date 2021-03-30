import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-categoria-tarjeta',
  templateUrl: './categoria-tarjeta.component.html',
  styleUrls: ['./categoria-tarjeta.component.css']
})
export class CategoriaTarjetaComponent implements OnInit {

  public urlUploadImg = global.urlUploadImg;

  @Input() categoria: any = {};
  @Input() index: number;

  @Output() categoriaSeleccionada: EventEmitter<number>;

  constructor() { 
    // console.log('categoria', this.categoria);
    this.categoriaSeleccionada = new EventEmitter();    
  }

  ngOnInit() {
    // console.log(this.categoria);
    // this.categorias = this.categoria;
  }

}
