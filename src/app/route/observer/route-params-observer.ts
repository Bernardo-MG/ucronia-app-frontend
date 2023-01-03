import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { RouteParametersReader } from "./route-parameters-reader";

export class RouteParametersObserver<T> {

  public subject = new BehaviorSubject<T | undefined>(undefined);

  private routeParamsReader: RouteParametersReader<T>;

  constructor(
    route: ActivatedRoute,
    reader: RouteParametersReader<T>
  ) {
    this.routeParamsReader = reader;

    // Listens to parameter changes
    route.queryParamMap.subscribe(params => {
      const pagination = this.routeParamsReader.read(params);

      this.subject.next(pagination);
    });
  }

}