import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductosComponent } from './pages/productos/productos.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] }, // , canActivate: [ AuthGuard ]
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'usuarios'   , component: UsuariosComponent },
  { path: 'usuario'   , component: UsuarioComponent },
  { path: 'usuario/:id'   , component: UsuarioComponent },
  { path: 'categorias'   , component: CategoriasComponent },
  { path: 'producto'   , component: ProductoComponent },
  { path: 'productos/:id'   , component: ProductosComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
