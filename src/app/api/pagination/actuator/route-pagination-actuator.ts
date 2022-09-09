import { Router } from "@angular/router";
import { PageInfo } from "@app/api/models/page-info";
import { RouteApiActuator } from "@app/api/route/actuator/route-api-actuator";
import { PaginationActuator } from "./pagination-actuator";
import { ReplaySubjectPaginationActuator } from "./replay-subject-pagination-actuator";

export class RoutePaginationActuator implements PaginationActuator {

    private wrapped: ReplaySubjectPaginationActuator = new ReplaySubjectPaginationActuator();

    constructor(
        router: Router
    ) {
        const apiActuator = new RouteApiActuator(router);
        this.wrapped.page.subscribe(pagination => apiActuator.setPage(pagination));
    }

    load(page: PageInfo): void {
        this.wrapped.load(page);
    }

    toFirstPage(): void {
        this.wrapped.toFirstPage();
    }

    toPreviousPage(): void {
        this.wrapped.toPreviousPage();
    }

    toNextPage(): void {
        this.wrapped.toNextPage();
    }

    toPage(page: number): void {
        this.wrapped.toPage(page);
    }

}
