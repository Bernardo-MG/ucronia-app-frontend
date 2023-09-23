import { Direction } from "./direction";

export class Sort<T> {

  constructor(prop: keyof T) {
    this.property = prop;
  }

  property: keyof T;
  direction = Direction.Ascending;
}