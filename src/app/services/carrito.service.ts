import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public arrProducto : string[] = [];
  private producto$: Subject<any[]>

  constructor( ) {

    this.producto$ = new Subject();
  }

  cargarCarrito(id : string){

    this.arrProducto.push(id);
    this.producto$.next(this.arrProducto);
  }

  getProductos$(): Observable<any[]>{
    return this.producto$.asObservable();
  }

}
