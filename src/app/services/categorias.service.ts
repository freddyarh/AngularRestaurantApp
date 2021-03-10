import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global } from '../services/global';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  public t: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJVU0VSX1JPTEUiLCJlc3RhZG8iOnRydWUsImdvb2dsZSI6ZmFsc2UsIm5vbWJyZSI6InRlc3QzIiwiZW1haWwiOiJ0ZXN0M0BnbWFpbC5jb20iLCJ1aWQiOiI2MDQ5MmU5ODdlMWE4ODMyYzgxMzI3OTEifSwiaWF0IjoxNjE1NDA4ODMxLCJleHAiOjE2MTgwMDA4MzF9.vneuDUiNZ3kT40txXwM4JyYeMLr4HG7_G3hnEYxQFUE";
  
  private url = global.url;

  constructor( private http: HttpClient ) {}

  setCategoria(categoria:any) {

    const params = JSON.stringify(categoria);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json' + this.t);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-token': this.t
      })
    };

    return this.http.post(this.url + 'categoria', params, httpOptions)
      .pipe(
        map(response => console.log(response))
      );
  }
}
