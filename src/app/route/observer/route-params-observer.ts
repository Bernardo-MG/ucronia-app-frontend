import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ParametersParser } from "./parameters-parser";

export class RouteParametersObserver<T> {

  public subject = new BehaviorSubject<T | undefined>(undefined);

  constructor(
    route: ActivatedRoute,
    parser: ParametersParser<T>
  ) {
    // Listens to parameter changes
    route.queryParamMap.subscribe(params => {
      const value = parser.parse(params);

      this.subject.next(value);
    });
  }

}