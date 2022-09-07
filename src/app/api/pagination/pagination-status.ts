import { PageInfo } from "../models/page-info";

export class PaginationStatus {

    public currentPage: number = 0;

    public totalPages: number = 0;

    public previousEnabled: boolean = false;

    public nextEnabled: boolean = false;

    constructor() { }

    public load(page: PageInfo): void {
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

}
