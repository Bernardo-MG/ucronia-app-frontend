import { Direction } from "./direction";

export class SortField {

  constructor(prop: string) {
    this.property = prop;
  }

  property: string;
  direction = Direction.Ascending;

}