import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  usernameInvalid: boolean = false;
  passwordInvalid: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.usernameInvalid = false;
    this.passwordInvalid = false;

    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['']);
    } else {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.username !== this.username) {
        this.usernameInvalid = true;
      }
      if (userData.password !== this.password) {
        this.passwordInvalid = true;
      }
    }
  }

  isUsernameValid(): boolean {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return this.authService.isLoggedIn() || (userData.username === this.username);
  }

  isPasswordValid(): boolean {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return this.authService.isLoggedIn() || (userData.password === this.password);
  }
}