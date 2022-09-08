import { Injectable } from "@angular/core";
import { RouteApiActuator } from "@app/api/route/actuator/route-api-actuator";
import { OrderActuator } from "./order-actuator copy";
import { ReplaySubjectOrderActuator } from "./replay-subject-order-actuator";

@Injectable({
    providedIn: 'root'
})
export class RouteOrderActuator implements OrderActuator {

    private wrapped = new ReplaySubjectOrderActuator();

    constructor(
        apiActuator: RouteApiActuator
    ) {
        this.wrapped.sort.subscribe(s => apiActuator.setOrder(s));
    }

    sortAscending(property: any): void {
        this.wrapped.sortAscending(property);
    }

    sortDescending(property: any): void {
        this.wrapped.sortDescending(property);
    }

}