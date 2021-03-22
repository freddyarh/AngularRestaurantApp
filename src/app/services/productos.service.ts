import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../services/global';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = global.url;

  constructor( private http: HttpClient) {}

  categoriaProductos( id:string, token: string ){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': token
      })
    };

    return this.http.get(this.url + `categoria/productos/${ id }`, httpOptions)
        .pipe(
          map(res => {
            return res;
          })
        );

  }
}
