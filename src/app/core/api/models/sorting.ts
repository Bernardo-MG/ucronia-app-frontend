import { Params } from "../client/params";
import { Sort } from "./sort";
import { SortDirection } from "./sort-direction";
import { SortProperty } from "./sort-field";

export class Sorting implements Params {

  _properties: SortProperty[] = [];

  private _defaultSort: SortProperty[] = [];

  public set properties(properties: SortProperty[]) {
    this._properties = properties;
  }

  public get sort(): Sort {
    let sortFields;

    // Remove unsorted fields
    const validSortings = this._properties.filter(f => f.direction != SortDirection.Unsorted);
    if (validSortings.length === 0) {
      // Use default sorts if no sorting was received
      sortFields = this._defaultSort;
    } else {
      // Merge default sorting with the received one

      // Apply default sortings to those fields which are not sorted
      const sortedProperties = validSortings.map(f => f.property);
      const defaultSortFields = this._defaultSort.filter(f =>
        (f.direction == SortDirection.Unsorted) || (!sortedProperties.includes(f.property))
      );

      sortFields = validSortings.concat(defaultSortFields);
    }

    // Sort fields alphabetically
    const sortedFields = sortFields.sort((a, b) => {
      let direction;

      if (a.property.toString() < b.property.toString()) {
        direction = -1;
      } else {
        direction = 1;
      }

      return direction;
    });

    return new Sort(sortedFields);
  }

  public set defaultProperties(defaultSort: SortProperty[]) {
    this._defaultSort = defaultSort;
  }

  public load(loader: (name: string, value: any) => void): void {
    const validProperties = this.properties.filter((field) => field.direction !== SortDirection.Unsorted);
    validProperties.forEach((property) => loader('sort', `${String(property.property)},${property.direction}`));
  }

}