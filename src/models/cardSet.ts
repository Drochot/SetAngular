import { Card } from "./card";

export interface CardSet{
    gameId: number;
    setNr: number;
    cards: Card[];
}