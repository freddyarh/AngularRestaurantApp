import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { global } from '../services/global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private url = global.url;
  public arrProducto : object[] = [];
  private producto$: Subject<any>
  public proCantidad : object;

  constructor( private http: HttpClient ) {

    this.producto$ = new Subject();
  }

  cargarCarrito(id : string, cantidad: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        // 'x-token': token
      })
    };

    return this.http.get(this.url + 'producto/' + id, httpOptions)
    .pipe(
      map((response: object) => {
        this.arrProducto.push(response);
        this.proCantidad = {
          producto : this.arrProducto,
          cantidad
        }
        this.producto$.next(this.proCantidad);
        //this.producto$.next(cantidad);
        //this.producto$.next(cantidad);
        //this.cantidad = cantidad;
        return this.arrProducto;
      })
    );

  }

  getProductos$(): Observable<any>{
    return this.producto$.asObservable();
  }

}
