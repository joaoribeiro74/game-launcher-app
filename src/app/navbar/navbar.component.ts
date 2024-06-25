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

  constructor(private router: Router, public authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/register';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
