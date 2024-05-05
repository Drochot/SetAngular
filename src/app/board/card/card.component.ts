import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Card, CardColor, CardFill, CardShape } from '../../../models/card';
import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() card: Card;
  @Input() selectable: boolean;
  @Output() clickEvent = new EventEmitter<number>();
  selected: boolean;

  imageString: string;
  numbers: number[];
  cardStyle: string = "card";

  constructor() {
  }

  ngOnInit() {
    this.imageString = '../assets/images/' + CardShape[this.card.shape] + '_' + CardFill[this.card.fill] + '_' + CardColor[this.card.color] + '.png';
    this.numbers = Array(this.card.number + 1).fill(1).map((x, i) => i);
  }


  onClick() {
    if (this.selectable) {
      if (this.selected) {
        this.selected = false;
        this.cardStyle = "card";
        this.clickEvent.emit(this.card.id)
      }
      else {
        this.selected = true;
        this.cardStyle = "cardSelected";
        this.clickEvent.emit(this.card.id)
      }
    }
  }

  reset() {
    this.selected = false;
    this.cardStyle = "card";
  }

}
