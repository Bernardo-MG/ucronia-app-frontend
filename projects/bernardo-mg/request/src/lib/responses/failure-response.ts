import { Failure } from "../models/failure";
import { FieldFailures } from "../models/field-failures";

export class FailureResponse {
  failures = new FieldFailures();

  constructor(failures?: { [key: string]: Failure[] }) {
    if (failures) {
      this.failures = new FieldFailures(failures);
    }
  }

}