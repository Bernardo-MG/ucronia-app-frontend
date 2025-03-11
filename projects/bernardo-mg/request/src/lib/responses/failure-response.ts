import { FailureStore } from "../models/failure-store";
import { FieldFailure } from "../models/field-failure";

/**
 * Response with field validation failures.
 */
export class FailureResponse {
  public readonly failures;

  constructor(failures?: { [key: string]: FieldFailure[] }) {
    if (failures) {
      this.failures = new FailureStore(failures);
    } else {
      this.failures = new FailureStore();
    }
  }

}