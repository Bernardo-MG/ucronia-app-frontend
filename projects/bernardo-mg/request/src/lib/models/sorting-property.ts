import { SortingDirection } from "./sorting-direction";

/**
 * Field being sorted.
 */
export class SortingProperty {

  public property: string;
  public direction: SortingDirection;

  constructor(prop: string, dir: SortingDirection = SortingDirection.Ascending) {
    this.property = prop;
    this.direction = dir;
  }

}