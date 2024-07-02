import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor() {}

  // Função para simular a compra de um jogo por nome
  purchaseGame(gameId: string): Observable<{ success: boolean }> {
    // Obtém os dados do usuário do localStorage
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Inicializa a lista de jogos comprados se estiver vazia
    if (!userData.purchasedGames) {
      userData.purchasedGames = [];
    }

    // Adiciona o jogo à lista se ainda não estiver presente
    if (!userData.purchasedGames.includes(gameId)) {
      userData.purchasedGames.push(gameId);
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    // Retorna um Observable com a resposta de sucesso
    return of({ success: true });
  }

  // Função para obter a quantidade total de jogos comprados
  getTotalPurchasedGames(): number {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData.purchasedGames ? userData.purchasedGames.length : 0;
  }
}
