import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
// import { MatSliderModule } from '@angular/material/slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaTarjetaComponent } from './pages/categoria-tarjeta/categoria-tarjeta.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoTarjetaComponent } from './pages/producto-tarjeta/producto-tarjeta.component';
import { SlideCategoriaComponent } from './pages/slide-categoria/slide-categoria.component';
import { CarritoComponent } from './shared/carrito/carrito.component';
import { PruebaComponent } from './models/prueba/prueba.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    UsuariosComponent,
    UsuarioComponent,
    CategoriasComponent,
    CategoriaTarjetaComponent,
    ProductosComponent,
    ProductoComponent,
    ProductoTarjetaComponent,
    SlideCategoriaComponent,
    CarritoComponent,
    PruebaComponent
  ],
  imports: [
    // MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
