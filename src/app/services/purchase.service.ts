import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor() {}

  purchaseGame(gameId: string): Observable<{ success: boolean }> {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData.purchasedGames) {
      userData.purchasedGames = [];
    }

    if (!userData.purchasedGames.includes(gameId)) {
      userData.purchasedGames.push(gameId);
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    return of({ success: true });
  }

  getTotalPurchasedGames(): number {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData.purchasedGames ? userData.purchasedGames.length : 0;
  }
}
