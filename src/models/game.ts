import { Card } from "./card";
import { CardSet } from "./cardSet";

export interface Game {
    gameId: number;
    user: string;
    deck: Card[];
    cardsOnBoard: number;
    foundSets: CardSet[];
    setsOnBoard: number;
  }