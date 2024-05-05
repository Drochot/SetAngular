export interface Card{
    id: number;
    color: CardColor;
    shape: CardShape;
    number: CardNumber;
    fill: CardFill;

}

export enum CardColor
{
    red,
    blue,
    green
}
export enum CardShape
{
    diamond,
    oval,
    squiggle
}
export enum CardNumber
{
    one,
    two,
    three
}
export enum CardFill
{
    open,
    striped,
    solid
}