import { PageInfo } from "@app/api/models/page-info";
import { Pagination } from "@app/api/models/pagination";
import { ReplaySubject } from "rxjs";
import { PaginationActuator } from "./pagination-actuator";

export class ReplaySubjectPaginationActuator implements PaginationActuator {

    public page = new ReplaySubject<number>();

    private currentPage: number = 0;

    constructor() { }

    public load(info: PageInfo): void {
        this.currentPage = info.page;
        this.page.next(this.currentPage);
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

    public toPage(index: number): void {
        this.currentPage = index;
        this.page.next(this.currentPage);
    }

}
