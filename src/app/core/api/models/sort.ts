import { Direction } from "./direction";
import { SortField } from "./sort-field";

export class Sort {

  fields: SortField[] = [];

  constructor(fields: SortField[]) {
    this.fields = fields;
  }

  public addField(field: SortField) {
    if (field.direction !== Direction.Unsorted) {
      const index = this.fields.findIndex(s => s.property === field.property);

      // TODO: remove if it is unsorted
      if (index < 0) {
        // New property to sort
        this.fields.push(field);
      } else {
        // Replace property
        this.fields[index] = field;
      }
    }
  }

}