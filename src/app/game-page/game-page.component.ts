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
  currentDisplay: 'video' | 'screenshot' = 'video'; 
  hasClickedScreenshot = false; 

  @ViewChild('videoPlayer') videoPlayer?: ElementRef;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameName = decodeURIComponent(params['name']);
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
      if (this.game) {
        this.selectedScreenshot = this.game.screenshots[0]; 
        this.currentDisplay = this.game.image ? 'video' : 'screenshot'; 
      }
    }
  }

  displayVideo(): void {
    this.currentDisplay = 'video';
    this.selectedScreenshot = ''; 
    this.hasClickedScreenshot = false;
  }

  displayScreenshot(screenshot: string): void {
    this.currentDisplay = 'screenshot';
    this.selectedScreenshot = screenshot;
    this.hasClickedScreenshot = true; 
  }

  goToGamePage(name: string): void {
    this.router.navigate(['/game', name]).then(() => {
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
          this.router.navigate(['/perfil'], { queryParams: { purchasedGame: this.game.id } });
        } else {
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

