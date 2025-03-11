import { Card, Hand } from "../shared/types";

export class Player {
  public hand: Hand = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  public score: number = 0;
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  setHand(hand: Hand): void {
    this.hand = hand;
  }

  getName(): string {
    return this.name;
  }
  getScore(): number {
    return this.score;
  }
  getHand(): Hand {
    return this.hand;
  }
  addScore(score: number): void {
    this.score += score;
  }

  swapCard(card: Card, position: [number, number]): Card {
    return (this.hand[position[0]][position[1]] = card);
  }

  removeColumn(col: number): void {
    if (col < 0 || col >= this.hand[0].length) {
      throw new Error("Column out of bounds");
    }
    for (let row = 0; row < this.hand.length; row++) {
      this.hand[row].splice(col, 1);
    }
  }
}
