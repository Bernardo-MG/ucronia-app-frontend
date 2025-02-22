import { FieldFailure } from "./field-failure";

export class FieldFailures {
  propertyFailures: { [key: string]: FieldFailure[] } = {};

  constructor(failures?: { [key: string]: FieldFailure[] }) {
    if (failures) {
      this.propertyFailures = failures;
    }
  }

  /**
   * Removes all the stored failures.
   */
  public clear() {
    this.propertyFailures = {};
  }

  /**
   * Returns the failures for a property.
   * 
   * @param property property to search for failures
   * @returns failures for the property
   */
  public getFailures(property: string): FieldFailure[] {
    let failures: FieldFailure[];

    if (this.hasFailures(property)) {
      const found = this.propertyFailures[property];
      failures = (found as FieldFailure[]);
    } else {
      failures = [];
    }

    return failures;
  }

  /**
   * Indicates if there are failures for the received property.
   * 
   * @param property property to check for failures
   * @returns true if there are failures for the property, false otherwise
   */
  public hasFailures(property: string) {
    return property in this.propertyFailures;
  }

}