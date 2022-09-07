import { Injectable } from "@angular/core";
import { RouteApiActuator } from "../actuator/route-api-actuator";
import { PaginationController } from "./pagination-controller";

@Injectable({
    providedIn: 'root'
})
export class RoutePaginationController extends PaginationController {

    constructor(
        apiActuator: RouteApiActuator
    ) {
        super();

        this.page.subscribe(p => apiActuator.setPage(p));
    }

}
