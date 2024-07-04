import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterModule],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css',
  providers: [ApiService]
})
export class CategoryPageComponent implements OnInit {
  game: any;
  games: any[] = [];
  categories: any[] = [];
  category: any;
  currentScreenshotIndex: number = -1;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['name'];
      this.loadCategoryData();
    });

    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadCategoryData(): void {
    this.apiService.getGames().subscribe(data => {
      this.games = data.filter(game => game.gameCategories.includes(this.category || ''));
      if (this.games.length > 0) {
        this.game = this.games[0]; // Exibe o primeiro jogo da categoria
      }
    });
  }

  onMouseOver(index: number, game: any) {
    if (index >= 0 && index < game.screenshots.length) {
      game.tempImage = game.screenshots[index];
      this.currentScreenshotIndex = index;
    }
  }

  onMouseOut(game: any) {
    game.tempImage = game.image;
  }
}
