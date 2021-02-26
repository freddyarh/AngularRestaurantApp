import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = global.url;

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

  getUsuario( id: string ){

    return this.http.get(`${this.url}usuario/${id}`)
      .pipe(
        map((resp: any) => {

          const usuarios: UsuarioModel[] = [resp.usuario];

        if(resp.ok == 'false'){  return []; }

        return usuarios;
        })
      )

  }

  getUsuarioImg( id: string ){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(`${this.url}uploads/usuarios/${id}`, { headers })
    .pipe(
      map((resp: any) => {
        // console.log(resp.error);
        return resp;
        ;
      })
    )
  }

  actualizarUsuario(id:string, usuario: UsuarioModel ){

    const params = JSON.stringify(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // console.log(usuario);
    // return usuario;
    return this.http.put(`${this.url}usuario/${id}`, params, {headers})
      
      .pipe( 
        map( resp => resp )
      );  

  }
}
