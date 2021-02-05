import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame = false;
  private home: HomeComponent;

  constructor(private auth: AuthService, private router: Router) { 
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    
    if( localStorage.getItem('email') ){
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }

  onSubmit( form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario )
      .subscribe(resp => {
        
        Swal.close();
        
        if(this.recuerdame){
          localStorage.setItem('email', this.usuario.email);
        }
        
        localStorage.setItem('nombre', resp['usuarioBD'].nombre);
        
        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.err.message);

        Swal.fire({
          icon: 'error',
          title: 'Error de autenticacion',
          text: err.error.err.message
        });

      });
    // console.log(this.usuario);
    // console.log(form);


  }

}
