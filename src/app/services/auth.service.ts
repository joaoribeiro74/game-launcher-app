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
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      const user = JSON.parse(userData);
      if (user.username === username && user.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));  // Armazena o usuário logado
        return true;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const loggedIn = this.getCurrentUser() !== null;
    return loggedIn;
  }
}

