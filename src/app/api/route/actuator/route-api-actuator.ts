import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Pagination } from "../../models/pagination";
import { Sort } from "../../models/sort";

export class RouteApiActuator {

    private path: string;

    private parameters: any = {};

    constructor(
        private router: Router
    ) {
        this.path = this.router.url.split('?')[0];
    }

    public setPagination(pagination: Pagination): void {
        this.setParameter(pagination);
    }

    public setPage(page: number): void {
        this.setParameter({ page });
    }

    public setPageSize(size: number): void {
        this.setParameter({ size });
    }

    public setOrder(sort: Sort<any>): void {
        this.setParameter({ property: sort.property, order: sort.order });
    }

    public setParameter(params: any): void {
        this.parameters = { ...this.parameters, ...params };
        this.navigate();
    }

    private navigate(): void {
        this.router.navigate([this.path], { queryParams: this.parameters });
    }

}