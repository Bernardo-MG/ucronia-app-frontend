import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Sort } from "../models/sort";

@Injectable({
    providedIn: 'root'
})
export class RouteApiActuator {

    private path: string;

    constructor(
        private router: Router
    ) {
        this.path = this.router.url.split('?')[0];
    }

    public setOrder(sort: Sort<any>): void {
        this.setParameter({ property: sort.property, order: sort.order });
    }

    public setParameter(params: any): void {
        this.router.navigate([this.path], { queryParams: params });
    }

}