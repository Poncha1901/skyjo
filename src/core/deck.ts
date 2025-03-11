import { Card, CardValue, Hand } from "../shared/types"; // Ensure the Card module exists at this path or adjust the path

export class Deck {
  public cards: Card[] = [];
  public discarded: Card[] = [];

  constructor() {
    this.populate();
  }

  populate() {
    const values: CardValue[] = [
      "-2",
      "-1",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];
    values.forEach((value) => {
      for (let i = 0; i < 10; i++) {
        this.cards.push({ value: value, isFaceUp: false });
      }
    });
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  deal(n: number): Hand {
    const hand: Hand = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    for (let i = 0; i < n; i++) {
      const card = this.draw();
      const row = Math.floor(i / 4);
      const col = i % 4;
      hand[row][col] = card;
    }
    return hand;
  }

  draw(): Card {
    if (this.cards.length === 0) {
      this.cards = this.discarded;
      this.shuffle();
      this.discarded = [];
    }
    const card = this.cards.shift();
    if (!card) {
      throw new Error("No cards left to draw");
    }
    return card;
  }
}
