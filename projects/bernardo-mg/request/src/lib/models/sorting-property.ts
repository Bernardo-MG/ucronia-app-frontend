import { SortingDirection } from "./sorting-direction";

/**
 * Field being sorted.
 */
export class SortingProperty {

  property: string;
  direction = SortingDirection.Ascending;

  constructor(prop: string, dir?: SortingDirection) {
    this.property = prop;

    if (dir) {
      this.direction = dir;
    }
  }

}