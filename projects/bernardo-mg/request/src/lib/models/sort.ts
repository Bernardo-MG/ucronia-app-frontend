import { SortProperty } from "./sort-field";

export class Sort {

  properties: SortProperty[] = [];

  constructor(properties: SortProperty[]) {
    this.properties = properties;
  }

  public addField(field: SortProperty) {
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