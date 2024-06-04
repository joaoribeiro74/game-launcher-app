import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TwoWayDatabindingComponent } from './two-way-databinding/two-way-databinding.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent}
];
