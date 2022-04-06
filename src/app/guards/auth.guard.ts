import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {

    // console.log('Guard');
    console.log(this.auth.estaAutenticado());

    if (this.auth.estaAutenticado()) {

      return true;

    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
