import { SortingDirection } from "../models/sorting-direction";
import { SortingProperty } from "../models/sorting-property";
import { ParamLoader } from "./param-loader";

/**
 * Loads field sorting parameters.
 */
export class SortingParams implements ParamLoader {

  private defaultProperties: SortingProperty[];

  constructor(
    private properties: SortingProperty[],
    defaultProperties: SortingProperty[] = []
  ) {
    if (defaultProperties) {
      this.defaultProperties = defaultProperties;
    } else {
      this.defaultProperties = [];
    }
  }

  public load(setParameter: (name: string, value: any) => void): void {
    this.getFinalProperties().forEach((property) => setParameter('sort', `${String(property.property)},${property.direction}`));
  }

  public getFinalProperties(): SortingProperty[] {
    let sortFields;

    // Remove unsorted fields
    const validSortings = this.properties.filter(f => f.direction != SortingDirection.Unsorted);
    if (validSortings.length === 0) {
      // Use default sorts if no sorting was received
      sortFields = this.defaultProperties;
    } else {
      // Merge default sorting with the received one

      // Apply default sortings to those fields which are not sorted
      const sortedProperties = validSortings.map(f => f.property);
      const defaultSortFields = this.defaultProperties.filter(f =>
        (f.direction == SortingDirection.Unsorted) || (!sortedProperties.includes(f.property))
      );

      sortFields = validSortings.concat(defaultSortFields);
    }

    // Remove duplicates
    return sortFields.filter((field, index, self) =>
      index === self.findIndex(f => f.property === field.property)
    );
  }

}