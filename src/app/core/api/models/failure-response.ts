import { Failure } from "./failure";
import { FieldFailures } from "./field-failures";

export class FailureResponse {
  failures = new FieldFailures();
  
  constructor(failures?: { [key: string]: Failure[] }) {
    if (failures) {
      this.failures = new FieldFailures(failures);
    }
  }

}