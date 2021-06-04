import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public arrProducto : string[] = [];
  private producto$: Subject<number>

  constructor( ) {

    this.producto$ = new Subject();
  }

  cargarCarrito(id : string){

    this.arrProducto.push(id);
    this.producto$.next(this.arrProducto.length);
  }

  getProductos$(): Observable<number>{
    return this.producto$.asObservable();
  }

}
