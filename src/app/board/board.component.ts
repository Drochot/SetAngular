import { Component, QueryList, ViewChildren } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from '../board/card/card.component';
import { Game } from '../../models/game';
import { Card } from '../../models/card';
import { CommonModule } from '@angular/common';
import { CardSet } from '../../models/cardSet';
import { GamePatchDoc } from '../../models/gamePatchDoc';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  gameId: number;
  game: Game;
  cardsToGet: number[];
  cards: Card[];
  hintSet: Card[];
  sets: CardSet[];
  selectedCards: number[] = [];
  displayText: string;
  ongoing: boolean = true;


  @ViewChildren(CardComponent)
  childCards: QueryList<CardComponent>

  constructor(private httpService: HttpService, private route: ActivatedRoute) {

    this.gameId = this.route.snapshot.params['gameId']

  }

  Reset() {
    this.childCards.forEach(c => c.reset());
    this.selectedCards = [];
  }

  SelectCard(id: number) {
    if (this.ongoing == true) {
      if (this.selectedCards.includes(id)) {
        const index = this.selectedCards.indexOf(id, 0);
        if (index > -1) {
          this.selectedCards.splice(index, 1);
        }
      }
      else {
        this.selectedCards.push(id);
        if (this.selectedCards.length == 3) {
          this.httpService.postSet(this.selectedCards, this.game.gameId, this.game.foundSets.length + 1).subscribe((data: CardSet) => {
            this.Update(data);
          });
          this.Reset();

        }
      }
    }
  }

  Update(cardSet: CardSet) {
    this.game.foundSets.push(cardSet);

    var filteredDeck = this.game.deck.filter(function (objFromA) {
      return !cardSet.cards.find(function (objFromB) {
        return objFromA.id === objFromB.id
      })
    })

    var patchDoc: GamePatchDoc = {
      deck: filteredDeck.map(a => a.id),
      cardsOnBoard: this.game.cardsOnBoard
    }

    this.httpService.updateGame(patchDoc, this.game.gameId).subscribe((data: Game) => {
      this.game = data;
      this.cards = this.game.deck.slice(0, this.game.cardsOnBoard)

      // check if the game is now finished
      if (this.game.deck.length < 12 || this.game.deck.length == 12 && this.game.setsOnBoard == 0) {
        this.displayText = "You win!"
        this.ongoing = false;
      }

    })
  }

  getHint() {
    if (this.ongoing == true) {
      let cardIds = this.cards.map(a => a.id);

      this.httpService.getHint(cardIds).subscribe((data: Card[]) => {
        
        this.hintSet = data;
        let hintIds = this.hintSet.map(a => a.id);

        this.childCards.forEach(c => {
          if (hintIds.includes(c.card.id)) {
            c.onClick()
          }
        });
      })
    }
  }


  ngOnInit() {
    this.httpService.getGameById(this.gameId).subscribe((data: Game) => {
      this.game = data;
      this.cards = this.game.deck.slice(0, this.game.cardsOnBoard);
      // check if the game is already finished
      if (this.game.deck.length < 12 || this.game.deck.length == 12 && this.game.setsOnBoard == 0) {
        this.displayText = "You win!"
        this.ongoing = false;
      }
    });
  }

}

