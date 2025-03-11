import { SortingProperty } from "./sorting-property";

/**
 * Sorting applied to a request.
 */
export class Sorting {

  public properties: SortingProperty[];

  constructor(properties: SortingProperty[] = []) {
    this.properties = properties;
  }

  /**
   * Add a field to sort.
   * 
   * @param field field to sort
   */
  public addField(field: SortingProperty) {
    const index = this.properties.findIndex(s => s.property === field.property);
    if (index < 0) {
      // New property to sort
      this.properties.push(field);
    } else {
      // Replace property
      this.properties[index] = field;
    }
  }

}