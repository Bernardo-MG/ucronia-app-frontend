import { PageInfo } from "@app/api/models/page-info";
import { ReplaySubject } from "rxjs";
import { PaginationActuator } from "./pagination-actuator";

export class ReplaySubjectPaginationActuator implements PaginationActuator {

    public page = new ReplaySubject<number>();

    private currentPage: number = 0;

    constructor() { }

    public load(page: PageInfo): void {
        if (page.pageNumber) {
            this.currentPage = page.pageNumber;
        } else {
            this.currentPage = 0;
        }
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
        this.page.next(page);
    }

}
