import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoWayDatabindingComponent } from './two-way-databinding/two-way-databinding.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';



export const routes: Routes = [
    { path: '', component: MainPageComponent, pathMatch: 'full'},
    { path: '**', redirectTo: 'inicio'},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];

