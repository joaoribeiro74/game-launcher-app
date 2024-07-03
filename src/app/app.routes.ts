import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';



export const routes: Routes = [
    { path: '', component: MainPageComponent, pathMatch: 'full'},
    { path: '**', redirectTo: 'inicio'},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'perfil', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'game/:name', component: GamePageComponent },
    { path: 'category/:name', component: CategoryPageComponent }
];

