import { FieldFailure } from "./field-failure";

export class FieldFailures {
  fieldFailures: { [key: string]: FieldFailure[] } = {};

  constructor(failures?: { [key: string]: FieldFailure[] }) {
    if (failures) {
      this.fieldFailures = failures;
    }
  }

  /**
   * Removes all the stored failures.
   */
  public clear() {
    this.fieldFailures = {};
  }

  /**
   * Returns the failures for a field.
   * 
   * @param field field to search for failures
   * @returns failures for the field
   */
  public getFailures(field: string): FieldFailure[] {
    let failures: FieldFailure[];

    if (this.hasFailures(field)) {
      const found = this.fieldFailures[field];
      failures = (found as FieldFailure[]);
    } else {
      failures = [];
    }

    return failures;
  }

  /**
   * Indicates if there are failures for the received field.
   * 
   * @param field field to check for failures
   * @returns true if there are failures for the field, false otherwise
   */
  public hasFailures(field: string) {
    return field in this.fieldFailures;
  }

}