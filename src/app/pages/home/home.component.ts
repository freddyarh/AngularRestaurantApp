import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private auth: AuthService, private router: Router) { }
  
  usuario: UsuarioModel;
  nombre: string;

  ngOnInit() {
    
    this.nombre = localStorage.getItem('nombre');
    
    this.auth.getUsuarios().subscribe(resp => {
      // console.log(resp);
    });
  }
  

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }



}
