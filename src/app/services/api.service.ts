import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private gamesUrl = 'http://localhost:3000/games';
  private categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any[]> {
    return this.http.get<any[]>(this.gamesUrl);
  }

  getGame(id: number): Observable<any> {
    return this.http.get<any>(`${this.gamesUrl}/${id}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.categoriesUrl}/${id}`);
  }
}

