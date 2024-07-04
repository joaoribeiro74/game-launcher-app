import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainCarouselComponent } from '../main-carousel/main-carousel.component';
import { CardMainComponent } from '../card-main/card-main.component';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ProfileComponent } from '../profile/profile.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SliderComponent } from '../slider/slider.component';

@Component({
 selector: 'app-main-page',
 standalone: true,
 imports: [CommonModule, CardComponent, MainCarouselComponent, CardMainComponent, CategoryCardComponent, ProfileComponent, RouterModule, SliderComponent],
 templateUrl: './main-page.component.html',
 styleUrl: './main-page.component.css',
 providers: [ApiService]
})
export class MainPageComponent implements OnInit {
  games: any[] = [];
  categories: any[] = [];
  
  filteredGames: any[] = [];
  sliderGames: any[] = [];

  activeCard: any | null = null; 
  isHovered: boolean = false;
  
  currentGameIndex = 0;
  currentIndex = 0;

  indicators: number[] = [];

  constructor(private apiService: ApiService, public authService: AuthService, private router: Router) {
    this.indicators = Array(this.games.length).fill(0).map((x, i) => i);
  }

  updateCurrentGameIndex() {
    if (this.currentGameIndex >= 8) {
      this.currentGameIndex = 0;
    }
  }

  nextGame() {
    if (this.currentGameIndex < Math.min(this.games.length, 8) - 1) {
      this.currentGameIndex++;
    } else {
      this.currentGameIndex = 0;
    }
  }

  prevGame() {
    if (this.currentGameIndex > 0) {
      this.currentGameIndex--;
    } else {
      this.currentGameIndex = Math.min(this.games.length, 8) - 1;
    }
  }

  setCurrentGameIndex(index: number) {
    this.currentGameIndex = index;
  }

  goTo(index: number) {
    this.currentGameIndex = index;
  }

  ngOnInit(): void {
    this.updateCurrentGameIndex();

    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.apiService.getGames().subscribe(data => {
      this.games = data;
      this.loadRandomGames();
    });

    this.initializeTabs();
  }

  loadRandomGames(): void {
    const gamesCopy = [...this.games]; // Cria uma cópia dos jogos
    const shuffledGames = this.shuffleArray(gamesCopy); // Embaralha a cópia dos jogos
    this.filteredGames = shuffledGames.slice(0, 8); // Seleciona os primeiros 8 jogos para o carrossel
    this.sliderGames = shuffledGames.slice(0, 8); // Seleciona os mesmos 8 jogos para o slider
    if (this.filteredGames.length > 0) {
      this.currentGameIndex = 0; // Reinicia o índice
    }
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
  }

  getSportsGames(): any[] {
    return this.games.slice(10, 14); // Jogos para a seção 'ESPORTES'
  }

  initializeTabs(): void {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.clearActiveCard(); // Limpa o card ativo ao clicar em uma aba
      });
    });
  }

  setActiveCard(card: any | null): void {
    this.activeCard = card;
    this.isHovered = true; // Mostra a home-right ao definir um card ati  
  }

  // Limpa o card ativo e oculta a home-right
  clearActiveCard(): void {
  }

  // Verifica se um card está ativo
  isCardActive(card: any): boolean {
    return this.activeCard === card && this.isHovered;
  }
}
