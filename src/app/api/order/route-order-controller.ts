import { Injectable } from "@angular/core";
import { RouteApiActuator } from "../actuator/route-api-actuator";
import { OrderController } from "./order-controller";

@Injectable({
    providedIn: 'root'
})
export class RouteOrderController extends OrderController {

    constructor(
        apiActuator: RouteApiActuator
    ) {
        super();

        this.sort.subscribe(s => apiActuator.setOrder(s));
    }

}