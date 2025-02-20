import { ParamLoader } from "./param-loader";
import { SortDirection } from "../models/sort-direction";
import { SortProperty } from "../models/sort-field";

export class SortingParams implements ParamLoader {

  private defaultProperties: SortProperty[] = [];

  constructor(
    private properties: SortProperty[],
    defaultProperties?: SortProperty[]
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

  public getFinalProperties(): SortProperty[] {
    let sortFields;

    // Remove unsorted fields
    const validSortings = this.properties.filter(f => f.direction != SortDirection.Unsorted);
    if (validSortings.length === 0) {
      // Use default sorts if no sorting was received
      sortFields = this.defaultProperties;
    } else {
      // Merge default sorting with the received one

      // Apply default sortings to those fields which are not sorted
      const sortedProperties = validSortings.map(f => f.property);
      const defaultSortFields = this.defaultProperties.filter(f =>
        (f.direction == SortDirection.Unsorted) || (!sortedProperties.includes(f.property))
      );

      sortFields = validSortings.concat(defaultSortFields);
    }

    // Remove duplicates
    return sortFields.filter((field, index, self) =>
      index === self.findIndex(f => f.property === field.property)
    );
  }

}