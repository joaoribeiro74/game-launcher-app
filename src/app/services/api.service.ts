import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getGame(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

