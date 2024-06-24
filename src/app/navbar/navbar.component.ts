import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    this.checkCurrentRoute();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
      this.isRegisterPage = this.router.url === '/register';
    });
  }

  private checkCurrentRoute(): void {
    const currentRoute = this.router.url;
    this.isLoginPage = currentRoute === '/login';
    this.isRegisterPage = currentRoute === '/register';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
