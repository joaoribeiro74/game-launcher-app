import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  onSubmit() {
    // Lógica para validar e salvar dados no localStorage
    if (this.user.password !== this.user.repassword) {
      alert('Senhas não coincidem!');
      return;
    }

    if (this.user.username && this.user.email && this.user.password) {
      localStorage.setItem('user', JSON.stringify(this.user));
      alert('Usuário registrado com sucesso');
    } else {
    }
  }

}
