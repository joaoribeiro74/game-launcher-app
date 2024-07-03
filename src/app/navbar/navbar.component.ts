import { ApiService } from './../services/api.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [ApiService]
})
export class NavbarComponent implements OnInit {
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  categories: any[] = [];

  @ViewChild('mobileMenu') mobileMenu: ElementRef | undefined;

  constructor(private router: Router, public authService: AuthService, private apiService: ApiService) {
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

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMobileMenuOpen = false; // Fecha o menu ao navegar para outra página
      }
    });

    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (this.isMobileMenuOpen && this.mobileMenu && !this.mobileMenu.nativeElement.contains(event.target)) {
      // Verifica se o clique foi fora do menu e se foi na área que representa o 1/3 restante
      const screenWidth = window.innerWidth;
      const menuWidth = this.mobileMenu.nativeElement.offsetWidth;
      const remainingWidth = screenWidth - menuWidth;
      if (event.clientX > remainingWidth) {
        this.isMobileMenuOpen = false;
      }
    }
  }

  
}
