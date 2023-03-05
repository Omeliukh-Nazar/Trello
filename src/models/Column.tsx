import CardM from "./Card";

export default class Column {
  id: number;
  title: string;
  boardId: number;
  index: number;
  cards: CardM[];

  constructor() {
    this.id = 0;
    this.title = "";
    this.boardId = 0;
    this.index = 0;
    this.cards = [];
  }
}
