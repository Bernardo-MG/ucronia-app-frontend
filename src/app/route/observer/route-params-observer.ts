import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ParametersReader } from "./parameters-reader";

export class RouteParametersObserver<T> {

  public subject = new BehaviorSubject<T | undefined>(undefined);

  private routeParamsReader: ParametersReader<T>;

  constructor(
    route: ActivatedRoute,
    reader: ParametersReader<T>
  ) {
    this.routeParamsReader = reader;

    // Listens to parameter changes
    route.queryParamMap.subscribe(params => {
      const pagination = this.routeParamsReader.read(params);

      this.subject.next(pagination);
    });
  }

}