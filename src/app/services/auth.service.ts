import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = 'http://localhost:3000/';
  // private apikey = 'AIzaSyC__AxX1W1zyVRIUkJY9_b5TPUTJwOhPf8';
  userToken: string;

  // Crear nuevos suarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login 
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
  }


  login(usuario: UsuarioModel) {

    const params = JSON.stringify(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'login', params, { headers })
      .pipe(
        map(resp => {
          // console.log('Entro en el mapa de RXJS');
          // console.log(resp['token'].length);
          this.guardarToken(resp['token']);
          return resp;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel): Observable<any> {

    const params = JSON.stringify(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'usuario', params, { headers })
      .pipe(
        map(resp => {

          this.guardarToken(resp['token']);

          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(resp['token']);

          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('Expira', hoy.getTime().toString());

  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }

  getUsuarios() {

    return this.http.get(this.url + 'usuario?desde=0&limite=5')
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

}
