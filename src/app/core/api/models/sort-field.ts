import { SortDirection } from "./sort-direction";

export class SortField {

  constructor(prop: string) {
    this.property = prop;
  }

  property: string;
  direction = SortDirection.Ascending;

}