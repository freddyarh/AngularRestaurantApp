import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { global } from '../services/global';
import { map } from 'rxjs/operators';
import { Carrito } from '../models/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private url = global.url;
  public arrProducto : object[] = [];
  private producto$: Subject<any>
  public carrito : Carrito;
  public result: Array<any>;

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
      map((response: any) => {
        this.carrito = new Carrito(response._id, response.nombre, cantidad, response.precio * cantidad );

        if( this.arrProducto.length > 0){

          this.result = this.arrProducto.filter((product: any) => product.id == response._id);
            // console.log(this.result);

          if(this.result.length == 0){

            this.arrProducto.push(this.carrito);
            this.producto$.next(this.arrProducto);
            

          }else{
            
            const result = this.arrProducto.findIndex((product : any) => product.id == this.result[0].id );
            
            const [ producto ] = this.result;
            const nuevaCantidad =  cantidad + producto.cantidad;
            this.carrito = new Carrito(response._id, response.nombre, nuevaCantidad, response.precio * nuevaCantidad );
            this.arrProducto.splice(result, 1, this.carrito);
            this.producto$.next(this.arrProducto);
          
          }
          
        }else{
          
          this.arrProducto.push(this.carrito);
          this.producto$.next(this.arrProducto);
          
        }
        return this.arrProducto;
      })
    );

  }

  getProductos$(): Observable<any>{
    return this.producto$.asObservable();
  }

}
