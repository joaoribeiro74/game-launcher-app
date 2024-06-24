import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainCarouselComponent } from '../main-carousel/main-carousel.component';
import { CardMainComponent } from '../card-main/card-main.component';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
 selector: 'app-main-page',
 standalone: true,
 imports: [CommonModule, CardComponent, MainCarouselComponent, CardMainComponent, CategoryCardComponent],
 templateUrl: './main-page.component.html',
 styleUrl: './main-page.component.css',
 providers: [ApiService]
})
export class MainPageComponent implements OnInit {
  games: any[] = [];
  categories: any[] = [];

  activeCard: any | null = null; 
  isHovered: boolean = false;
  
  currentGameIndex = 0;

  indicators: number[] = [];

  constructor(private apiService: ApiService) {
    this.indicators = Array(this.games.length).fill(0).map((x, i) => i);
  }

  nextGame() {
    this.currentGameIndex = (this.currentGameIndex + 1) % this.games.length;
  }

  prevGame() {
    this.currentGameIndex = (this.currentGameIndex - 1 + this.games.length) % this.games.length;
  }

  goTo(index: number) {
    this.currentGameIndex = index;
  }

  ngOnInit(): void {

    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.apiService.getGames().subscribe(data => {
      this.games = data;
    });

    this.initializeTabs();
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
