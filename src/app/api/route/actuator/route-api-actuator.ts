import { Router } from "@angular/router";
import { Pagination } from "../../models/pagination";
import { Sort } from "../../models/sort";

export class RouteApiActuator {

    private path: string;

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
        const urlParams = this.getUrlParams();

        const parameters = { ...urlParams, ...params };
        this.navigate(parameters);
    }

    private getUrlParams(): any {
        const urlParams: any = {};

        const sections = this.router.url.split('?');
        if (sections.length > 1) {
            const paramSection = sections[1];
            const pairs = paramSection.split('&');
            pairs.forEach(p => {
                const pair = p.split('=');
                if (pair.length >= 2) {
                    urlParams[pair[0]] = pair[1];
                }
            });
        }

        return urlParams;
    }

    private navigate(parameters: any = {}): void {
        this.router.navigate([this.path], { queryParams: parameters });
    }

}