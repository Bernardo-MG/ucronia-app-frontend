import { Failure } from "./failure";

export class FieldFailures {
  fieldFailures: { [key: string]: Failure[] } = {};

  /**
   * Returns the failures for a property.
   * 
   * @param property property to search for failures
   * @returns failures for the property
   */
  public getFailures(property: string): Failure[] {
    let failures: Failure[];

    const found = this.fieldFailures[property];
    if (found) {
      failures = (found as Failure[]);
    } else {
      failures = [];
    }

    return failures;
  }
}