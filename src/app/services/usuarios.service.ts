import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:3000/';

  constructor( private http: HttpClient ) { }

  getUsuarios() {
    // const params = JSON.stringify(usuario);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + 'usuario')
    .pipe(
        map( resp => {

          return resp;

        })
      );
  }
}
