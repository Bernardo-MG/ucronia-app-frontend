import { Router } from "@angular/router";
import { PageInfo } from "@app/api/models/page-info";
import { RouteApiActuator } from "@app/api/route/actuator/route-api-actuator";
import { PaginationActuator } from "./pagination-actuator";

export class RoutePaginationActuator implements PaginationActuator {

    private currentPage: number = 0;

    private apiActuator: RouteApiActuator;

    constructor(
        router: Router
    ) {
        this.apiActuator = new RouteApiActuator(router);
    }

    public load(info: PageInfo): void {
        this.currentPage = info.page;
        this.apiActuator.setPage(this.currentPage)
    }

    public toFirstPage(): void {
        this.toPage(0);
    }

    public toPreviousPage(): void {
        this.toPage(this.currentPage - 1);
    }

    public toNextPage(): void {
        this.toPage(this.currentPage + 1);
    }

    public toPage(page: number): void {
        this.currentPage = page;
        this.apiActuator.setPage(this.currentPage)
    }

}
