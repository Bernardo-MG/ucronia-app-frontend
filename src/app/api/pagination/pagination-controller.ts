import { ReplaySubject } from "rxjs";
import { PageInfo } from "../models/page-info";

export class PaginationController {

    public currentPage: number = 0;

    public totalPages: number = 0;

    public previousEnabled: boolean = false;

    public nextEnabled: boolean = false;

    public page = new ReplaySubject<number>();

    constructor() { }

    public setPagination(page: PageInfo): void {
        if (page.pageNumber) {
            this.currentPage = page.pageNumber;
        } else {
            this.currentPage = 0;
        }
        if (page.totalPages) {
            this.totalPages = page.totalPages;
        } else {
            this.totalPages = 0;
        }

        this.previousEnabled = !page.first;
        this.nextEnabled = !page.last;
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
