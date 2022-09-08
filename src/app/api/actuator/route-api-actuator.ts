import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Pagination } from "../models/pagination";
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

    public setPage(page: Pagination): void {
        this.setParameter({ page: page.page, size: page.size });
    }

    public setPageSize(size: number): void {
        this.setParameter({ size });
    }

    public setOrder(sort: Sort<any>): void {
        this.setParameter({ property: sort.property, order: sort.order });
    }

    public setParameter(params: any): void {
        this.router.navigate([this.path], { queryParams: params });
    }

}