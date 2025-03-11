export type CardValue =
  | "-2"
  | "-1"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "X";

export type Card = {
  value: CardValue;
  isFaceUp: boolean;
};

export type Hand = [
  [Card | null, Card | null, Card | null, Card | null],
  [Card | null, Card | null, Card | null, Card | null],
  [Card | null, Card | null, Card | null, Card | null]
];
