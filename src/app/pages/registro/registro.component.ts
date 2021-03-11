import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [AuthService]
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  recuerdame = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'fredy@gmail.com';
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
    //  console.log(this.usuario);
    //  console.log(form);

    this.auth.nuevoUsuario( this.usuario )
    .subscribe( resp => {
      console.log(resp);
      Swal.close();

      if( this.recuerdame) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/login');
    }, (err) => {
      console.log(err);
      console.log(err.error.err.errors.email.message);

      Swal.fire({
        icon: 'error',
        title: 'Error de autenticacion',
        text: err.error.err.errors.email.message
      });

    });
  }


}
