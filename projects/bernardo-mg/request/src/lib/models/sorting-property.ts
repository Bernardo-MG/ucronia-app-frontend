import { SortingDirection } from "./sorting-direction";

/**
 * Field being sorted.
 */
export class SortingProperty {

  property: string;
  direction: SortingDirection;

  constructor(prop: string, dir: SortingDirection = SortingDirection.Ascending) {
    this.property = prop;
    this.direction = dir;
  }

}