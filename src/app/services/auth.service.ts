import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  register(user: any): boolean {
    if (user.username && user.email && user.password) {
      localStorage.setItem('userData', JSON.stringify(user));
      return true;
    }
    return false;
  }

  login(username: string, password: string): boolean {
    console.log(`Tentativa de login com username: ${username} e password: ${password}`);
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      const user = JSON.parse(userData);
      if (user.username === username && user.password === password) {
        console.log('Login bem-sucedido para usuário:', username);
        localStorage.setItem('currentUser', JSON.stringify(user));  // Armazena o usuário logado
        return true;
      }
    }
    
    console.log('Login falhou para usuário:', username);
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    console.log('Logout realizado.');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    console.log('Usuário atual:', user);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const loggedIn = this.getCurrentUser() !== null;
    console.log('Usuário está logado:', loggedIn);
    return loggedIn;
  }
}

