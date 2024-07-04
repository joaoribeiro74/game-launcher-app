import { authGuard } from './../guards/auth.guard';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CardMainComponent } from '../card-main/card-main.component';
import { AuthService } from '../services/auth.service';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterModule, CardMainComponent, RouterModule],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
  providers: [ApiService]
})
export class GamePageComponent implements OnInit, AfterViewInit {
  games: any[] = [];
  game: any;
  categories: any[] = [];
  gameName: string | undefined;
  selectedScreenshot: string | undefined;
  currentDisplay: 'video' | 'screenshot' = 'video'; // Default to 'video'
  hasClickedScreenshot = false; // New variable to track if a screenshot has been clicked

  @ViewChild('videoPlayer') videoPlayer?: ElementRef;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Decode the gameName to handle '%20' in the URL
      this.gameName = decodeURIComponent(params['name']);
      console.log('Decoded gameName:', this.gameName);
      this.loadGames();
    });
  }

  loadGames(): void {
    this.apiService.getGames().subscribe(data => {
      this.games = data;
      this.loadGame();
    });
  }

  loadGame(): void {
    if (this.gameName && this.games.length > 0) {
      this.game = this.games.find(g => g.name === this.gameName);
      console.log('Loaded game:', this.game);
      if (this.game) {
        this.selectedScreenshot = this.game.screenshots[0]; // Set default screenshot
        this.currentDisplay = this.game.image ? 'video' : 'screenshot'; // Set display mode based on the existence of a video
      }
    }
  }

  displayVideo(): void {
    this.currentDisplay = 'video';
    this.selectedScreenshot = ''; // Clear the selected screenshot
    this.hasClickedScreenshot = false; // Reset screenshot click state
  }

  displayScreenshot(screenshot: string): void {
    this.currentDisplay = 'screenshot';
    this.selectedScreenshot = screenshot;
    this.hasClickedScreenshot = true; // Set screenshot click state to true
  }

  goToGamePage(name: string): void {
    this.router.navigate(['/game', name]).then(() => {
      // Atualiza a página após a navegação para garantir que o vídeo não persista
      window.location.reload();
    });
  }

  ngAfterViewInit(): void {
    if (this.videoPlayer) {
      const video: HTMLVideoElement = this.videoPlayer.nativeElement;
      video.volume = 0.2;
    }
  }

  handlePurchase(): void {
    if (this.authService.isLoggedIn()) {
      this.purchaseService.purchaseGame(this.game.id).subscribe(response => {
        if (response.success) {
          // Redireciona para a página de perfil após a compra
          this.router.navigate(['/perfil'], { queryParams: { purchasedGame: this.game.id } });
        } else {
        }
      });
    } else {
      // Redireciona para a página de login caso o usuário não esteja logado
      this.router.navigate(['/login']);
    }
  }
}

