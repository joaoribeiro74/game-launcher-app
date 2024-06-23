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
  card1: any = {};
  card2: any = {};
  card3: any = {};
  card4: any = {};
  card5: any = {};
  card6: any = {};
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.apiService.getGames().subscribe(data => {
      this.games = data;

      this.card1 = this.games[0]; // Exemplo: primeiro jogo
      this.card2 = this.games[1]; // Exemplo: segundo jogo
      this.card3 = this.games[2]; // Exemplo: terceiro jogo
      this.card4 = this.games[3];
    });
  }

// options with default values
options = {
    defaultPosition: 1,
    interval: 3000,

    indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses:
            'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: [
            {
                position: 0,
                el: document.getElementById('carousel-indicator-1'),
            },
            {
                position: 1,
                el: document.getElementById('carousel-indicator-2'),
            },
            {
                position: 2,
                el: document.getElementById('carousel-indicator-3'),
            },
            {
                position: 3,
                el: document.getElementById('carousel-indicator-4'),
            },
        ],
    },

    // callback functions
    onNext: () => {
        console.log('next slider item is shown');
    },
    onPrev: () => {
        console.log('previous slider item is shown');
    },
    onChange: () => {
        console.log('new slider item has been shown');
    },
};

// instance options object
instanceOptions = {
  id: 'carousel-example',
  override: true
};
}
