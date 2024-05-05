import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Game } from '../../models/game';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  games: Game[] = [];

  constructor(private httpService: HttpService, private router: Router) { }


  Login(username: string) {

    this.httpService.getGames(username).subscribe((data: any[]) => {
      this.games = data;

    });
  }

  NewGame(username: string) {
    this.httpService.createGame(username).subscribe((data: Game) => {
      var game: Game = data;
      this.router.navigate(['play', game.gameId]);
    });
  }

  DeleteGame(gameId: number, username: string) {
    this.httpService.deleteGame(gameId).subscribe((data: any[]) => {
      this.httpService.getGames(username).subscribe((data: any[]) => {
        this.games = data;
      });
    });
  }
}
