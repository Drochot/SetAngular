import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { GamePatchDoc } from '../models/gamePatchDoc';
import { Card } from '../models/card';
import { CardSet } from '../models/cardSet';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = 'http://localhost:5230/api';

  constructor(private http: HttpClient) { }

  getGames(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/games/${username}`);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/${id}`);
  }

  createGame(username: string): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/games/${username}`, null);
  }

  getCardsById(ids: number[]): Observable<Card[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({ 'ids': ids });
    return this.http.get<Card[]>(this.apiUrl + '/cards?' + queryParams.toString());
  }

  postSet(cardIds: number[], gameId: number, setNr: number): Observable<CardSet> {
    return this.http.post<any>(`${this.apiUrl}/sets`, { "GameId": gameId, "SetNr": setNr, "Cards": cardIds });
  }

  getHint(ids: number[]): Observable<Card[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({ 'ids': ids });
    return this.http.get<Card[]>(this.apiUrl + '/hints?' + queryParams.toString());
  }

  updateGame(patchDoc: GamePatchDoc, id: number): Observable<Game> {
    return this.http.patch<Game>(`${this.apiUrl}/games/${id}`, [
      {
        "path": "/deck",
        "value": patchDoc.deck
      },
      {
        "path": "/cardsOnBoard",
        "value": patchDoc.cardsOnBoard
      }
    ]
    )
  }

  deleteGame(gameId: number): Observable<any> {
    return this.http.delete<Game>(`${this.apiUrl}/games/${gameId}`)
  }
}
