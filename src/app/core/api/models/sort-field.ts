import { SortDirection } from "./sort-direction";

export class SortField {

  constructor(prop: string, dir?: SortDirection) {
    this.property = prop;

    if (dir) {
      this.direction = dir;
    }
  }

  property: string;
  direction = SortDirection.Ascending;

}