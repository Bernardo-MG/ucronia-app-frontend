import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ParametersParser } from "./parameters-parser";

export class RouteParametersObserver<T> {

  public subject = new BehaviorSubject<T | undefined>(undefined);

  private parser: ParametersParser<T>;

  constructor(
    route: ActivatedRoute,
    parser: ParametersParser<T>
  ) {
    this.parser = parser;

    // Listens to parameter changes
    route.queryParamMap.subscribe(params => {
      const value = this.parser.parse(params);

      this.subject.next(value);
    });
  }

}