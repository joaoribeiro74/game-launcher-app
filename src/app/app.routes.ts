import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TwoWayDatabindingComponent } from './two-way-databinding/two-way-databinding.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';



export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];
