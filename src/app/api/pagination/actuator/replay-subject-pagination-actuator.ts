import { PageInfo } from "@app/api/models/page-info";
import { Pagination } from "@app/api/models/pagination";
import { ReplaySubject } from "rxjs";
import { PaginationActuator } from "./pagination-actuator";

export class ReplaySubjectPaginationActuator implements PaginationActuator {

    public page = new ReplaySubject<Pagination>();

    private currentPage: number = 0;

    private currentSize: number = 0;

    constructor() { }

    public load(info: PageInfo): void {
        this.currentPage = info.page;
        this.currentSize = info.size;
        this.page.next(info);
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
        this.page.next({ page, size: this.currentSize });
    }

}
