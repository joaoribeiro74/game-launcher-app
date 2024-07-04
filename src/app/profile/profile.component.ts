import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { ApiService } from '../services/api.service';
import { ProfileEditModalComponent } from '../profile-edit-modal/profile-edit-modal.component';
import { PurchaseService } from '../services/purchase.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MainPageComponent, ProfileEditModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [ApiService]
})
export class ProfileComponent {
  games: any[] = [];
  categories: any[] = [];
  userName: string | null = null;
  profileImage: string | null = null;
  profileSummary: string | null = null;
  favoriteGame: string | null = null;
  displayName: string | null = null; 
  newUsername: string | null = null; 
  showModal = false;
  totalGames: number = 0;
  sortedGames: any[] = [];

  constructor(private apiService: ApiService, private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.username;
      this.profileImage = user.profileImage;
      this.profileSummary = user.profileSummary;
      this.favoriteGame = user.favoriteGame;

      this.displayName = localStorage.getItem('displayName') || this.userName;
      this.newUsername = user.newUsername || this.displayName;
    }

    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.apiService.getGames().subscribe(data => {
        this.games = data;

        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const purchasedGameIds = userData.purchasedGames || [];
        this.games = this.games.filter(game => purchasedGameIds.includes(game.id));

        this.totalGames = purchasedGameIds.length;
      });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  updateProfile(updatedProfile: any) {
    if (updatedProfile.displayName !== this.displayName) {
      localStorage.setItem('displayName', updatedProfile.displayName);
      localStorage.setItem('userData', JSON.stringify({
        ...JSON.parse(localStorage.getItem('userData')!),
        displayName: updatedProfile.displayName
      }));
    }

    if (updatedProfile.newUsername !== this.newUsername) {
      localStorage.setItem('userData', JSON.stringify({
        ...JSON.parse(localStorage.getItem('userData')!),
        newUsername: updatedProfile.newUsername
      }));
    }

    this.profileImage = updatedProfile.profileImage;
    this.profileSummary = updatedProfile.profileSummary;
    this.favoriteGame = updatedProfile.favoriteGame;

    localStorage.setItem('userData', JSON.stringify({
      ...JSON.parse(localStorage.getItem('userData')!),
      profileImage: this.profileImage,
      profileSummary: this.profileSummary,
      favoriteGame: this.favoriteGame
    }));

    this.displayName = updatedProfile.displayName; 
    this.newUsername = updatedProfile.newUsername; 
  }

  getFavoriteGameImage(): string {
    const favoriteGame = this.games.find(game => game.name === this.favoriteGame);
    return favoriteGame ? favoriteGame.image : this.games.length > 0 ? this.games[0].image : '';
  }
}
