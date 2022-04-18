import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import * as actionsAuth from 'src/app/actions/auth';
import * as actionsUi from 'src/app/actions/ui';
import { AppState } from 'src/app/app.reducer';
import { UserSignIn } from 'src/app/models/userSignIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario: UsuarioModel;
  recuerdame = false;
  private home: HomeComponent;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private store: Store<AppState>, private auth: AuthService, private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      console.log('sub cargando')
      this.cargando = ui.isLoading
    });
  }


  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.store.dispatch(actionsUi.isLoading());

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuario)
      .subscribe(resp => {

        Swal.close();
        const { nombre, uid, email } = resp['usuario'];
        const usuario: UserSignIn = new UserSignIn(uid, nombre, email);
        this.store.dispatch(actionsAuth.login({ user: usuario }));

        if (this.recuerdame) {
          localStorage.setItem('email', this.usuario.email);
        }

        localStorage.setItem('nombre', nombre);
        this.store.dispatch(actionsUi.stopLoading());
        this.router.navigateByUrl('/home');

      }, (err) => {
        // console.log(err);
        this.store.dispatch(actionsUi.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticacion',
          text: err.error.msg
        });

      });


  }

}
