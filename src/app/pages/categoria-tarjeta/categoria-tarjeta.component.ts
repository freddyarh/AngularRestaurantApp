import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categoria-tarjeta',
  templateUrl: './categoria-tarjeta.component.html',
  styleUrls: ['./categoria-tarjeta.component.css']
})
export class CategoriaTarjetaComponent implements OnInit {

  @Input() categoria: any = {};
  @Input() index: number;

  @Output() categoriaSeleccionada: EventEmitter<number>;

  constructor() { 
    this.categoriaSeleccionada = new EventEmitter();
  }

  ngOnInit() {
  }

}
