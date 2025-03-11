import { Card } from "../shared/types";
import { Deck } from "./deck";
import { Player } from "./player";

export class Skyjo {
  deck: Deck;
  players: Player[];
  currentPlayer: Player | null;
  isLastRound: boolean;
  currentCard: Card;
  currentAction: string;

  constructor(players: string[]) {
    this.deck = new Deck();
    this.players = players.map((name) => new Player(name));
    this.currentPlayer = null;
    this.isLastRound = false;
    this.currentAction = "draw";
    this.startGame();
    const card: Card = this.deck.draw();
    card.isFaceUp = true;
    this.currentCard = card;
  }

  public addPlayer(name: string) {
    this.players.push(new Player(name));
  }

  startGame() {
    this.deck.shuffle();
    this.players.forEach((player) => {
      player.setHand(this.deck.deal(12));
    });
    this.currentCard = this.deck.draw();
    this.currentAction = "draw";
    this.currentPlayer = this.players[0];
  }

  updateGame(action: string, card: Card | null, position: [number, number]) {
    if (action === "drawDeck") {
      this.drawDeck();
    } else if (action === "drawDiscard") {
      this.drawDiscard();
    } else if (action === "discard") {
      if (card === null) {
        throw new Error("No card to discard");
      }
      this.discardCard(card);
    } else if (action === "swap") {
      if (this.currentPlayer === null) {
        throw new Error("No current player");
      }
      if (card === null) {
        throw new Error("No card to swap");
      }
      this.swapAction(card, position);
    }
  }

  private showCard(position: [number, number]): void {
    if (this.currentPlayer === null) {
      throw new Error("No current player");
    }
    const [row, col] = position;
    const card = this.currentPlayer.getHand()[row][col];
    if (card === null) {
      throw new Error("No card at position");
    }
    card.isFaceUp = true;
  }

  private swapAction(card: Card, position: [number, number]): void {
    if (this.currentPlayer === null) {
      throw new Error("No current player");
    }
    this.currentPlayer.swapCard(card, position);
    card.isFaceUp = true;
    const previousCard: Card = this.currentPlayer.swapCard(
      this.currentCard,
      position
    );
    this.deck.discarded.push(previousCard);
    this.currentPlayer =
      this.players[
        (this.players.indexOf(this.currentPlayer) + 1) % this.players.length
      ];
  }

  private drawDeck() {
    this.currentCard = this.deck.draw();
  }

  private drawDiscard() {
    if (this.deck.discarded.length === 0) {
      throw new Error("No cards to draw");
    }
    const card = this.deck.discarded.pop();
    if (card === undefined) {
      throw new Error("No cards to draw");
    }
    this.currentCard = card;
  }

  private discardCard(card: Card) {
    this.deck.discarded.push(card);
  }
}
