import { Component, OnInit, Input, Output } from '@angular/core';

import { global } from 'src/app/services/global';

@Component({
  selector: 'app-producto-tarjeta',
  templateUrl: './producto-tarjeta.component.html',
  styleUrls: ['./producto-tarjeta.component.css']
})
export class ProductoTarjetaComponent implements OnInit {

  public urlUploadImg = global.urlUploadImg;

  @Input() producto: any = {};
  @Input() index: number;

  constructor() { }

  ngOnInit() {
    // console.log(this.producto);
  }

}
