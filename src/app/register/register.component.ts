import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    repassword: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    localStorage.setItem('userData', JSON.stringify(this.user));

    const registered = this.authService.register(this.user);
    if (registered) {
      alert('Usuário registrado com sucesso');
      this.router.navigate(['']);
    } else {
    }
  }

}
