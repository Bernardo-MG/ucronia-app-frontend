import { ActivatedRoute } from "@angular/router";
import { Sort } from "@app/api/models/sort";
import { BehaviorSubject } from "rxjs";
import { RouteSortReader } from "./route-sort-reader";

export class RouteSortObserver {

  public sort = new BehaviorSubject<Sort<any>[] | undefined>(undefined);

  private reader = new RouteSortReader();

  constructor(
    route: ActivatedRoute
  ) {
    // Listens to route changes
    route.queryParamMap.subscribe(params => {
      const sort = this.reader.read(params);

      this.sort.next(sort);
    });
  }

}