import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-producto-tarjeta',
  templateUrl: './producto-tarjeta.component.html',
  styleUrls: ['./producto-tarjeta.component.css']
})
export class ProductoTarjetaComponent implements OnInit {

  @Input() producto: any = {};
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
