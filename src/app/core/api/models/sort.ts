import { Direction } from "./direction";

export class Sort {

  constructor(prop: string) {
    this.property = prop;
  }

  property: string;
  direction = Direction.Ascending;

}