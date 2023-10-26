import { Failure } from "./failure";

export class FieldFailures {
  propertyFailures: { [key: string]: Failure[] } = {};

  constructor(failures?: { [key: string]: Failure[] }) {
    if (failures) {
      this.propertyFailures = failures;
    }
  }

  /**
   * Returns the failures for a property.
   * 
   * @param property property to search for failures
   * @returns failures for the property
   */
  public getFailures(property: string): Failure[] {
    let failures: Failure[];

    const found = this.propertyFailures[property];
    if (found) {
      failures = (found as Failure[]);
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
  public hasProperty(property: string) {
    return property in this.propertyFailures;
  }

}