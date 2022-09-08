import { Injectable } from "@angular/core";
import { RouteApiActuator } from "@app/api/actuator/route-api-actuator";
import { PageInfo } from "@app/api/models/page-info";
import { PaginationActuator } from "./pagination-actuator";
import { ReplaySubjectPaginationActuator } from "./replay-subject-pagination-actuator";

@Injectable({
    providedIn: 'root'
})
export class RoutePaginationActuator implements PaginationActuator {

    private paginationActuator: ReplaySubjectPaginationActuator = new ReplaySubjectPaginationActuator();

    constructor(
        apiActuator: RouteApiActuator
    ) {
        this.paginationActuator.page.subscribe(pagination => apiActuator.setPage(pagination));
    }

    load(page: PageInfo): void {
        this.paginationActuator.load(page);
    }

    toFirstPage(): void {
        this.paginationActuator.toFirstPage();
    }

    toPreviousPage(): void {
        this.paginationActuator.toPreviousPage();
    }

    toNextPage(): void {
        this.paginationActuator.toNextPage();
    }

    toPage(page: number): void {
        this.paginationActuator.toPage(page);
    }

}
